/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AppModal from "../../../components/AppModal/AppModal";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import EventBar, {
  BookingBar,
  CreditHolderChart,
  SalesBar,
  UsersChart,
} from "./Charts";
import assets from "../../../assets/assets";
import { useStateContext } from "../../../context";
import { getFieldsBookingStats } from "../../../api/services/bookingService";
import Loader from "../../../components/Loader/Loader";
import moment from "moment";
import AddNewFacilityModal from "../../../components/AddNewFacilityModal/AddNewFacilityModal";
import { formattedDate } from "../../../constants";
import { useNavigate } from "react-router-dom";
import DateRangeModal from "../../../components/DateRangeModal/DateRangeModal";

const Section = ({ title, children, date, onDateClick, onTitleClick }) => (
  <div className="md:w-1/2 w-full h-[400px] rounded-xl bg-white shadow-sm drop-shadow-sm p-4">
    <div className="flex items-center justify-between">
      <p
        className="text-2xl text-primary font-PJSextra cursor-pointer"
        onClick={onTitleClick}
      >
        {title}
      </p>
      <p
        onClick={onDateClick}
        className="text-sm text-primary font-PJSbold flex items-center gap-2 cursor-pointer"
      >
        {date}
        <img className="w-5" src={assets.down} alt="Expand date options" />
      </p>
    </div>
    {children}
  </div>
);

const getStartAndEndOfWeek = () => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() + 1); // Set to Monday
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setDate(today.getDate() - today.getDay() + 7); // Set to Sunday
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

const Reports = () => {
  const { currentFacility, setCurrentFacility, myFacilities } =
    useStateContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState({
    bookings: false,
    sales: false,
    users: false,
    creditHolders: false,
    addNew: false,
  });

  const [stats, setStats] = useState([]);
  const { start, end } = getStartAndEndOfWeek();

  // Separate state variables for each section's date range
  const [dateRangeBookings, setDateRangeBookings] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ]);
  const [tempDateRangeBookings, setTempDateRangeBookings] = useState(null);

  const [dateRangeSales, setDateRangeSales] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ]);
  const [tempDateRangeSales, setTempDateRangeSales] = useState(null);

  const [dateRangeUsers, setDateRangeUsers] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ]);
  const [tempDateRangeUsers, setTempDateRangeUsers] = useState(null);

  const [dateRangeCreditHolders, setDateRangeCreditHolders] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ]);
  const [tempDateRangeCreditHolders, setTempDateRangeCreditHolders] =
    useState(null);

  const [dateRangeEvents, setDateRangeEvents] = useState([
    {
      startDate: start,
      endDate: end,
      key: "selection",
    },
  ]);
  const [tempDateRangeEvents, setTempDateRangeEvents] = useState(null);

  useEffect(() => {
    if (currentFacility) {
      getStats();
    }
  }, [currentFacility, dateRangeBookings]);

  // Handler functions to update date ranges
  const handleDateChangeBookings = (ranges) => {
    setTempDateRangeBookings(ranges.selection);
  };

  const handleDateChangeSales = (ranges) => {
    setTempDateRangeSales(ranges.selection);
    // setDateRangeSales([ranges.selection]);
  };

  const handleDateChangeUsers = (ranges) => {
    setTempDateRangeUsers(ranges.selection);
    // setDateRangeUsers([ranges.selection]);
  };

  const handleDateChangeCreditHolders = (ranges) => {
    setTempDateRangeCreditHolders(ranges.selection);
    // setDateRangeCreditHolders([ranges.selection]);
  };

  const handleDateChangeEvents = (ranges) => {
    setTempDateRangeEvents(ranges.selection);
    // setDateRangeEvents([ranges.selection]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][date.getMonth()]
    } ${date.getFullYear().toString().slice(-2)}`;
  };

  const openModal = (section) => {
    setIsModalOpen((prevState) => ({ ...prevState, [section]: true }));
  };

  const closeModal = (section) => {
    setIsModalOpen((prevState) => ({ ...prevState, [section]: false }));
  };

  const handleApply = (section) => {
    if (section === "bookings") {
      setDateRangeBookings([tempDateRangeBookings]);
    } else if (section === "sales") {
      setDateRangeSales([tempDateRangeSales]);
    } else if (section === "users") {
      setDateRangeUsers([tempDateRangeUsers]);
    } else if (section === "creditHolders") {
      setDateRangeCreditHolders([tempDateRangeCreditHolders]);
    } else {
      setDateRangeEvents([tempDateRangeEvents]);
    }

    setTempDateRangeBookings(null);
    setTempDateRangeSales(null);
    setTempDateRangeUsers(null);
    setTempDateRangeCreditHolders(null);
    setTempDateRangeEvents(null);
    closeModal(section);
  };

  useEffect(() => {
    console.log(stats);
  }, [stats]);

  const getStats = async () => {
    setLoading(true);
    try {
      setStats(
        await getFieldsBookingStats(
          currentFacility._id,
          `startDate=${formattedDate(
            dateRangeBookings[0].startDate
          )}&endDate=${formattedDate(dateRangeBookings[0].endDate)}`
        )
      );
    } catch (error) {
      console.log(error);
      setStats([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Facility selection UI */}
      <div className="">
        {/* Facility selection dropdown and modal */}
        <div className="relative">
          <p
            onClick={() => openModal("facility")}
            className="font-PJSextra text-3xl text-primary inline-flex items-center gap-3 cursor-pointer"
          >
            {currentFacility ? currentFacility.name : ""}
            <img
              src={assets.down}
              className="w-6"
              alt="Expand facility options"
            />
          </p>
          <AppModal
            modalopen={isModalOpen.facility}
            onClose={() => closeModal("facility")}
            width="25rem"
            customStyles={{
              overlay: { position: "fixed", top: 0, left: 0, right: 0 },
              modal: {
                position: "absolute",
                top: "30%",
                left: "30%",
                transform: "translate(-50%, -50%)",
                margin: "0",
              },
            }}
          >
            <div>
              <p
                className="text-lg font-PJSbold mt-3"
                style={{ overflowY: "auto" }}
              >
                Select a facility
              </p>
              {myFacilities.map((facility) => {
                return (
                  <div
                    className="flex items-center justify-between mt-6 cursor-pointer"
                    onClick={() => {
                      setCurrentFacility(facility);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          facility &&
                          facility.icon &&
                          facility.icon !== null &&
                          facility.icon !== ""
                            ? facility.icon
                            : assets.placeholder
                        }
                        alt="Club"
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-sm font-PJSregular">{facility.name}</p>
                    </div>
                    {currentFacility &&
                      currentFacility._id === facility._id && (
                        <img
                          src={assets.CheckCircle}
                          className="w-6"
                          alt="Selected"
                        />
                      )}
                  </div>
                );
              })}
              <button
                className="w-full mt-12 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
                onClick={() => {
                  closeModal("facility");
                  openModal("addNew");
                }}
              >
                Add New
              </button>
            </div>
          </AppModal>

          <AddNewFacilityModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            setLoading={setLoading}
          />
        </div>
        <p className="font-PJSregular text-sm text-secondary mt-2">
          Elevate your soccer experience
        </p>
      </div>

      {/* Sections for different reports */}
      <div className="my-10">
        <div className="md:flex items-center gap-4 w-full relative">
          {/* Bookings section */}
          <Section
            title="Bookings"
            // date={`${formatDate(dateRangeBookings[0].startDate)} - ${formatDate(
            //   dateRangeBookings[0].endDate
            // )}`}
            date={`${moment(dateRangeBookings[0].startDate).format(
              "MMM Do, yyyy"
            )} - ${moment(dateRangeBookings[0].endDate).format(
              "MMM Do, yyyy"
            )}`}
            onDateClick={() => openModal("bookings")}
            onTitleClick={() => navigate("BookingReport")}
          >
            <EventBar
              labels={stats.map((s) => s.label)}
              values={stats.map((s) => s.data)}
              isEvent={false}
            />
            {/* {stats.length ? <BookingBar stats={stats} /> : <div />} */}
          </Section>
          <DateRangeModal
            isOpen={isModalOpen.bookings}
            onClose={() => closeModal("bookings")}
            dateRange={
              tempDateRangeBookings
                ? [tempDateRangeBookings]
                : dateRangeBookings
            }
            onDateChange={handleDateChangeBookings}
            onApply={() => handleApply("bookings")}
          />

          {/* Sales section */}
          <Section
            title="Sales"
            // date={`${formatDate(dateRangeSales[0].startDate)} - ${formatDate(
            //   dateRangeSales[0].endDate
            // )}`}
            date={`${moment(dateRangeSales[0].startDate).format(
              "MMM Do, yyyy"
            )} - ${moment(dateRangeSales[0].endDate).format("MMM Do, yyyy")}`}
            onDateClick={() => openModal("sales")}
            onTitleClick={() => navigate("SalesReport")}
          >
            <SalesBar />
          </Section>
          <DateRangeModal
            isOpen={isModalOpen.sales}
            onClose={() => closeModal("sales")}
            dateRange={
              tempDateRangeSales ? [tempDateRangeSales] : dateRangeSales
            }
            onDateChange={handleDateChangeSales}
            onApply={() => handleApply("sales")}
          />
        </div>
        <div className="md:flex items-center gap-4 w-full relative mt-5">
          {/* Users section */}
          <Section
            title="Users"
            // date={`${formatDate(dateRangeUsers[0].startDate)} - ${formatDate(
            //   dateRangeUsers[0].endDate
            // )}`}
            date={`${moment(dateRangeUsers[0].startDate).format(
              "MMM Do, yyyy"
            )} - ${moment(dateRangeUsers[0].endDate).format("MMM Do, yyyy")}`}
            onDateClick={() => openModal("users")}
            onTitleClick={() => navigate("UsersReport")}
          >
            <UsersChart />
          </Section>
          <DateRangeModal
            isOpen={isModalOpen.users}
            onClose={() => closeModal("users")}
            dateRange={
              tempDateRangeUsers ? [tempDateRangeUsers] : dateRangeUsers
            }
            onDateChange={handleDateChangeUsers}
            onApply={() => handleApply("users")}
          />

          {/* Credit Holders section */}
          <Section
            title="Credit Holders"
            // date={`${formatDate(
            //   dateRangeCreditHolders[0].startDate
            // )} - ${formatDate(dateRangeCreditHolders[0].endDate)}`}
            date={`${moment(dateRangeCreditHolders[0].startDate).format(
              "MMM Do, yyyy"
            )} - ${moment(dateRangeCreditHolders[0].endDate).format(
              "MMM Do, yyyy"
            )}`}
            onDateClick={() => openModal("creditHolders")}
            onTitleClick={() => navigate("CreditHolderReport")}
          >
            <CreditHolderChart />
          </Section>
          <DateRangeModal
            isOpen={isModalOpen.creditHolders}
            onClose={() => closeModal("creditHolders")}
            dateRange={
              tempDateRangeCreditHolders
                ? [tempDateRangeCreditHolders]
                : dateRangeCreditHolders
            }
            onDateChange={handleDateChangeCreditHolders}
            onApply={() => handleApply("creditHolders")}
          />
        </div>

        <div className="mt-5 mr-3 relative">
          <Section
            title="Events"
            // date={`${formatDate(dateRangeEvents[0].startDate)} - ${formatDate(
            //   dateRangeEvents[0].endDate
            // )}`}
            date={`${moment(dateRangeEvents[0].startDate).format(
              "MMM Do, yyyy"
            )} - ${moment(dateRangeEvents[0].endDate).format("MMM Do, yyyy")}`}
            onDateClick={() => openModal("events")}
            onTitleClick={() => navigate("EventReport")}
          >
            <EventBar labels={["Active", "Completed"]} values={[2, 6]} />
          </Section>
          <DateRangeModal
            isOpen={isModalOpen.events}
            onClose={() => closeModal("events")}
            dateRange={
              tempDateRangeEvents ? [tempDateRangeEvents] : dateRangeEvents
            }
            onDateChange={handleDateChangeEvents}
            onApply={() => handleApply("events")}
          />
        </div>

        {loading && <Loader />}
      </div>
    </>
  );
};

export default Reports;
