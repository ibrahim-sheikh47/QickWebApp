import React, { useEffect, useState } from "react";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

import AppModal from "../AppModal/AppModal";
import TimePicker from "react-time-picker";

function TimePickerModal({
  isOpen,
  onClose,
  height = "15rem",
  width = "24rem",
  overlayStyles = { position: "fixed" },
  modalStyles = { position: "absolute" },
  selectedTime,
  handleTimeChange,
  onApply,
}) {
  const convertTo24Hour = (time) => {
    if (!time) return null;
    const [hours, minutes] = time.split(":");
    const isPM = time.toLowerCase().includes("pm");
    let hours24 = parseInt(hours, 10);
    if (isPM && hours24 !== 12) hours24 += 12; // Convert PM to 24-hour format
    if (!isPM && hours24 === 12) hours24 = 0; // Convert 12 AM to 0
    return `${hours24.toString().padStart(2, "0")}:${minutes.slice(0, 2)}`;
  };

  const [time, setTime] = useState(
    () => convertTo24Hour(selectedTime) // Default time
  );

  useEffect(() => {
    // Update time when selectedTime changes
    setTime(convertTo24Hour(selectedTime));
  }, [selectedTime]);

  const handleApply = () => {
    onApply(time);
  };

  const formatTimeWithAmPm = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${
      minutes < 10 ? `0${minutes}` : minutes
    } ${period}`;
  };

  return (
    <AppModal
      modalopen={isOpen}
      onClose={onClose}
      height={height}
      width={width}
      customStyles={{
        overlay: overlayStyles,
        modal: modalStyles,
      }}
    >
      <div className="flex flex-col gap-6 items-center">
        <TimePicker
          orientation="landscape"
          disableClock={true}
          className="w-full mt-8"
          isOpen
          format="hh:mm a"
          views={["hours", "minutes"]}
          value={time}
          onChange={(newTime) => {
            const formattedTime = formatTimeWithAmPm(newTime); // Format the time with AM/PM
            setTime(formattedTime); // Update state with the formatted time
            handleTimeChange && handleTimeChange(formattedTime);
          }}
        />
        <div className="flex gap-4 w-full justify-center font-PJSMedium items-center">
          <button
            className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default TimePickerModal;
