import React from "react";
import assets from "../../../assets/assets"; // Adjust the import path as necessary
import MonthSelector from "../../../components/MonthSelector/MonthSelector";
import HorizontalDaysList from "../../../components/HorizontalDaysList/HorizontalDaysList";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setSelectedDate } from "../../../redux/store";

const MonthAndDaysToolbar = ({
  onInfoPress,
  onAddBooking,
  selectedFieldOption,
  setIsFieldModalOpen,
  setBookingTypeOpen,
  selectedBookingOption,
}) => {
  const dispatch = useDispatch();
  const { selectedDate } = useSelector((state) => state.calendar);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <MonthSelector />

          <button
            onClick={() => dispatch(setSelectedDate(moment().toISOString()))}
            className="!font-PJSregular !text-[12px] !text-blue !border-blue !rounded-full px-2 py-1 !border"
          >
            Today
          </button>

          <button
            onClick={onInfoPress}
            style={{ border: "none", outline: "none" }}
          >
            <img src={assets.info} className="w-[20px] h-[20px]" alt="Info" />
          </button>

          <label className="!font-PJSregular !text-[12px] !text-blue">
            {moment(selectedDate).format("MMM Do, yyyy")}
          </label>
        </div>

        <div className="flex gap-5">
          <div
            className="bg-transparent text-center justify-center flex h-[42px] rounded-full relative cursor-pointer"
            onClick={() => setBookingTypeOpen(true)}
          >
            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
              Type: {selectedBookingOption.title}
              <img src={assets.down} alt="Down" />
            </p>
          </div>

          <div
            className="bg-transparent text-center justify-center flex h-[42px] rounded-full relative cursor-pointer"
            onClick={() => setIsFieldModalOpen(true)}
          >
            <p className="my-auto flex items-center text-sm gap-2 text-primary font-PJSmedium">
              Fields Available: {selectedFieldOption.title}
              <img src={assets.down} alt="Down" />
            </p>
          </div>

          <button
            className={"text-sm font-PJSmedium"}
            onClick={() => onAddBooking()}
            style={{
              padding: "0.6rem 0.8rem",
              backgroundColor: "#9CFC38",
              color: "#000",
              border: "none",
              borderRadius: "25rem",
            }}
          >
            <div className="flex items-center">
              <img
                src={assets.add}
                className="w-[20px] h-[20px] mr-2"
                alt="Info"
              />
              Add Booking
            </div>
          </button>
        </div>
      </div>

      <hr />

      <HorizontalDaysList />

      <hr />
    </>
  );
};

export default React.memo(MonthAndDaysToolbar, (prevProps, nextProps) => {
  return (
    prevProps.selectedFieldOption.label ===
      nextProps.selectedFieldOption.label &&
    prevProps.selectedBookingOption.label ===
      nextProps.selectedBookingOption.label
  );
});
