import React, { useState } from "react";
import moment from "moment"; // You can use any date library like moment.js
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const MonthSelector = ({ currentDate, onMonthChange }) => {
  // Handle the previous month click
  const handlePreviousMonth = () => {
    onMonthChange(currentDate.clone().subtract(1, "months"));
  };

  // Handle the next month click
  const handleNextMonth = () => {
    onMonthChange(currentDate.clone().add(1, "months"));
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handlePreviousMonth}>
        <MdChevronLeft size={30} />
      </button>

      <span className={"text-xl font-PJSbold"}>
        {currentDate.format("MMMM YYYY")} {/* Display current month and year */}
      </span>

      <button style={styles.button} onClick={handleNextMonth}>
        <MdChevronRight size={30} />
      </button>
    </div>
  );
};

// Inline styles for the components
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px", // Spacing between buttons and month text
    padding: "10px",
  },
  button: {
    fontSize: "18px",
    border: "none",
    outline: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default MonthSelector;
