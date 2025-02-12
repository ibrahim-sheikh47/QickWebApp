/* eslint-disable react/prop-types */
import { Select } from "antd";
import { GrDown } from "react-icons/gr";
import assets from "../../assets/assets";
import AppModal from "../../components/AppModal/AppModal";
import { useState } from "react";

const { Option } = Select;

export const Selectable = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  mode,
  style = "custom-select",
  labelStyle = "top-3",

  showInfo = false, // Prop to conditionally show info icon
  modalContent = "", // Content to pass to modal when info icon is clicked
}) => {
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  // Open modal
  const handleInfoClick = () => setModalOpen(true);

  return (
    <div className="relative mt-4">
      <Select
        mode={mode}
        className={`w-full font-PJSmedium text-sm ${style}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        suffixIcon={
          <GrDown style={{ top: "50%", fontSize: 16 }} color="#1F2933" />
        }
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
      <label
        htmlFor={label}
        className={`flex absolute left-4 text-secondary font-PJSmedium text-xs ${labelStyle}`}
      >
        {label}
        {showInfo && (
          <img
            src={assets.info}
            className="ml-2 w-4 h-4 cursor-pointer hover:scale-110 transition-transform duration-300"
            alt="Info"
            onClick={handleInfoClick}
          />
        )}
      </label>
      <AppModal
        modalopen={modalOpen}
        onClose={() => setModalOpen(false)}
        height="auto"
        width="500px"
      >
        <div className="flex flex-col">
          <h3 className="text-xl font-PJSbold">{label}</h3>
          <p className="mt-3 text-secondary text-sm leading-relaxed font-PJSmedium">
            {modalContent}
          </p>{" "}
          {/* Show dynamic content passed as prop */}
        </div>
      </AppModal>
    </div>
  );
};
