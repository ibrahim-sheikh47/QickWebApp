import React from "react";
import { DateRange } from "react-date-range";
import AppModal from "../AppModal/AppModal";

function DateRangeModal({
  isOpen,
  onClose,
  height = "25rem",
  width = "24rem",
  overlayStyles = { position: "fixed" },
  modalStyles = { position: "absolute" },
  dateRange,
  onDateChange,
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
      <DateRange
        editableDateInputs={true}
        onChange={onDateChange}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        showMonthAndYearPickers={false}
        showDateDisplay={false}
        rangeColors={["#33C0DB"]}
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

export default DateRangeModal;
