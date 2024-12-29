import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const HorizontalDaysList = React.memo(
  ({ selectedMonth, onMonthChange, onDayChange }) => {
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const [daysList, setDaysList] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [itemWidth, setItemWidth] = useState(0);

    useEffect(() => {
      // Ensure the ref is set before calculating width
      if (itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth);
      }
    }, [daysList]);

    useEffect(() => {
      if (selectedMonth) {
        setSelectedDay(moment(selectedMonth).date());
      }
    }, [selectedMonth]);

    const scrollToSelectedDay = useCallback(
      (day) => {
        const container = containerRef.current;
        const selectedIndex = daysList.findIndex((d) => d.date === day);
        if (container && selectedIndex !== -1) {
          const selectedElement = container.children[selectedIndex];
          if (selectedElement) {
            const containerWidth = container.offsetWidth;
            const elementWidth = selectedElement.offsetWidth;
            const scrollPosition =
              selectedElement.offsetLeft -
              containerWidth / 2 +
              elementWidth / 2;

            container.scrollTo({
              left: scrollPosition,
              behavior: "smooth",
            });
          }
        }
      },
      [daysList]
    );

    useEffect(() => {
      scrollToSelectedDay(selectedDay);
    }, [selectedDay, scrollToSelectedDay]);

    // Generate the days from the selected month
    useEffect(() => {
      const generateDays = () => {
        const startOfMonth = moment(selectedMonth).startOf("month");
        const endOfMonth = moment(selectedMonth).endOf("month");
        const currentDate = moment();

        const days = [];
        let day = startOfMonth;

        // Loop through the entire month
        while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
          days.push({
            day: day.format("ddd"), // e.g., Mon, Tue, ...
            date: day.date(),
            fullDate: day.format("YYYY-MM-DD"),
            isToday: currentDate.isSame(day, "day"), // Only mark 'today' if it's the current date in the selected month
          });
          day = day.add(1, "days");
        }

        setDaysList(days);
        // setSelectedDay(currentDate.date()); // Set the selected day as today initially
      };

      generateDays();
    }, [selectedMonth]); // Re-run when selectedMonth changes

    // Scroll to the next day (one item to the right)
    const scrollNext = () => {
      if (containerRef.current && itemWidth > 0) {
        const nextScrollPosition =
          containerRef.current.scrollLeft + (itemWidth + 10);
        containerRef.current.scrollTo({
          left: nextScrollPosition,
          behavior: "smooth",
        });
      }
    };

    // Scroll to the previous day (one item to the left)
    const scrollPrev = () => {
      if (containerRef.current && itemWidth > 0) {
        const prevScrollPosition =
          containerRef.current.scrollLeft - (itemWidth + 10);
        containerRef.current.scrollTo({
          left: prevScrollPosition,
          behavior: "smooth",
        });
      }
    };

    const handleDayClick = (day) => {
      setSelectedDay(day);
      if (onDayChange) {
        const selectedDate = moment(selectedMonth).date(day); // Construct the full date
        onDayChange(selectedDate);
      }
    };

    return (
      <div style={styles.wrapper}>
        <button onClick={scrollPrev} style={styles.button}>
          <MdChevronLeft size={30} />
        </button>

        <div style={styles.container} ref={containerRef}>
          {daysList.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDayClick(day.date)}
              style={{
                ...styles.dayCard,
                backgroundColor: "#fff",
                color: "#333",
                padding: "10px",
              }}
              ref={index === 0 ? itemRef : null}
            >
              <div
                className={"text-large font-PJSbold"}
                style={{
                  ...styles.dateText,
                  height: "40px",
                  width: "40px",
                  backgroundColor:
                    selectedDay === day.date &&
                    moment(selectedMonth).month() === moment().month()
                      ? "#9CFC38"
                      : "transparent",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {day.date}
              </div>
              <div style={styles.dayText}>{day.day}</div>
            </div>
          ))}
        </div>

        <button onClick={scrollNext} style={styles.button}>
          <MdChevronRight size={30} />
        </button>
      </div>
    );
  },
  (prevProps, nextProps) => prevProps.selectedMonth === nextProps.selectedMonth
);

// Inline styles
const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  container: {
    display: "flex",
    overflowX: "auto", // Enable horizontal scrolling
    padding: "10px",
    whiteSpace: "nowrap",
    // scrollbarWidth: "none", // Hide scrollbar in Firefox
  },
  dayCard: {
    height: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  dayText: {
    fontSize: "12px",
    fontWeight: "bold",
  },
  dateText: {
    fontSize: "18px",
    fontWeight: "600",
  },
  button: {
    height: "40px",
    width: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    border: "none",
    outline: "none",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "20px",
    transition: "background-color 0.3s ease",
  },
};

const scrollbarStyles = {
  // Use the ::-webkit-scrollbar pseudo-element to style the scrollbar
  "::webkit-scrollbar": {
    width: "8px", // Set the width of the scrollbar
  },
  "::webkit-scrollbar-track": {
    background: "#f1f1f1", // Track color
  },
  "::webkit-scrollbar-thumb": {
    background: "#888", // Thumb color
    borderRadius: "4px",
  },
  "::webkit-scrollbar-thumb:hover": {
    background: "#555", // Thumb hover color
  },
};

export default HorizontalDaysList;
