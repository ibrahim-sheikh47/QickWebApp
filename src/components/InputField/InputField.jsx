/* eslint-disable react/prop-types */

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  style,
}) => {
  return (
    <div className="relative mt-4">
      <input
        className={`block px-4 pt-4 border rounded-2xl shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[67px] text-black ${style}`}
        type={type}
        name={name} // Added name attribute here
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <label
        htmlFor={label}
        className="absolute top-4 left-4 text-secondary font-PJSmedium text-xs"
      >
        {label}
      </label>
    </div>
  );
};

export default InputField;
