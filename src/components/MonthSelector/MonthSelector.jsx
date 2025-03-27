import React, { useState } from "react";
import moment from "moment"; // You can use any date library like moment.js
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../redux/store";

const MonthSelector = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.calendar);

  // Handle the previous month click
  const handlePreviousMonth = () => {
    dispatch(
      setSelectedDate(
        moment(selectedDate).clone().subtract(1, "months").toISOString()
      )
    );
  };

  // Handle the next month click
  const handleNextMonth = () => {
    dispatch(
      setSelectedDate(
        moment(selectedDate).clone().add(1, "months").toISOString()
      )
    );
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={handlePreviousMonth}>
        <MdChevronLeft size={20} />
      </button>

      <span className={"text-xl font-PJSbold"}>
        {moment(selectedDate).format("MMMM YYYY")}{" "}
        {/* Display current month and year */}
      </span>

      <button style={styles.button} onClick={handleNextMonth}>
        <MdChevronRight size={20} />
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
    fontSize: "12px",
    border: "none",
    outline: "none",
    padding: "5px",
    cursor: "pointer",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default React.memo(MonthSelector);
