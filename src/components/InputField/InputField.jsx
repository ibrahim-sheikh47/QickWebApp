/* eslint-disable react/prop-types */
const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  style,
  textarea = false, // New prop to determine whether to render a textarea
}) => {
  return (
    <div className="relative mt-4">
      {textarea ? (
        <textarea
          className={`block px-4 pt-10 border rounded-2xl shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full text-black ${style}`}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows="10" // Set the number of rows for textarea
        />
      ) : (
        <input
          className={`block px-4 pt-4 border rounded-2xl shadow-sm focus:outline-none font-PJSmedium text-sm bg-white border-secondaryThirty w-full h-[67px] text-black ${style}`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

      <label
        htmlFor={name} // Updated to use 'name' instead of 'label' for 'htmlFor'
        className="absolute top-4 left-4 text-secondary font-PJSmedium text-xs flex"
      >
        {label}
      </label>

      {/* Modal to show on info icon click */}
    </div>
  );
};

export default InputField;
