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
      if (itemRef.current) {
        setItemWidth(itemRef.current.offsetWidth);
      }
    }, [daysList]);

    // Keep track of the last scrolled-to day
    const lastDayRef = useRef(null);

    // Set the initial selected day
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
              selectedElement.offsetLeft - containerWidth / 2 + elementWidth / 2;

            container.scrollTo({
              left: scrollPosition,
              behavior: "smooth",
            });

            // Save the last scrolled-to day
            lastDayRef.current = day;
          }
        }
      },
      [daysList]
    );

    // Scroll to the selected day on change
    useEffect(() => {
      if (selectedDay && daysList.length > 0) {
        scrollToSelectedDay(selectedDay);
      }
    }, [selectedDay, daysList, scrollToSelectedDay]);

    // Generate the list of days for the selected month
    useEffect(() => {
      const generateDays = () => {
        const startOfMonth = moment(selectedMonth).startOf("month");
        const endOfMonth = moment(selectedMonth).endOf("month");
        const currentDate = moment();

        const days = [];
        let day = startOfMonth;

        while (day.isBefore(endOfMonth) || day.isSame(endOfMonth, "day")) {
          days.push({
            day: day.format("ddd"),
            date: day.date(),
            fullDate: day.format("YYYY-MM-DD"),
            isToday: currentDate.isSame(day, "day"),
          });
          day = day.add(1, "days");
        }

        setDaysList(days);
      };

      generateDays();
    }, [selectedMonth]);

    const scrollNext = () => {
      if (lastDayRef.current === null) {
        lastDayRef.current = selectedDay;
      }

      const nextDay = lastDayRef.current + 1;
      const nextDayIndex = daysList.findIndex((d) => d.date === nextDay);

      if (nextDayIndex !== -1) {
        handleDayClick(nextDay);
      }
    };

    const scrollPrev = () => {
      if (lastDayRef.current === null) {
        lastDayRef.current = selectedDay;
      }

      const prevDay = lastDayRef.current - 1;
      const prevDayIndex = daysList.findIndex((d) => d.date === prevDay);

      if (prevDayIndex !== -1) {
        handleDayClick(prevDay);
      }
    };

    const handleDayClick = (day) => {
      setSelectedDay(day);
      lastDayRef.current = day; // Update last scrolled-to day
      if (onDayChange) {
        const selectedDate = moment(selectedMonth).date(day);
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

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  container: {
    display: "flex",
    overflowX: "auto",
    padding: "10px",
    whiteSpace: "nowrap",
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

export default HorizontalDaysList;
