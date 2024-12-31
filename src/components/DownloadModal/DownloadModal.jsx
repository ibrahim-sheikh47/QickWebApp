import React from "react";
import AppModal from "../AppModal/AppModal";

const DownloadModal = ({
  modalopen,
  onClose,
  height = "auto",
  width = "auto",
  customStyles = {},
  children,
}) => {
  if (!modalopen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center"
      style={customStyles.overlay}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6"
        style={{ height, width, ...customStyles.modal }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default DownloadModal;
