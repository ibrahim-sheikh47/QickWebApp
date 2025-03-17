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

export const hours = [
  {
    label: "",
    value: "Select Time",
  },
  {
    label: "12:00 AM",
    value: "12:00 AM",
  },
  {
    label: "1:00 AM",
    value: "1:00 AM",
  },
  {
    label: "2:00 AM",
    value: "2:00 AM",
  },
  {
    label: "3:00 AM",
    value: "3:00 AM",
  },
  {
    label: "4:00 AM",
    value: "4:00 AM",
  },
  {
    label: "5:00 AM",
    value: "5:00 AM",
  },
  {
    label: "6:00 AM",
    value: "6:00 AM",
  },
  {
    label: "7:00 AM",
    value: "7:00 AM",
  },
  {
    label: "8:00 AM",
    value: "8:00 AM",
  },
  {
    label: "9:00 AM",
    value: "9:00 AM",
  },
  {
    label: "10:00 AM",
    value: "10:00 AM",
  },
  {
    label: "11:00 AM",
    value: "11:00 AM",
  },
  {
    label: "12:00 PM",
    value: "12:00 PM",
  },
  {
    label: "1:00 PM",
    value: "1:00 PM",
  },
  {
    label: "2:00 PM",
    value: "2:00 PM",
  },
  {
    label: "3:00 PM",
    value: "3:00 PM",
  },
  {
    label: "4:00 PM",
    value: "4:00 PM",
  },
  {
    label: "5:00 PM",
    value: "5:00 PM",
  },
  {
    label: "6:00 PM",
    value: "6:00 PM",
  },
  {
    label: "7:00 PM",
    value: "7:00 PM",
  },
  {
    label: "8:00 PM",
    value: "8:00 PM",
  },
  {
    label: "9:00 PM",
    value: "9:00 PM",
  },
  {
    label: "10:00 PM",
    value: "10:00 PM",
  },
  {
    label: "11:00 PM",
    value: "11:00 PM",
  },
];

export const bookingHours = () => {
  const times = [];
  let currentTime = new Date();
  currentTime.setHours(0, 0, 0, 0); // Start at 12:00 AM

  for (let i = 0; i < 96; i++) {
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const formattedTime = currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    times.push({ label: formattedTime, value: formattedTime });

    currentTime.setMinutes(currentTime.getMinutes() + 15); // Increment by 15 mins
  }

  return times;
};

export const formattedDate = (date) => {
  return moment(date).format("yyyy-MM-DD");
};

export const formattedTime = (time) => {
  return moment(time).format("hh:mm A");
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

export const splitEventByDays = (event) => {
  const { start, end, ...rest } = event; // Extract start, end, and other event properties
  const events = [];

  let currentStart = new Date(start);
  const eventEnd = new Date(end);

  while (currentStart < eventEnd) {
    const currentEnd = new Date(currentStart);
    currentEnd.setHours(23, 59, 59, 999); // End of the current day

    // If the event ends before the day ends, adjust the current end time
    if (currentEnd > eventEnd) {
      currentEnd.setTime(eventEnd.getTime());
    }

    // Push the split event for the current day
    events.push({
      ...rest,
      start: new Date(currentStart),
      end: new Date(currentEnd),
    });

    // Move to the next day
    currentStart = new Date(currentStart);
    currentStart.setDate(currentStart.getDate() + 1);
    currentStart.setHours(0, 0, 0, 0); // Start of the next day
  }

  return events;
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
