import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { initialDays } from "../../../constants/profile-index";
import assets from "../../../assets/assets";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useStateContext } from "../../../context";
import { editFacility } from "../../../api/services/facilityService";
import Loader from "../../../components/Loader/Loader";
import DatePickerModal from "../../../components/DatePickerModal/DatePickerModal";
import moment from "moment";
import TimePickerModal from "../../../components/TimePickerModal/TimePickerModal";
import Toast from "../../../components/Toast/Toast";
import { format } from "date-fns";

const hours = [
  {
    label: "",
    value: "",
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

const HrsOperation = () => {
  const { user, currentFacility, setCurrentFacility } = useStateContext();
  const [timePickType, setTimePickType] = useState(null);
  const [dateModal, setDateModal] = useState(false);
  const [timeModal, setTimeModal] = useState(false);
  const [selectedDates, setSelectedDates] = useState(
    currentFacility && currentFacility.holidays
      ? currentFacility.holidays.split(",")
      : []
  );
  const [holidays, setHolidays] = useState("");
  const [days, setDays] = useState(
    initialDays.map((dayObj) => {
      const matchingDay = currentFacility.hoursOfOperation.find(
        (h) => h.day === dayObj.day
      );

      return {
        ...dayObj,
        open: matchingDay ? matchingDay.open : null, // Set to null if no matching day
        close: matchingDay ? matchingDay.close : null, // Set to null if no matching day
        checked: !!matchingDay && matchingDay.open && matchingDay.close, // Checked if a matching day exists
      };
    })
  );
  const [loading, setLoading] = useState(false);
  const tempTime = useRef(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  useEffect(() => {
    if (selectedDates.length > 0) {
      setHolidays(
        selectedDates
          .map((date) => {
            return moment(date).format("MMM Do yyyy");
          })
          .join(", ")
      );
    } else {
      setHolidays("");
    }
  }, [selectedDates]);

  const textareaRef = useRef(null);

  // Adjust the textarea height dynamically based on its content
  const handleHolidayChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust height to fit content
    }
  };

  useEffect(() => {
    handleHolidayChange(); // Adjust height when the component mounts
  }, [holidays]);

  const handleCheckboxChange = (index) => {
    const newDays = [...days];
    newDays[index].checked = !newDays[index].checked;
    setDays(newDays);
  };

  const validationSchema = yup.object().shape({
    holidays: yup.string(),
    // .required("Holidays required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const transformedDays = days.map((day) => {
        if (!day.checked) {
          return {
            ...day,
            open: null,
            close: null,
          };
        }
        return day;
      });

      const body = {
        hoursOfOperation: transformedDays,
        holidays: selectedDates
          .map((sd) => moment(sd).format("yyyy-MM-DD"))
          .join(","),
      };
      const facility = await editFacility(body, currentFacility._id);
      setCurrentFacility(facility);

      showToast("Hours of operation successfully updated");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (time, index, field) => {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      const currentDay = updatedDays[index];

      if (field === "open") {
        currentDay.open = time;

        if (currentDay.close) {
          const openTime = moment(time, "h:mm A");
          const closeTime = moment(currentDay.close, "h:mm A");
          const duration = moment.duration(closeTime.diff(openTime));

          if (duration.asHours() < 5) {
            showToast(
              "The opening and closing times must differ by at least 5 hours.",
              "error"
            );
            currentDay.close = ""; // Reset close time if invalid
          }
        }
      } else if (field === "close") {
        if (!currentDay.open) {
          showToast("Please set the opening time first.", "error");
          return prevDays; // Return previous state without changes
        }

        const openTime = moment(currentDay.open, "h:mm A");
        const closeTime = moment(time, "h:mm A");
        const duration = moment.duration(closeTime.diff(openTime));

        if (closeTime.isBefore(openTime)) {
          showToast(
            "Close time cannot be earlier than the open time.",
            "error"
          );
          return prevDays; // Return previous state without changes
        }

        if (duration.asHours() < 5) {
          showToast(
            "The opening and closing times must differ by at least 5 hours.",
            "error"
          );
          return prevDays; // Return previous state without changes
        }

        currentDay.close = time;
      }

      return updatedDays;
    });
  };

  const handleSingleDateChange = (date) => {
    const formattedDate = format(date, "yyyy-MM-dd"); // Format date for easy comparison

    // Toggle selection (deselect if already selected)
    if (selectedDates.includes(formattedDate)) {
      setSelectedDates(selectedDates.filter((d) => d !== formattedDate));
    } else {
      setSelectedDates([...selectedDates, formattedDate]);
    }
    // setSelectedDates([...selectedDates, date]);
  };

  const renderDayContent = (day) => {
    const formattedDay = format(day, "yyyy-MM-dd");
    const isSelected = selectedDates.includes(formattedDay);

    return (
      <div
        style={{
          // borderColor: isSelected ? "#33C0DB" : "transparent",
          // borderWidth: 1,
          color: isSelected ? "#33C0DB" : "black",
          ...(isSelected && { fontWeight: "bold" }),
          // borderRadius: "38%",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
        }}
      >
        {format(day, "d")}
      </div>
    );
  };

  const showToast = (message, type = "success") => {
    setMessage(message);
    setType(type);
    setOpen(true);
  };

  return (
    <div className="mx-3 mt-4">
      <div className="flex items-center justify-between">
        <p className="font-PJSbold text-xl">Hours of Operation</p>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
        <div className="font-PJSbold py-4">Days</div>
        <div className="font-PJSbold py-4">Open</div>
        <div className="font-PJSbold py-4">Close</div>
        {days.map((entry, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex items-center ${
                !entry.checked ? "opacity-50" : ""
              }`}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={entry.checked}
                      onChange={() => handleCheckboxChange(index)}
                      sx={{
                        color: "rgba(132, 154, 184, 0.2)",
                        "&.Mui-checked": { color: "rgba(51, 192, 219, 1)" },
                        "&:focus": { color: "rgba(51, 192, 219, 1)" },
                        "& .MuiSvgIcon-root": { fontSize: 32 },
                      }}
                    />
                  }
                />
              </FormGroup>
              <div
                className={`ml-[-10px] font-PJSmedium text-sm ${
                  !entry.checked ? "opacity-50" : ""
                }`}
              >
                {entry.day}
              </div>
            </div>
            <select
              onChange={(e) => handleInputChange(e.target.value, index, "open")}
              disabled={!entry.checked ? true : false}
              value={entry.open}
              className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]`}
            >
              {hours.map((h) => {
                return <option value={h.label}>{h.value}</option>;
              })}
            </select>

            <select
              onChange={(e) => handleInputChange(e.target.value, index, "close")}
              disabled={!entry.checked ? true : false}
              value={entry.close}
              className={`block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]`}
            >
              {hours.map((h) => {
                return <option value={h.label}>{h.value}</option>;
              })}
            </select>
          </React.Fragment>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-1 mt-10">
          <div className="font-PJSbold text-xl">Holidays</div>
        </div>

        <div className="block px-4 pb-4 border rounded-lg shadow-sm focus:outline-none bg-white border-secondaryThirty w-full mt-4">
          <label
            htmlFor="holidays"
            className="text-secondary font-PJSmedium text-xs"
          >
            Holidays*
          </label>
          <div className="flex items-center gap-1 w-full">
            {/* Add margin-top to textarea to create space for the label */}
            <textarea
              onClick={() => setDateModal(true)}
              {...register("holidays")}
              value={holidays}
              className="font-PJSmedium text-sm w-full resize-y my-2" // Allow vertical resizing
              style={{ minHeight: "40px", height: "auto" }} // Set a min height and allow height to grow
              readOnly
            />
            {selectedDates.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedDates([]); // Clear the dates
                }}
                className="transform -translate-y-1/2 text-secondary hover:text-red-500 focus:outline-none"
              >
                X
              </button>
            )}
          </div>
          {errors.holidays && (
            <p className="text-red-500">{errors.holidays.message}</p>
          )}
        </div>

        <div className="flex mt-5 gap-4 w-full justify-center font-PJSMedium items-center">
          <button className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center">
            Cancel
          </button>
          <button
            type="submit"
            className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          >
            Save Changes
          </button>
        </div>

        {loading && <Loader />}
      </form>

      <DatePickerModal
        isOpen={dateModal}
        onClose={() => {
          setDateModal(!dateModal);
        }}
        dates={selectedDates}
        selectedDate={null}
        handleDataChange={handleSingleDateChange}
        onApply={() => setDateModal(!dateModal)}
        renderDayContent={renderDayContent}
      />

      <Toast open={open} setOpen={setOpen} message={message} type={type} />
    </div>
  );
};

export default HrsOperation;
