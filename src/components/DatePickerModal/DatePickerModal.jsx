import React from "react";
import AppModal from "../AppModal/AppModal";
import { Calendar } from "react-date-range";

function DatePickerModal({
  isOpen,
  onClose,
  height = "25rem",
  width = "24rem",
  overlayStyles = { position: "fixed" },
  modalStyles = { position: "absolute" },
  selectedDate,
  handleDataChange,
  onApply,
}) {
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
      <Calendar
        date={selectedDate} // Replace with your state for the selected date
        onChange={handleDataChange} // A function to handle the date change
        color="#33C0DB"
        minDate={new Date()}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
      />
      <div className="flex gap-4 w-full justify-center font-PJSMedium items-center ">
        <button
          className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-secondaryTen font-PJSmedium justify-center items-center"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="w-full transition duration-300 ease-in-out transform hover:scale-105 h-[54px] text-[14px] rounded-full bg-lime font-PJSmedium justify-center items-center"
          onClick={onApply}
        >
          Apply
        </button>
      </div>
    </AppModal>
  );
}

export default DatePickerModal;
