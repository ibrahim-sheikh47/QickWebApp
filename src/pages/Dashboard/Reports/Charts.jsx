/* eslint-disable react/prop-types */

import { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const BarChart = ({ data, selectedBar, setSelectedBar }) => {
  return (
    <div className="flex w-full justify-between items-end relative mt-10">
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 flex flex-col items-center relative font-PJSmedium text-sm"
        >
          <div
            className={`w-5 rounded-md shadow cursor-pointer  ${
              selectedBar === value.label ? "bg-lime" : "bg-secondaryTen"
            }`}
            // style={{ height: (value.data / maxHeight) * 100 }}
            style={{ height: "15rem" }}
            onClick={() => setSelectedBar(value.label)}
          />
          <span className="text-sm mt-2">{value.label}</span>
          {selectedBar === value.label && (
            <div
              className="absolute bottom-full flex items-center justify-center w-[105px] h-[34px] rounded-lg px-2 whitespace-nowrap py-1 shadow-md drop-shadow-md"
              style={{ transform: "translateY(-50%)" }}
            >
              <span className="text-sm">{`${value.data} Bookings`}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const BookingBar = ({ stats }) => {
  const [selectedBar, setSelectedBar] = useState(
    stats.length > 0 ? stats[0].label : null
  );

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("BookingReport");
  };

  return (
    <div className="flex flex-col items-center">
      <BarChart
        data={stats}
        selectedBar={selectedBar}
        setSelectedBar={setSelectedBar}
      />
      <button
        className="flex justify-center items-center py-2 absolute bottom-0 my-1"
        onClick={handleNavigation}
      >
        <span className="text-[16px] hover:text-primary font-PJSbold text-secondary">
          See details
        </span>
      </button>
    </div>
  );
};

const SalesBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("SalesReport");
  };

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      "January",
    ],
    datasets: [
      {
        label: "",
        data: [15, 35, 45, 25, 38, 24, 55, 60, 22, 41, 31, 51, 43],
        backgroundColor: (context) => {
          const index = context.dataIndex;
          return index === activeIndex ? "#1F2933" : "#9CFC38";
        },
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setActiveIndex(index === activeIndex ? null : index); // Toggle the active bar
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#1f2933",
          font: {
            size: "14px",
            family: "PJSregular",
          },
          callback: (index) => {
            // Display only first and last labels
            if (index === 0 || index === 12) {
              return "January";
            } else {
              return "";
            }
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            return `$${value}k`;
          },
          color: "#1f2933",
          font: {
            size: "14px",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        padding: 10,
        callbacks: {
          label: (context) => {
            let label = `$${context.parsed.y}k`;
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center mt-4 cursor-pointer max-w-full">
      <Bar data={data} options={options} />
      <button
        className="flex justify-center items-center py-2 absolute bottom-0 my-1"
        onClick={handleNavigation}
      >
        <span className="text-[16px] hover:text-primary font-PJSbold text-secondary">
          See details
        </span>
      </button>
    </div>
  );
};

const UsersChart = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate("UsersReport");
  };
  const ptData = [
    { value: 255, date: "5 Oct 2022" },
    { value: 265, date: "10 Oct 2022" },
    { value: 275, date: "25 Oct 2022" },
    { value: 285, date: "30 Oct 2022" },
    { value: 295, date: "5 Nov 2022" },
    { value: 305, date: "10 Nov 2022" },
    { value: 315, date: "25 Nov 2022" },
    { value: 325, date: "30 Nov 2022" },
    { value: 335, date: "5 Dec 2022" },
    { value: 345, date: "10 Dec 2022" },
    { value: 355, date: "25 Dec 2022" },
    { value: 365, date: "30 Dec 2022" },
  ];
  const data = {
    labels: ptData.map((item) => item.date),
    datasets: [
      {
        label: "",
        borderColor: "#849AB8",
        backgroundColor: "rgba(132, 154, 184, 0.2)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: "#849AB8",
        pointBorderColor: "#849AB8",
        data: ptData.map((item) => item.value),
      },
    ],
  };

  const options = {
    responsive: true,

    animation: {
      duration: 1000,
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 600,
        ticks: {
          stepSize: 100,
          color: "#1f2933",
          font: {
            size: "14px",
          },
        },
        grid: {
          display: true,
          color: "rgba(132,154,184,0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 10,
        enabled: true,
        mode: "index",
        intersect: false,
        displayColors: false,
        callbacks: {
          label: (context) => {
            let label = `${context.parsed.y} Users`;
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center mt-4 cursor-pointer max-w-full">
      <Line data={data} options={options} />
      <button
        onClick={handleNavigation}
        className="flex justify-center items-center py-2 absolute bottom-0 my-1"
      >
        <span className="text-[16px] hover:text-primary font-PJSbold text-secondary">
          See details
        </span>
      </button>
    </div>
  );
};

const CreditHolderChart = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("CreditHolderReport");
  };
  const ptData = [
    { value: 280, date: "5 Oct 2022" },
    { value: 390, date: "10 Oct 2022" },
    { value: 370, date: "25 Oct 2022" },
    { value: 350, date: "30 Oct 2022" },
    { value: 330, date: "5 Nov 2022" },
    { value: 480, date: "10 Nov 2022" },
    { value: 500, date: "25 Nov 2022" },
    { value: 300, date: "30 Nov 2022" },
    { value: 280, date: "5 Dec 2022" },
    { value: 260, date: "10 Dec 2022" },
    { value: 180, date: "25 Dec 2022" },
    { value: 150, date: "30 Dec 2022" },
  ];
  const data = {
    labels: ptData.map((item) => item.date),
    datasets: [
      {
        label: "",
        borderColor: "#33C0DB",
        backgroundColor: "rgba(51, 192, 219, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: "#33C0DB",
        pointBorderColor: "#33C0DB",
        data: ptData.map((item) => item.value),
      },
    ],
  };

  const options = {
    responsive: true,

    animation: {
      duration: 1000,
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 600,
        ticks: {
          stepSize: 100,
          callback: function (value) {
            return "$" + value;
          },
          color: "#1f2933",
          font: {
            size: "14px",
          },
        },
        grid: {
          display: true,
          color: "rgba(132,154,184,0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 10,
        enabled: true,
        displayColors: false,
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            var label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            label += "$" + context.parsed.y;
            label += " in total";
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center mt-4 cursor-pointer max-w-full">
      <Line data={data} options={options} />
      <button
        onClick={handleNavigation}
        className="flex justify-center items-center py-2 absolute bottom-0 my-1"
      >
        <span className="text-[16px] hover:text-primary font-PJSbold text-secondary">
          See details
        </span>
      </button>
    </div>
  );
};

const EventBar = ({ labels, values, isEvent = true }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(isEvent ? "EventReport" : "BookingReport");
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: values, // Replace with your data
        backgroundColor: (context) => {
          if (isEvent) {
            const index = context.dataIndex;
            if (index === activeIndex) {
              return "#1F2933"; // Highlight color for active bar
            }
            return index === 0 ? "#9CFC38" : "#33C0DB"; // Green for "Active", Blue for "Completed"
          } else {
            return "#9CFC38";
          }
        },
        borderWidth: 1,
        barThickness: 20,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        setActiveIndex(index === activeIndex ? null : index); // Toggle the active bar
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#1f2933",
          font: {
            size: "14px",
            family: "PJSregular",
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            return `${value}`; // Display the number as-is
          },
          color: "#1f2933",
          font: {
            size: "14px",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        padding: 10,
        callbacks: {
          label: (context) => {
            let label = `${context.parsed.y}${isEvent ? "" : " Bookings"}`; // Show the number in the tooltip
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center mt-4 cursor-pointer max-w-full">
      <Bar data={data} options={options} />
      <button
        className="flex justify-center items-center py-2 absolute bottom-0 my-1"
        onClick={handleNavigation}
      >
        <span className="text-[16px] hover:text-primary font-PJSbold text-secondary">
          See details
        </span>
      </button>
    </div>
  );
};

export default EventBar;

export { BookingBar, SalesBar, UsersChart, CreditHolderChart, EventBar };
