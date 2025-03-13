/* eslint-disable react/prop-types */
import React from "react";
import { GrFormClose } from "react-icons/gr";

//svg
import cross from "../../assets/svgs/Cross.svg";

const AppModal = ({
  onClose,
  children,
  modalopen,
  height,
  width,
  customStyles,
}) => {
  if (!modalopen) return null;
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50  "
      style={customStyles?.overlay}
      onClick={onClose}
    >
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => {}}
      ></div>
      <div
        className={`relative z-10 bg-white p-6 rounded-[16px] shadow-lg   no-scrollbar  overscroll-none`}
        style={{ height: height, width: width, ...customStyles?.modal }}
        onClick={handleModalContentClick}
      >
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={onClose}
          >
            <img src={cross} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AppModal;
