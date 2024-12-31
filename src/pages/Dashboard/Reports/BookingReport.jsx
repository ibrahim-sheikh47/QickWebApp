import { useEffect, useState } from "react";
import {
  NewBookingModal,
  RecurringBookingModal,
  LeagueSemiFinalsModal,
  PickupFreePlayModal,
  AcademyModal,
} from "./ReportsDetails";
import { bookings } from "../../../constants/reportsIndex";
import { AppModal } from "../../../components";
import assets from "../../../assets/assets";
import { useStateContext } from "../../../context";
import Loader from "../../../components/Loader/Loader";
import { getAllBookings } from "../../../api/services/bookingService";
import DateRangeModal from "../../../components/DateRangeModal/DateRangeModal";
import {
  capitalizeFirstLetter,
  formatDate,
  formattedDate,
  formattedTime,
} from "../../../constants";
import { getFacilityFields } from "../../../api/services/facilityService";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const BookingReport = () => {
  const { currentFacility } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newBookingModal, setNewBookingModal] = useState(false);
  const [recurringBookingModal, setRecurringBookingModal] = useState(false);
  const [leagueSemiFinalsModal, setLeagueSemiFinalsModal] = useState(false);
  const [pickupFreePlayModal, setPickupFreePlayModal] = useState(false);
  const [academyModal, setAcademyModal] = useState(false);

  const [isDwdModalOpen, setIsDwdModalOpen] = useState(false);
  const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
  const [selectedFieldOption, setSelectedFieldOption] = useState({
    label: "all",
    title: "All",
  });
  const [selectedExportOption, setSelectedExportOption] = useState(null);

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [dateRangeBookings, setDateRangeBookings] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [bookings, setBookings] = useState([]);
  const [fields, setFields] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (currentFacility) {
      fetchAllFacilityFields(); // Fetch fields on facility change
      fetchAllBookings(); // Initial fetch of bookings
    }
  }, [currentFacility]);

  const fetchAllFacilityFields = async () => {
    try {
      const fields = await getFacilityFields(currentFacility._id);
      let mappedResources = fields.map((field) => {
        return {
          label: field._id,
          title: field.name,
        };
      });
      setFields([{ label: "all", title: "All" }, ...mappedResources]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      let query = `startDate=${formattedDate(
        dateRangeBookings[0].startDate
      )}&endDate=${formattedDate(dateRangeBookings[0].endDate)}&facilityId=${
        currentFacility._id
      }`;
      if (selectedFieldOption.label !== "all") {
        query = query + `&fieldId=${selectedFieldOption.label}`;
      }

      const booking = await getAllBookings(query);
      setBookings(booking.bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  const filteredBookings = bookings.filter((booking) => {
    // Case-insensitive search for the name or booking type
    return (
      booking.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.bookingType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const openDownloadModal = () => {
    setIsDwdModalOpen(true);
  };

  const closeModal = () => {
    setIsDwdModalOpen(false);
    setIsFieldModalOpen(false);
  };
  const openFieldModal = () => {
    setIsFieldModalOpen(true);
  };

  const handleDateChangeBookings = (ranges) => {
    setDateRangeBookings([ranges.selection]);
  };

  const handleApplyDateRange = () => {
    setIsDateModalOpen(false); // Close the modal
    fetchAllBookings(); // Fetch the updated bookings
  };

  const handleApplyFieldFilter = () => {
    closeModal(); // Close the modal
    fetchAllBookings(); // Fetch the updated bookings
  };

  const handleBookingClick = (booking) => {
    setSelectedBooking(booking);
    const modalStateMap = {
      "New Booking": setNewBookingModal,
      "Recurring Booking": setRecurringBookingModal,
      "League: Semi-Finals": setLeagueSemiFinalsModal,
      "Pickup: Free Play": setPickupFreePlayModal,
      Academy: setAcademyModal,
    };

    const modalSetter = modalStateMap[booking.type];
    if (modalSetter) {
      modalSetter(true);
    }
  };

  const handleFieldOptionSelect = (option) => {
    setSelectedFieldOption(option);
  };

  const handleExportOptionSelect = (option) => {
    setSelectedExportOption(option);
  };

  function backNav() {
    window.history.back();
  }

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const tableData = bookings.map((booking, index) => [
      index + 1,
      booking.user.name,
      formatDate(booking.startDateTime),
      booking.bookingType,
      booking.field.name,
      `${formattedTime(booking.startDateTime)} - ${formattedTime(
        booking.endDateTime
      )}`,
      booking.status ?? "",
    ]);

    autoTable(doc, {
      head: [
        [
          "#",
          "Booking Holder",
          "Date",
          "Booking Type",
          "Field",
          "Time",
          "Status",
        ],
      ],
      body: tableData,
    });

    doc.save("bookings_report.pdf");
  };

  // Method to export as CSV
  const exportAsCSV = () => {
    if (!bookings || bookings.length === 0) {
      console.error("No bookings data available to export.");
      return;
    }

    try {
      const csvRows = [
        [
          "#",
          "Booking Holder",
          "Date",
          "Booking Type",
          "Field",
          "Time",
          "Status",
        ],
        ...bookings.map((booking, index) => [
          index + 1,
          booking.user?.name || "N/A",
          formatDate(booking.startDateTime) || "N/A",
          booking.bookingType || "N/A",
          booking.field?.name || "N/A",
          `${formattedTime(booking.startDateTime) || "N/A"} - ${
            formattedTime(booking.endDateTime) || "N/A"
          }`,
          booking.status || "N/A",
        ]),
      ];

      // Convert rows to CSV content
      const csvContent = csvRows
        .map((row) => row.map((cell) => `"${cell}"`).join(",")) // Quote each cell for safety
        .join("\n");

      // Create a Blob for the CSV content
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      // Use FileSaver.js or create a download link
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "bookings_report.csv");
      link.style.display = "none";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up URL
    } catch (error) {
      console.error("Error generating CSV:", error);
    }
  };

  // Method to export as Excel
  const exportAsExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      bookings.map((booking, index) => ({
        "#": index + 1,
        "Booking Holder": booking.user.name,
        Date: formatDate(booking.startDateTime),
        "Booking Type": booking.bookingType,
        Field: booking.field.name,
        Time: `${formattedTime(booking.startDateTime)} - ${formattedTime(
          booking.endDateTime
        )}`,
        Status: booking.status,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "bookings_report.xlsx");
  };

  const handleDownload = () => {
    if (selectedExportOption === "As PDF") {
      exportAsPDF();
    } else if (selectedExportOption === "As CSV") {
      exportAsCSV();
    } else if (selectedExportOption === "As Excel") {
      exportAsExcel();
    }
    closeModal();
  };

  return (
    <>
      <div className="">
        <p className="font-PJSextra text-3xl text-primary">
          {currentFacility ? currentFacility.name : ""}
        </p>
        <p className="font-PJSregular text-sm text-secondary mt-2">
          Elevate your soccer experience
        </p>
      </div>

      <div className="bg-white rounded-lg mt-5 p-4">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-4">
            <img
              src={assets.Back}
              alt="Back"
              onClick={backNav}
              className="cursor-pointer"
            />
            <p className="text-2xl font-PJSbold text-primary">
              Bookings
              <span className="text-secondary font-PJSregular text-sm ml-1">
                {`(${bookings.length} Results)`}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <form action="" className="relative mx-auto w-max">
              <input
                type="search"
                className="peer font-PJSregular text-[14px] cursor-pointer relative z-10 h-12 w-12 rounded-full border-2 border-secondaryThirty bg-transparent pl-12 outline-none focus:w-[220px] focus:cursor-text focus:border-lime-300 focus:pl-10 focus:pr-4"
                onChange={handleSearchChange}
              />
              <img
                className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                src={assets.search}
                alt="Search"
              />
            </form>
            <div className="border-2 border-secondaryThirty bg-transparent w-[220px] text-center justify-center flex h-[42px] rounded-full">
              <p
                onClick={() => setIsDateModalOpen(true)}
                className="text-sm text-primary font-PJSbold flex items-center gap-2 cursor-pointer"
              >
                {`${formatDate(dateRangeBookings[0].startDate)} - ${formatDate(
                  dateRangeBookings[0].endDate
                )}`}
                <img
                  className="w-5"
                  src={assets.down}
                  alt="Expand date options"
                />
              </p>
            </div>
            <div
              className="border-2 border-secondaryThirty bg-transparent w-[115px] text-center justify-center flex h-[42px] rounded-full relative cursor-pointer"
              onClick={openFieldModal}
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                {selectedFieldOption.title}
                <img src={assets.down} alt="Down" />
              </p>
            </div>
            <div
              className="border-2 border-secondaryThirty bg-transparent w-[130px] text-center justify-center flex h-[42px] rounded-full cursor-pointer"
              onClick={openDownloadModal}
            >
              <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
                <img src={assets.download} className="w-5 h-5" alt="Download" />
                Download
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            gridTemplateColumns: "10px repeat(6, 1fr)", // Fixed width for the first column
          }}
          className="grid grid-cols-7 items-center gap-20 mx-7 text-sm font-PJSmedium text-[#8f9499] mt-5"
        >
          <p>#</p>
          <p>Booking Holder</p>
          <p>Booking Dates</p>
          <p>Booking Type</p>
          <p>Field Booked</p>
          <p>Time</p>
          <p>Status</p>
        </div>

        <div className="h-[1px] bg-secondaryThirty mt-1"></div>
        <div className="cursor-pointer">
          {filteredBookings.map((booking, index) => (
            <>
              <div
                key={booking._id}
                className={`grid grid-cols-6 items-center gap-20 mx-7 text-sm font-PJSmedium mt-4 ${
                  booking.status === "cancelled"
                    ? "text-secondary"
                    : "text-primary"
                }`}
                style={{
                  gridTemplateColumns: "10px repeat(6, 1fr)", // Custom width for the first column
                }}
                onClick={() => handleBookingClick(booking)}
              >
                <p>
                  <span className="p-1 px-3 bg-secondaryTwenty rounded-full">
                    {index + 1}
                  </span>
                </p>
                <p>
                  <span>{booking.user.name}</span>
                </p>
                <p>
                  <span>{`${formatDate(booking.startDateTime)} - ${formatDate(
                    booking.endDateTime
                  )}`}</span>
                </p>
                <p className="whitespace-nowrap">
                  {capitalizeFirstLetter(booking.bookingType)}
                </p>
                <p>{booking.field.name}</p>
                <p>{`${formattedTime(booking.startDateTime)} - ${formattedTime(
                  booking.endDateTime
                )}`}</p>
                <p>{capitalizeFirstLetter(booking.status)}</p>
              </div>
              <div className="h-[1px] bg-secondaryTwenty my-5"></div>
            </>
          ))}
        </div>
      </div>

      <AppModal
        modalopen={isDwdModalOpen}
        onClose={closeModal}
        height="13.375rem"
        width="18.75rem"
        customStyles={{
          overlay: {
            position: "absolute",
            top: 0,
            right: 0,
          },
          modal: {
            position: "absolute",
            top: "35%",
            right: "0",
            transform: "translate(-20%, -20%)",
            margin: "0",
          },
        }}
      >
        <div className="mt-0">
          <div className="flex items-center gap-2">
            <img src={assets.download} className="w-5 h-5" alt="" />
            <p className="font-PJSmedium text-sm">Download</p>
          </div>
          <div className="h-[1px] w-full my-3 bg-secondaryThirty"></div>

          <div className="font-PJSmedium text-sm flex flex-col gap-2">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleExportOptionSelect("As PDF")}
            >
              <p>As PDF</p>
              {selectedExportOption === "As PDF" && (
                <img src={assets.CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleExportOptionSelect("As CSV")}
            >
              <p>As CSV</p>
              {selectedExportOption === "As CSV" && (
                <img src={assets.CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => handleExportOptionSelect("As Excel")}
            >
              <p>As Excel</p>
              {selectedExportOption === "As Excel" && (
                <img src={assets.CheckCircle} className="w-5" alt="Check" />
              )}
            </div>
          </div>
          <button
            onClick={handleDownload}
            className="w-full mt-4 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          >
            Download
          </button>
        </div>
      </AppModal>

      <AppModal
        modalopen={isFieldModalOpen}
        onClose={closeModal}
        height="280px"
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
            {fields.map((field) => {
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

      <DateRangeModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        dateRange={dateRangeBookings}
        onDateChange={handleDateChangeBookings}
        onApply={handleApplyDateRange}
      />

      {loading && <Loader />}
    </>
  );
};

export default BookingReport;
