/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import moment from "moment";

export const SelectDate = ({ label, value, onChange, placeholder }) => {
  // Make sure value is a moment object, or set to null if invalid
  const parsedValue =
    value && moment(value, "YYYY-MM-DD", true).isValid()
      ? moment(value, "YYYY-MM-DD")
      : null;

  return (
    <div className="relative">
      <DatePicker
        style={{
          height: 67,
          paddingTop: 20,
          paddingLeft: 15,
          borderRadius: 16,
          borderColor: "#849AB84D",
        }}
        className="w-full font-PJSmedium text-sm custom-date"
        value={parsedValue} // Ensure value is a moment object
        onChange={(date) => {
          if (date) {
            // Send the raw moment object or formatted string (YYYY-MM-DD)
            onChange(date.format("YYYY-MM-DD")); // Update parent with raw date string
          } else {
            console.error("Invalid date selected");
          }
        }}
        placeholder={placeholder}
        format="MMMM Do, YYYY" // Display format
      />
      <label
        htmlFor={label}
        className="absolute top-3 left-4 text-secondary font-PJSmedium text-xs"
      >
        {label}
      </label>
    </div>
  );
};
