import React, { useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import BookingCard from "../../../components/BookingCard/BookingCard";

import { enUS } from "date-fns/locale";
import HorizontalDaysList from "../../../components/HorizontalDaysList/HorizontalDaysList";
import MonthSelector from "../../../components/MonthSelector/MonthSelector";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import AddBookingModal from "../../../components/AddBookingModal/AddBookingModal";
import Loader from "../../../components/Loader/Loader";
import { useStateContext } from "../../../context";
import {
  createBooking,
  getAllBookings,
} from "../../../api/services/bookingService";
import { getFacilityFields } from "../../../api/services/facilityService";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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
            onClick={onAddBooking}
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
  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const [showAddBookingModal, setShowAddBookingModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState("all");

  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [allFields, setAllFields] = useState([]);

  const handleMonthChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleDayChange = (selectedDate) => {
    setCurrentDate(moment(selectedDate));
    if (resources.length > 0) {
      setLoading(true);
      fetchAllBookings();
    }
  };

  const handleResourceChange = (resourceId) => {
    setSelectedResource(resourceId);
  };

  useEffect(() => {
    fetchAllFacilityFields();
  }, []);

  useEffect(() => {
    if (resources.length > 0) {
      fetchAllBookings();
    }
  }, [resources]);

  const startBookingFlow = () => {
    setShowAddBookingModal(true);
  };

  const handleAddBookingNext = async (data) => {
    console.log(data);
    handleCancel();
    // setLoading(true);
    getAllBookings();
  };

  const handleCancel = () => {
    setShowAddBookingModal(false);
  };

  const fetchAllBookings = async () => {
    try {
      let booking = await getAllBookings(
        `startDate=${currentDate.format(
          "yyyy-MM-DD"
        )}&endDate=${currentDate.format("yyyy-MM-DD")}`
      );
      let bookings = booking.bookings;

      resources.forEach((r) => {
        bookings.forEach((b) => {
          if (b.field._id === r.label) {
            b.resourceId = r.label;
            b.start = new Date(b.startDateTime);
            b.end = new Date(b.endDateTime);
            b.title = b.name || "Untitled Event";
          }
        });
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

  return (
    <div
      style={{
        height: "100%",
        padding: "1rem",
      }}
    >
      <Calendar
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
        step={60}
        timeslots={1}
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
      />

      {/* Add Booking Modal */}
      {showAddBookingModal && (
        <AddBookingModal
          fields={allFields}
          isVisible={showAddBookingModal}
          onClose={handleCancel}
          onNext={handleAddBookingNext}
        />
      )}

      {loading && <Loader />}
    </div>
  );
};

export default CalendarComponent;
