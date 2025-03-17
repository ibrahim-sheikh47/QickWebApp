import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import moment from "moment";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { colors } from "@mui/material";

const HorizontalDaysList = React.memo(
  ({ selectedMonth, onMonthCham, onDayChange }) => {
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const [selectedDay, setSelectedDay] = useState(
      moment(selectedMonth).date()
    );

    console.log(selectedMonth.format("YYYY-MM"));

    // Keep track of the last scrolled-to day
    const lastDayRef = useRef(null);

    const daysList = useMemo(() => {
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

      return days;
    }, [selectedMonth.format("YYYY-MM")]);

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
    }, [daysList, selectedDay]);

    const handleDayClick = useCallback(
      (day) => {
        setSelectedDay(day);
        const selectedDate = moment(selectedMonth).date(day);
        onDayChange(selectedDate);
      },
      [onDayChange, selectedMonth]
    );

    const scrollNext = useCallback(() => {
      if (lastDayRef.current === null) {
        lastDayRef.current = selectedDay;
      }

      const nextDay = lastDayRef.current + 1;
      const nextDayIndex = daysList.findIndex((d) => d.date === nextDay);

      if (nextDayIndex !== -1) {
        handleDayClick(nextDay);
      }
    }, [handleDayClick, daysList.length]);

    const scrollPrev = useCallback(() => {
      if (lastDayRef.current === null) {
        lastDayRef.current = selectedDay;
      }

      const prevDay = lastDayRef.current - 1;
      const prevDayIndex = daysList.findIndex((d) => d.date === prevDay);

      if (prevDayIndex !== -1) {
        handleDayClick(prevDay);
      }
    }, [handleDayClick]);

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
                className={`text-large font-PJSbold ${
                  day.isToday
                    ? selectedDay === day.date
                      ? "!text-white !bg-blue"
                      : "!text-blue"
                    : ""
                }`}
                style={{
                  ...styles.dateText,
                  height: "40px",
                  width: "40px",
                  backgroundColor:
                    selectedDay === day.date && !day.isToday
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
              <div
                className={`${day.isToday ? "!text-blue" : ""}`}
                style={styles.dayText}
              >
                {day.day}
              </div>
            </div>
          ))}
        </div>

        <button onClick={scrollNext} style={styles.button}>
          <MdChevronRight size={30} />
        </button>
      </div>
    );
  },
  (prev, next) =>
    prev.selectedMonth.isSame(next.selectedMonth, "month") &&
    prev.onDayChange === next.onDayChange
);

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingInline: "1rem",
  },
  container: {
    display: "flex",
    overflowX: "auto",
    paddingInline: "10px",
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
