import React, { useRef, useState } from "react";
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
  const [days, setDays] = useState(
    initialDays.map((dayObj) => {
      const matchingDay = currentFacility.hoursOfOperation.find(
        (h) => h.day === dayObj.day
      );

      const res = {
        ...dayObj,
        open: matchingDay ? matchingDay.open : "9:00 AM", // Default to "9:00am"
        close: matchingDay ? matchingDay.close : "6:00 PM", // Default to "6:00pm"
        checked: !!matchingDay, // Checked if a matching day exists
      };
      return res;
    })
  );
  const [editMode, setEditMode] = useState(false); // State to control edit mode
  const [loading, setLoading] = useState(false);
  const tempTime = useRef(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const handleCheckboxChange = (index) => {
    if (editMode) {
      const newDays = [...days];
      newDays[index].checked = !newDays[index].checked;
      setDays(newDays);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
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
      const body = {
        hoursOfOperation: days.filter((d) => d.checked),
        holidays: selectedDates
          .map((sd) => moment(sd).format("yyyy-MM-DD"))
          .join(","),
      };
      const facility = await editFacility(body, currentFacility._id);
      setCurrentFacility(facility);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
          const openTime = moment(time, "hh:mm A");
          const closeTime = moment(currentDay.close, "hh:mm A");
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

        const openTime = moment(currentDay.open, "hh:mm A");
        const closeTime = moment(time, "hh:mm A");
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
    setSelectedDates([...selectedDates, date]);
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
        <button
          onClick={toggleEditMode}
          className="font-PJSregular transition-transform text-sm border-2 flex items-center gap-3 border-secondaryTwenty hover:bg-secondaryTwenty rounded-full px-6 py-2 cursor-pointer"
        >
          {editMode ? "Save Timings" : "Edit Timings"}
          <img className="w-4" src={assets.editBlack} alt="" />
        </button>
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
                      disabled={!editMode}
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
            <input
              className="block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]"
              type="text"
              disabled={!editMode ? true : false}
              readOnly
              value={entry.open}
              onClick={() => {
                setTimePickType(`${index}-open`);
                setTimeModal(true);
              }}
              // onChange={(e) => handleInputChange(e, index, "open")}
            />
            <input
              className="block px-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]"
              type="text"
              disabled={!editMode ? true : false}
              readOnly
              value={entry.close}
              onClick={() => {
                setTimePickType(`${index}-close`);
                setTimeModal(true);
              }}
              // onChange={(e) => handleInputChange(e, index, "close")}
            />
          </React.Fragment>
        ))}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-1 mt-10">
          <div className="font-PJSbold text-xl">Holidays</div>
          <button>
            <img src={assets.Info} className="w-[20px] h-[20px]" alt="Info" />
          </button>
        </div>
        <div className="relative mt-5">
          <div className="relative">
            <input
              onClick={() => setDateModal(true)}
              {...register("holidays")}
              value={selectedDates
                .map((sd) => moment(sd).format("yyyy-MM-DD"))
                .join(",")}
              className="block px-4 pt-4 border rounded-lg shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[54px]"
              type="text"
              readOnly
            />
            {selectedDates.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedDates([])} // Clear the dates
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-red-500 focus:outline-none"
              >
                X
              </button>
            )}
          </div>
          <label
            htmlFor="holidays"
            className="absolute top-2 left-4 text-secondary font-PJSmedium text-xs"
          >
            Holidays*
          </label>
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
        selectedDate={null}
        handleDataChange={handleSingleDateChange}
        onApply={() => setDateModal(!dateModal)}
      />

      {timeModal && (
        <TimePickerModal
          isOpen={timeModal}
          onClose={() => {
            setTimeModal(!timeModal);
            setTimePickType(null);
            tempTime.current = null;
          }}
          selectedTime={
            timePickType
              ? days[parseInt(timePickType.split("-")[0])][
                  timePickType.split("-")[1]
                ]
              : null
          }
          handleTimeChange={(e) => {
            tempTime.current = e;
          }}
          onApply={() => {
            handleInputChange(
              tempTime.current,
              parseInt(timePickType.split("-")[0]),
              timePickType.split("-")[1]
            );
            setTimeModal(!timeModal);
            tempTime.current = null;
            setTimePickType(null);
          }}
        />
      )}

      <Toast open={open} setOpen={setOpen} message={message} type={type} />
    </div>
  );
};

export default HrsOperation;
