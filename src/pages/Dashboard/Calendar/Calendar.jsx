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
import assets from "../../../assets/assets";
import AppModal from "../../../components/AppModal/AppModal";
import { connectSocket, getSocket } from "../../../utils/socket";
import { NEW_BOOKING } from "../../../utils/events";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DragAndDropCalendar = withDragAndDrop(Calendar);

const MonthAndDaysToolbar = React.memo(
  ({
    currentDate,
    onMonthChange,
    onInfoPress,
    onTodayChipPress,
    onAddBooking,
    onDayChange,
    selectedFieldOption,
    setIsFieldModalOpen,
    setBookingTypeOpen,
    selectedBookingOption,
  }) => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingInline: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MonthSelector
              currentDate={currentDate}
              onMonthChange={onMonthChange}
            />

            <button
              onClick={onTodayChipPress}
              className="!font-PJSregular !text-[12px] !text-blue !border-blue !rounded-full px-2 py-1 !border"
            >
              Today
            </button>

            <button
              onClick={onInfoPress}
              style={{ border: "none", outline: "none" }}
            >
              <img src={assets.info} className="w-[20px] h-[20px]" alt="Info" />
            </button>

            <label className="!font-PJSregular !text-[12px] !text-blue">
              {currentDate.format("MMM Do, yyyy")}
            </label>
          </div>

          <div className="flex gap-5">
            <div
              className="bg-transparent text-center justify-center flex h-[42px] rounded-full relative cursor-pointer"
              onClick={() => setBookingTypeOpen(true)}
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                Type: {selectedBookingOption.title}
                <img src={assets.down} alt="Down" />
              </p>
            </div>

            <div
              className="bg-transparent text-center justify-center flex h-[42px] rounded-full relative cursor-pointer"
              onClick={() => setIsFieldModalOpen(true)}
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                Fields Available: {selectedFieldOption.title}
                <img src={assets.down} alt="Down" />
              </p>
            </div>

            <button
              className={"text-sm font-PJSmedium"}
              onClick={() => onAddBooking()}
              style={{
                padding: "0.6rem 0.8rem",
                backgroundColor: "#9CFC38",
                color: "#000",
                border: "none",
                borderRadius: "25rem",
              }}
            >
              <div className="flex items-center">
                <img
                  src={assets.add}
                  className="w-[20px] h-[20px] mr-2"
                  alt="Info"
                />
                Add Booking
              </div>
            </button>
          </div>
        </div>

        <hr />

        <HorizontalDaysList
          selectedMonth={currentDate} // Pass the selected month
          onDayChange={onDayChange}
        />

        <hr />
      </>
    );
  },
  (prev, next) => {
    return (
      prev.currentDate.isSame(next.currentDate, "day") &&
      prev.selectedFieldOption === next.selectedFieldOption &&
      prev.selectedBookingOption === next.selectedBookingOption
    );
  }
);

const CustomToolbar = ({
  currentDate,
  onMonthChange,
  onInfoPress,
  onTodayChipPress,
  onAddBooking,
  selectedResource,
  onResourceChange,
  onDayChange,
  resources,
  selectedFieldOption,
  setIsFieldModalOpen,
  setBookingTypeOpen,
  selectedBookingOption,
}) => {
  return (
    <div className="rbc-toolbar">
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          transition: "all 0.3s ease",
          overflowX: "auto",
        }}
      >
        <MonthAndDaysToolbar
          currentDate={currentDate}
          onMonthChange={onMonthChange}
          onInfoPress={onInfoPress}
          onTodayChipPress={onTodayChipPress}
          onAddBooking={onAddBooking}
          onDayChange={onDayChange}
          selectedFieldOption={selectedFieldOption}
          setIsFieldModalOpen={setIsFieldModalOpen}
          setBookingTypeOpen={setBookingTypeOpen}
          selectedBookingOption={selectedBookingOption}
        />

        {/* Resource Tabs */}
        <div
          style={{
            display: "flex",
            // marginTop: "0.5rem",
            overflowX: "auto",
          }}
        >
          {resources.map((resource, index) => (
            <div
              key={`${index}`}
              className="flex"
              style={{
                // ...(resource.label === "all" && { width: "4rem" }),
                // ...(resource.label !== "all" && { flex: 1 }),
                flex: resource.label === "all" ? "0 0 5.5rem" : "1",
              }}
            >
              <button
                key={resource.label}
                className={"text-large font-PJSbold"}
                onClick={() => onResourceChange(resource.label)}
                style={{
                  flex: 1,
                  paddingTop: "0.7rem",
                  paddingBottom: "0.7rem",
                  border: "none",
                  borderBottom:
                    selectedResource === resource.label
                      ? "5px solid #33C0DB"
                      : "none",
                  backgroundColor: "transparent",
                  color:
                    selectedResource === resource.label ? "#33C0DB" : "#000",
                  cursor: "pointer",
                }}
              >
                {resource.title}
              </button>

              {index < resources.length - 1 && (
                <div
                  style={{
                    backgroundColor: "#dddddd",
                    width: "0.04rem",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
const MemoizedCustomToolbar = React.memo(CustomToolbar, (prev, next) => {
  return (
    prev.currentDate.isSame(next.currentDate, "day") &&
    prev.selectedResource === next.selectedResource &&
    prev.resources === next.resources
  );
});

const CalendarComponent = () => {
  const { user, currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();

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
  const memoizedResources = useMemo(
    () => resources,
    [JSON.stringify(resources)] // Deep compare resources
  );
  const filteredResources = useMemo(() => {
    return selectedResource === "all"
      ? memoizedResources.filter((r) => r.label !== "all")
      : memoizedResources.filter((r) => r.label === selectedResource);
  }, [resources, selectedResource]);

  const handleMonthChange = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const handleDayChange = useCallback((selectedDate) => {
    setCurrentDate(moment(selectedDate));
  }, []);

  const handleResourceChange = useCallback((resourceId) => {
    setSelectedResource(resourceId);
  }, []);

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
  }, [resources, currentDate]);

  const startBookingFlow = useCallback(
    (mode = "add", event = null, slot = null) => {
      setMode(mode);
      if (event) setSelectedEvent(event);
      if (slot) setSelectedSlot(slot);
      setShowAddBookingModal(true);
    },
    []
  );

  const handleFieldOptionSelect = (option) => {
    setSelectedFieldOption(option);
  };

  const handleBookingOptionSelect = (option) => {
    setSelectedBookingOption(option);
  };

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

  const onInfoPress = useCallback(() => {
    setInfoModalVisible(true);
  }, []);

  const onTodayChipPress = useCallback(() => {
    setCurrentDate(moment());
  }, []);

  return (
    <div
      style={{
        height: "100%",
        paddingInline: "0.4rem",
      }}
    >
      <DragAndDropCalendar
        defaultDate={currentDate.toDate()}
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
            <MemoizedCustomToolbar
              currentDate={currentDate}
              onMonthChange={handleMonthChange}
              onTodayChipPress={onTodayChipPress}
              onInfoPress={onInfoPress}
              onAddBooking={startBookingFlow}
              selectedResource={selectedResource}
              onResourceChange={handleResourceChange}
              onDayChange={handleDayChange}
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

export default CalendarComponent;
