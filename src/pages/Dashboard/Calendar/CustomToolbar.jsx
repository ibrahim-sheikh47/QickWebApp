import React from "react";
import MonthAndDaysToolbar from "./MonthAndDaysToolbar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedResource } from "../../../redux/store";

const CustomToolbar = ({
  onInfoPress,
  onAddBooking,
  resources,
  selectedFieldOption,
  setIsFieldModalOpen,
  setBookingTypeOpen,
  selectedBookingOption,
}) => {
  const dispatch = useDispatch();
  const { selectedResource } = useSelector((state) => state.calendar);

  return (
    <div className="rbc-toolbar">
      <div
        style={{
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          transition: "all 0.3s ease",
          overflowX: "auto",
        }}
      >
        <MonthAndDaysToolbar
          onInfoPress={onInfoPress}
          onAddBooking={onAddBooking}
          selectedFieldOption={selectedFieldOption}
          setIsFieldModalOpen={setIsFieldModalOpen}
          setBookingTypeOpen={setBookingTypeOpen}
          selectedBookingOption={selectedBookingOption}
        />

        {/* Resource Tabs */}
        <div
          style={{
            display: "flex",
            // marginTop: "0.5rem",
            overflowX: "auto",
          }}
        >
          {resources.map((resource, index) => (
            <div
              key={`${index}`}
              className="flex"
              style={{
                flex: resource.label === "all" ? "0 0 5.5rem" : "1",
              }}
            >
              <button
                key={resource.label}
                className={"text-large font-PJSbold"}
                onClick={() => {
                  dispatch(setSelectedResource(resource.label));
                }}
                style={{
                  flex: 1,
                  paddingTop: "0.7rem",
                  paddingBottom: "0.7rem",
                  border: "none",
                  borderBottom:
                    selectedResource === resource.label
                      ? "5px solid #33C0DB"
                      : "none",
                  backgroundColor: "transparent",
                  color:
                    selectedResource === resource.label ? "#33C0DB" : "#000",
                  cursor: "pointer",
                }}
              >
                {resource.title}
              </button>

              {index < resources.length - 1 && (
                <div
                  style={{
                    backgroundColor: "#dddddd",
                    width: "0.04rem",
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(CustomToolbar, (prev, next) => {
  return (
    prev.selectedResource === next.selectedResource &&
    prev.resources === next.resources
  );
});
