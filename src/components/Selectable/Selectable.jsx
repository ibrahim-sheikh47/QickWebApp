/* eslint-disable react/prop-types */
import { Select } from "antd";
import { GrDown } from "react-icons/gr";

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
}) => {
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
        className={`absolute left-4 text-secondary font-PJSmedium text-xs ${labelStyle}`}
      >
        {label}
      </label>
    </div>
  );
};
