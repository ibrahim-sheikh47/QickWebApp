import moment from "moment";
import user1 from "../assets/user.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import user4 from "../assets/user4.png";
import user5 from "../assets/user5.png";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportAsPDF = (bookings) => {
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

/**
 * Export bookings data as a CSV file
 * @param {Array} bookings - List of booking objects
 */
export const exportAsCSV = (bookings) => {
  if (!bookings || bookings.length === 0) {
    console.error("No bookings data available to export.");
    return;
  }

  const csvRows = [
    ["#", "Booking Holder", "Date", "Booking Type", "Field", "Time", "Status"],
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

  const csvContent = csvRows
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "bookings_report.csv");
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export bookings data as an Excel file
 * @param {Array} bookings - List of booking objects
 */
export const exportAsExcel = (bookings) => {
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

export const DATE_FORMAT = "yyyy-MM-DD";

export const formattedDate = (date) => {
  return moment(date).format("yyyy-MM-DD");
};

export const formattedTime = (time) => {
  return moment(time).format("HH:mm A");
};

export const formatDate = (dateString) => {
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

export const capitalizeFirstLetter = (word) => {
  return word.trim().length > 0
    ? word[0].toUpperCase() + word.substring(1)
    : "";
};

export const UserData = [
  {
    id: 1,
    name: "Angelina Marcus",
    message: "Sure, Please wait while...",
    day: "Today",
    time: "1-2PM",
    field: "South Field",
    ago: "2min ago",
    remaining: 2,
    image: user1,
  },
  {
    id: 2,
    name: "Justin McNab",
    message: "Sure! see you ...",
    day: "Today",
    time: "2-3PM",
    field: "North Field",
    ago: "3h ago",
    remaining: 1,
    image: user2,
  },
  {
    id: 3,
    name: "Ryan Reynolds",
    message: "Thanks, Cya tomorrow...",
    day: "Tomorrow",
    time: "11-12PM",
    field: "South Field",
    ago: "2h ago",
    remaining: 1,
    image: user3,
  },
];

export const PushUsers = [
  {
    id: 1,
    name: "Angelina Marcus",
    position: "Amateur",
    image: user1,
  },
  {
    id: 2,
    name: "Justin McNab",
    position: "Intermediate",
    image: user2,
  },
  {
    id: 3,
    name: "Ryan Reynolds",
    position: "Pro",
    image: user3,
  },
  {
    id: 4,
    name: "Ellie Clark",
    position: "Pro",
    image: user4,
  },
  {
    id: 5,
    name: "Michael Travor",
    position: "Amateur",
    image: user5,
  },
];
