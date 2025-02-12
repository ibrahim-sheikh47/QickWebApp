import React, { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import BookingCard from "../../../components/BookingCard/BookingCard";

import { enUS } from "date-fns/locale";
import HorizontalDaysList from "../../../components/HorizontalDaysList/HorizontalDaysList";
import MonthSelector from "../../../components/MonthSelector/MonthSelector";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import AddBookingModal from "../../../components/AddBookingModal/AddBookingModal";
import Loader from "../../../components/Loader/Loader";
import { useStateContext } from "../../../context";
import {
  cancelBooking,
  createBooking,
  getAllBookings,
  updateBooking,
} from "../../../api/services/bookingService";
import { getFacilityFields } from "../../../api/services/facilityService";
import {
  capitalizeFirstLetter,
  formattedDate,
  splitEventByDays,
} from "../../../constants";
import { Modal, notification } from "antd";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);

const CustomToolbar = ({
  currentDate,
  onMonthChange,
  onAddBooking,
  selectedResource,
  onResourceChange,
  onDayChange,
  resources,
}) => {
  return (
    <div className="rbc-toolbar">
      <div
        style={{
          width: "100%",
          paddingInline: "1rem",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          cursor: "pointer",
          transition: "all 0.3s ease",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MonthSelector
            currentDate={currentDate}
            onMonthChange={onMonthChange}
          />

          <button
            className={"text-sm font-PJSmedium"}
            onClick={() => onAddBooking()}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#9CFC38",
              color: "#000",
              border: "none",
              borderRadius: "25rem",
            }}
          >
            Add Booking
          </button>
        </div>

        <hr />

        <HorizontalDaysList
          selectedMonth={currentDate} // Pass the selected month
          onMonthChange={onMonthChange}
          onDayChange={onDayChange}
        />

        <hr />

        {/* Resource Tabs */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1rem",
            overflowX: "auto",
          }}
        >
          {resources.map((resource) => (
            <button
              key={resource.label}
              className={"text-large font-PJSbold"}
              onClick={() => onResourceChange(resource.label)}
              style={{
                paddingBottom: "1.2rem",
                border: "none",
                borderBottom:
                  selectedResource === resource.label
                    ? "5px solid #33C0DB"
                    : "none",
                backgroundColor: "transparent",
                color: selectedResource === resource.label ? "#33C0DB" : "#000",
                cursor: "pointer",
                ...(resource.label === "all" && { width: "4rem" }),
                ...(resource.label !== "all" && { flex: 1 }),
              }}
            >
              {resource.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const CalendarComponent = () => {
  const { currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState("all");

  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [allFields, setAllFields] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [resizeModalVisible, setResizeModalVisible] = useState(false);
  const [resizeEvent, setResizeEvent] = useState(null);
  const [droppedEvent, setDroppedEvent] = useState(null);

  const [isResized, setResized] = useState(false);

  const handleMonthChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleDayChange = (selectedDate) => {
    setCurrentDate(moment(selectedDate));
  };

  const handleResourceChange = (resourceId) => {
    setSelectedResource(resourceId);
  };

  useEffect(() => {
    fetchAllFacilityFields();
  }, []);

  useEffect(() => {
    if (resources.length > 0) {
      setLoading(true);
      fetchAllBookings();
    }
  }, [resources, currentDate]);

  const startBookingFlow = (mode = "add", event = null, slot = null) => {
    setMode(mode);
    if (event) setSelectedEvent(event);
    if (slot) setSelectedSlot(slot);
    setShowAddBookingModal(true);
  };

  const handleAddBookingNext = async (data) => {
    handleCancel();
    // setLoading(true);
    getAllBookings();
  };

  const handleCancel = () => {
    setShowAddBookingModal(false);
    setSelectedEvent(null);
    setSelectedSlot(null);
  };

  const handleEventResize = ({ start, end, event }) => {
    const newEvent = {
      ...event,
      start,
      end,
    };

    if (isOverlapping(newEvent, events)) {
      openNotification(
        "The new timing overlaps with an existing booking in the same field."
      );
      return;
    }

    setResizeEvent({
      ...event,
      startDateTime: moment(start).toISOString(true),
      endDateTime: moment(end).toISOString(true),
      start,
      end,
    });
    setResized(true);
    setResizeModalVisible(true); // Show the confirmation modal
  };

  const handleConfirmResize = () => {
    updateBookingDetails(isResized ? resizeEvent : droppedEvent);
  };

  const handleCancelResize = () => {
    // Revert any changes
    setResizeModalVisible(false);
    setResizeEvent(null);
  };

  const handleEventDrop = ({ start, end, event, resourceId }) => {
    const newEvent = {
      ...event,
      start,
      end,
      resourceId,
    };

    if (isOverlapping(newEvent, events)) {
      openNotification(
        "The new timing overlaps with an existing booking in the same field."
      );
      return;
    }

    setDroppedEvent({
      ...event,
      startDateTime: moment(start).toISOString(true),
      endDateTime: moment(end).toISOString(true),
      field: resourceId,
      start,
      end,
      resourceId,
    });
    setResized(false);
    setResizeModalVisible(true);
  };

  const isOverlapping = (newEvent, events) => {
    return events.some((event) => {
      // Ignore the same event
      if (event._id === newEvent._id) return false;

      // Extract start and end times
      const newStart = newEvent.start;
      const newEnd = newEvent.end;
      const existingStart = event.start;
      const existingEnd = event.end;

      // Overlap scenarios:
      // 1. New event starts inside an existing event
      const startsInside = newStart > existingStart && newStart < existingEnd;

      // 2. New event ends inside an existing event
      const endsInside = newEnd > existingStart && newEnd < existingEnd;

      // 3. New event fully overlaps an existing event
      const fullyOverlaps = newStart <= existingStart && newEnd >= existingEnd;

      // 4. New event duration is completely inside an existing event
      const isWithinExisting =
        newStart >= existingStart && newEnd <= existingEnd;

      // If any condition is true, there is an overlap
      return (
        (startsInside || endsInside || fullyOverlaps || isWithinExisting) &&
        event.resourceId === newEvent.resourceId
      );
    });
  };

  const handleCancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      await cancelBooking(bookingId);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingDetails = async (event) => {
    try {
      setLoading(true);
      await updateBooking(event, event._id);
      if (isResized) {
        setEvents((prevEvents) =>
          prevEvents.map((evt) =>
            evt.id === resizeEvent.id
              ? { ...evt, start: resizeEvent.start, end: resizeEvent.end }
              : evt
          )
        );
      } else {
        setEvents((prevEvents) =>
          prevEvents.map((evt) =>
            evt.id === droppedEvent.id
              ? {
                  ...evt,
                  start: droppedEvent.start,
                  end: droppedEvent.end,
                  resourceId: droppedEvent.resourceId,
                }
              : evt
          )
        );
      }
      setResizeModalVisible(false); // Close the modal
      fetchAllBookings();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBookings = async () => {
    try {
      let booking = await getAllBookings(
        `startDate=${formattedDate(currentDate)}&endDate=${formattedDate(
          currentDate
        )}&facilityId=${currentFacility._id}`
      );

      const bookings = booking.bookings.flatMap((b) => {
        const event = {
          ...b,
          resourceId: b.field._id,
          start: new Date(b.startDateTime),
          end: new Date(b.endDateTime),
          title: `${capitalizeFirstLetter(b.bookingType)} Event`,
        };

        // Split multi-day events into individual day events
        if (event.start.toDateString() !== event.end.toDateString()) {
          return splitEventByDays(event);
        }

        // Single-day events remain as-is
        return event;
      });

      setEvents(bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllFacilityFields = async () => {
    setLoading(true);
    try {
      const fields = await getFacilityFields(currentFacility._id);
      let mappedResources = fields.map((field) => {
        return {
          label: field._id,
          title: field.name,
        };
      });
      setResources([{ label: "all", title: "All" }, ...mappedResources]);
      setAllFields(fields);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openNotification = (message) => {
    notification.error({
      message: "Conflict Detected",
      description: message,
      duration: 3, // Auto-close after 3 seconds
    });
  };

  return (
    <div
      style={{
        height: "100%",
        padding: "1rem",
      }}
    >
      <DragAndDropCalendar
        date={currentDate.toDate()}
        localizer={localizer}
        events={
          selectedResource === "all"
            ? events
            : events.filter((event) => event.resourceId === selectedResource)
        }
        startAccessor="start"
        endAccessor="end"
        views={["day"]}
        defaultView={"day"}
        style={{
          height: "80vh",
          backgroundColor: "transparent",
        }}
        step={5} // Each grid cell represents 5 minutes
        timeslots={12} // 12 slots per hour (5 x 12 = 60 minutes)
        minResizeStep={5} // Resizing in 5-minute increments
        showAllDayEvents={false}
        resources={
          selectedResource === "all"
            ? resources.filter((r) => r.label !== "all")
            : resources.filter((r) => r.label === selectedResource)
        }
        resourceIdAccessor="label"
        resourceTitleAccessor="title"
        showNowIndicator={true}
        components={{
          toolbar: () => (
            <CustomToolbar
              currentDate={currentDate}
              onMonthChange={handleMonthChange}
              onAddBooking={startBookingFlow}
              selectedResource={selectedResource}
              onResourceChange={handleResourceChange}
              onDayChange={handleDayChange}
              resources={resources}
            />
          ),
          resourceHeader: () => null,
          event: BookingCard,
        }}
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={(event) => {
          if (event && event.status !== "cancelled")
            startBookingFlow("edit", event);
        }}
        onEventDrop={handleEventDrop}
        resizable
        onEventResize={handleEventResize}
        selectable
        onSelectSlot={(slot) => {
          startBookingFlow("add", null, slot);
        }}
      />

      {/* Add Booking Modal */}
      {showAddBookingModal && (
        <AddBookingModal
          fields={allFields}
          isVisible={showAddBookingModal}
          onClose={handleCancel}
          onNext={handleAddBookingNext}
          mode={mode}
          initialValues={{
            ...selectedEvent,
            ...(selectedSlot && { startDateTime: selectedSlot?.start }), // Prepopulate start date/time
            ...(selectedSlot && { endDateTime: selectedSlot?.end }), // Prepopulate start date/time
          }}
          onCancel={(id) => handleCancelBooking(id)}
        />
      )}

      <Modal
        title={`Confirm ${isResized ? "Resize" : "Drop"}`}
        visible={resizeModalVisible}
        onOk={handleConfirmResize} // Confirm the resize
        onCancel={handleCancelResize} // Cancel the resize
        okText="Yes, Update"
        cancelText="Cancel"
      >
        <p>{`Are you sure you want to update the timing${
          isResized ? " " : " and field "
        }for the booking?`}</p>
        <p>
          New Start:{" "}
          <strong>
            {moment(resizeEvent?.start).format("DD/MM/yyyy hh:mm")}
          </strong>
        </p>
        <p>
          New End:{" "}
          <strong>{moment(resizeEvent?.end).format("DD/MM/yyyy hh:mm")}</strong>
        </p>
        {!isResized && (
          <p>
            New Field:{" "}
            <strong>
              {resources.length &&
                droppedEvent &&
                resources.find((r) => r.label === droppedEvent.resourceId)
                  .title}
            </strong>
          </p>
        )}
      </Modal>

      {loading && <Loader />}
    </div>
  );
};

export default CalendarComponent;
