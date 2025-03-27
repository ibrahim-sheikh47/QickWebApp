import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import moment from "moment";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDate } from "../../redux/store";

const HorizontalDaysList = () => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.calendar);
  const containerRef = useRef(null);
  const [selectedDay, setSelectedDay] = useState(moment(selectedDate).date());

  const daysList = useMemo(() => {
    const startOfMonth = moment(selectedDate).startOf("month");
    const endOfMonth = moment(selectedDate).endOf("month");
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
  }, [selectedDate]);

  const scrollToSelectedDay = useCallback(() => {
    const container = containerRef.current;
    const selectedIndex = daysList.findIndex((d) => d.date === selectedDay);

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
      }
    }
  }, [daysList, selectedDay]);

  // Scroll to the selected day when selectedDay changes
  useEffect(() => {
    console.log(selectedDay);
    scrollToSelectedDay();
  }, [selectedDay, scrollToSelectedDay]);

  // Reset selectedDay when the selectedDate changes
  useEffect(() => {
    const newSelectedDay = moment(selectedDate).date();
    if (newSelectedDay !== selectedDay) {
      setSelectedDay(newSelectedDay);
    }
  }, [selectedDate]);

  const handleDayClick = useCallback(
    (day) => {
      if (day !== selectedDay) {
        setSelectedDay(day);
        const selectedDateX = moment(selectedDate).date(day);
        dispatch(setSelectedDate(moment(selectedDateX).toISOString()));
      }
    },
    [selectedDate, selectedDay]
  );

  const scrollNext = useCallback(() => {
    const nextDay = selectedDay + 1;
    if (daysList.some((d) => d.date === nextDay)) {
      handleDayClick(nextDay);
    }
  }, [handleDayClick, selectedDay, daysList]);

  const scrollPrev = useCallback(() => {
    const prevDay = selectedDay - 1;
    if (daysList.some((d) => d.date === prevDay)) {
      handleDayClick(prevDay);
    }
  }, [handleDayClick, selectedDay, daysList]);

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
};

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

export default React.memo(HorizontalDaysList);
