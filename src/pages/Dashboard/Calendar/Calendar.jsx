import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import BookingCard from "../../../components/BookingCard/BookingCard";

import { enUS } from "date-fns/locale";
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
import assets from "../../../assets/assets";
import AppModal from "../../../components/AppModal/AppModal";
import { connectSocket, getSocket } from "../../../utils/socket";
import { NEW_BOOKING } from "../../../utils/events";
import CustomToolbar from "./CustomToolbar";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = () => {
  const dispatch = useDispatch();
  const { user, currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();
  const { id } = useParams();
  const { selectedDate, selectedResource } = useSelector(
    (state) => state.calendar
  );

  const bookingTypes = [
    { key: "pickup", label: "Pickup" },
    { key: "callIn", label: "CallIn" },
    { key: "league", label: "League" },
    { key: "tournament", label: "Tournament" },
    { key: "event", label: "Event" },
    { key: "other", label: "Other" },
    { key: "closure", label: "Closure" },
    { key: "academy", label: "Academy" },
    { key: "recurring", label: "Recurring" },
    { key: "newBooking", label: "New Booking" },
  ];

  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [selectedFieldOption, setSelectedFieldOption] = useState({
    label: "all",
    title: "All",
  });
  const [bookingTypeOpen, setBookingTypeOpen] = useState(false);
  const [selectedBookingOption, setSelectedBookingOption] = useState({
    label: "all",
    title: "All",
  });
  const [mode, setMode] = useState("add");
  const [loading, setLoading] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);

  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [allFields, setAllFields] = useState([]);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [resizeModalVisible, setResizeModalVisible] = useState(false);
  const [resizeEvent, setResizeEvent] = useState(null);
  const [droppedEvent, setDroppedEvent] = useState(null);

  const [isResized, setResized] = useState(false);
  const memoizedResources = useMemo(
    () => resources,
    [JSON.stringify(resources)] // Deep compare resources
  );
  const filteredResources = useMemo(() => {
    return selectedResource === "all"
      ? memoizedResources.filter((r) => r.label !== "all")
      : memoizedResources.filter((r) => r.label === selectedResource);
  }, [resources, selectedResource]);

  useEffect(() => {
    const socket = connectSocket(user);

    socket.on(NEW_BOOKING, (data) => {
      const dataX = JSON.parse(data);
      const booking = dataX.booking;

      let newEvents;
      const event = {
        ...booking,
        resourceId: booking.field._id,
        start: new Date(booking.startDateTime),
        end: new Date(booking.endDateTime),
        title: `${capitalizeFirstLetter(booking.bookingType)} Event`,
      };

      // Split multi-day events into individual day events
      if (event.start.toDateString() !== event.end.toDateString()) {
        newEvents = splitEventByDays(event);
      } else {
        newEvents = [event];
      }

      setEvents((prevEvents) => [...prevEvents, ...newEvents]);

      notification.success({
        message: "New Booking",
        description: dataX.message,
        duration: 3, // Auto-close after 3 seconds
      });
    });
    fetchAllFacilityFields();

    return () => {
      socket.off(NEW_BOOKING); // Cleanup event listener
    };
  }, []);

  useEffect(() => {
    if (resources.length > 0) {
      setLoading(true);
      fetchAllBookings();
    }
  }, [resources.length, selectedDate]);

  const startBookingFlow = useCallback(
    (mode = "add", event = null, slot = null) => {
      setMode(mode);
      if (event) setSelectedEvent(event);
      if (slot) setSelectedSlot(slot);
      setShowAddBookingModal(true);
    },
    []
  );

  const handleFieldOptionSelect = useCallback(
    (option) => {
      if (option.label !== selectedFieldOption.label) {
        setSelectedFieldOption(option);
      }
    },
    [selectedFieldOption]
  );

  const handleBookingOptionSelect = useCallback(
    (option) => {
      if (option.label !== selectedBookingOption.label) {
        setSelectedBookingOption(option);
      }
    },
    [selectedBookingOption]
  );

  const handleApplyFieldFilter = () => {
    setIsFieldModalOpen(false);
    // fetchAllBookings(); // Fetch the updated bookings
  };

  const handleApplyBookingTypeFilter = () => {
    setBookingTypeOpen(false);
    // fetchAllBookings(); // Fetch the updated bookings
  };

  const handleAddBookingNext = async (data) => {
    handleCancel();
    fetchAllBookings();
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
      startDateTime: moment(start).toISOString(),
      endDateTime: moment(end).toISOString(),
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
      let query = "";
      if (!id) {
        query = `startDate=${formattedDate(
          moment(selectedDate)
        )}&endDate=${formattedDate(moment(selectedDate))}&facilityId=${
          currentFacility._id
        }`;
        if (selectedFieldOption.label !== "all") {
          query = query + `&fieldId=${selectedFieldOption.label}`;
        }
      }

      const booking = await getAllBookings(query);

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

      if(id){
        startBookingFlow("edit", bookings.find((b) => b._id.toString() === id));
      }
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

  const onInfoPress = useCallback(() => {
    setInfoModalVisible(true);
  }, []);

  return (
    <div style={styles.container}>
      <DragAndDropCalendar
        defaultDate={moment(selectedDate).toDate()}
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
        step={15} // Each grid cell represents 5 minutes
        timeslots={4} // 12 slots per hour (5 x 12 = 60 minutes)
        minResizeStep={5} // Resizing in 5-minute increments
        showAllDayEvents={false}
        resources={filteredResources}
        resourceIdAccessor="label"
        resourceTitleAccessor="title"
        showNowIndicator={true}
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, "h a", culture), // Custom format for hours
        }}
        components={{
          toolbar: () => (
            <CustomToolbar
              onInfoPress={onInfoPress}
              onAddBooking={startBookingFlow}
              resources={memoizedResources}
              selectedFieldOption={selectedFieldOption}
              setIsFieldModalOpen={setIsFieldModalOpen}
              setBookingTypeOpen={setBookingTypeOpen}
              selectedBookingOption={selectedBookingOption}
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
          setLoading={setLoading}
          initialValues={{
            ...selectedEvent,
            ...(selectedSlot && {
              startDateTime: selectedSlot?.start,
              endDateTime: selectedSlot?.end,
              field: selectedSlot?.resourceId,
            }), // Prepopulate start date/time
          }}
          onCancel={(id) => handleCancelBooking(id)}
        />
      )}

      <Modal
        title={`Confirm ${isResized ? "Resize" : "Change"}`}
        open={resizeModalVisible}
        onOk={handleConfirmResize} // Confirm the resize
        onCancel={handleCancelResize} // Cancel the resize
        okText="Yes, Update"
        cancelText="Cancel"
      >
        <p>
          {isResized
            ? "Are you sure you would like to update the timings"
            : "Are you sure you would like to drag this booking here?"}
        </p>
        <p>
          New Start:{" "}
          <strong>
            {isResized
              ? moment(resizeEvent?.start).format("MMM Do, yyyy - hh:mm A")
              : moment(droppedEvent?.start).format("MMM Do, yyyy - hh:mm A")}
          </strong>
        </p>
        <p>
          New End:{" "}
          <strong>
            {isResized
              ? moment(resizeEvent?.end).format("MMM Do, yyyy - hh:mm A")
              : moment(droppedEvent?.end).format("MMM Do, yyyy - hh:mm A")}
          </strong>
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

      <AppModal
        onClose={() => setInfoModalVisible(false)}
        modalopen={infoModalVisible}
        width={"25rem"}
      >
        <div className="flex flex-col justify-center ">
          <div className="font-PJSbold text-[20px]">Booking Icons</div>

          {bookingTypes.map(({ key, label }) => (
            <div key={key} className="flex gap-2 mt-6 items-center">
              <div className="flex justify-center font-PJSregular h-[32px] w-[32px] rounded-full bg-secondaryThirty p-1">
                <img
                  src={assets[key]}
                  alt={label}
                  className="filter brightness-0"
                />
              </div>
              {label}
            </div>
          ))}

          <div className="flex mt-14 gap-4 w-full justify-center items-center">
            <button
              onClick={() => setInfoModalVisible(false)}
              className="flex w-[90%] h-[52px] rounded-full bg-lime font-PJSmedium justify-center items-center"
            >
              Close
            </button>
          </div>
        </div>
      </AppModal>

      <AppModal
        modalopen={isFieldModalOpen}
        onClose={() => setIsFieldModalOpen(false)}
        width="300px"
        customStyles={{
          overlay: {
            position: "absolute",
            top: 0,
            right: 0,
          },
          modal: {
            position: "absolute",
            top: "45%",
            right: "0",
            transform: "translate(-50%, -50%)",
            margin: "0",
          },
        }}
      >
        <div className="mt-0">
          <p className="font-PJSmedium text-sm">Filter</p>
          <div className="h-[1px] w-full my-2 bg-secondaryThirty"></div>

          <div className="font-PJSmedium text-sm flex flex-col gap-2">
            {memoizedResources.map((field) => {
              return (
                <div
                  key={field.label}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleFieldOptionSelect(field)}
                >
                  <p className="underline">{field.title}</p>
                  {selectedFieldOption.label === field.label && (
                    <img src={assets.CheckCircle} className="w-5" alt="Check" />
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleApplyFieldFilter}
            className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          >
            Apply
          </button>
        </div>
      </AppModal>

      <AppModal
        modalopen={bookingTypeOpen}
        onClose={() => setBookingTypeOpen(false)}
        width="300px"
        customStyles={{
          overlay: {
            position: "absolute",
            top: 0,
            right: 0,
          },
          modal: {
            position: "absolute",
            top: "45%",
            right: "0",
            transform: "translate(-50%, -50%)",
            margin: "0",
          },
        }}
      >
        <div className="mt-0">
          <p className="font-PJSmedium text-sm">Filter</p>
          <div className="h-[1px] w-full my-2 bg-secondaryThirty"></div>

          <div className="font-PJSmedium text-sm flex flex-col gap-2">
            {[
              { label: "all", title: "All" },
              ...bookingTypes.map((b) => {
                return {
                  label: b.key,
                  title: b.label,
                };
              }),
            ].map((field) => {
              return (
                <div
                  key={field.label}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleBookingOptionSelect(field)}
                >
                  <p className="underline">{field.title}</p>
                  {selectedBookingOption.label === field.label && (
                    <img src={assets.CheckCircle} className="w-5" alt="Check" />
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleApplyBookingTypeFilter}
            className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          >
            Apply
          </button>
        </div>
      </AppModal>

      {loading && <Loader />}
    </div>
  );
};

const styles = {
  container: {
    height: "100%",
    paddingInline: "0.4rem",
  },
};

export default CalendarComponent;
