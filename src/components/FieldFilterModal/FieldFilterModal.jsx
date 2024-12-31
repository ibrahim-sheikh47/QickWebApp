import React from "react";
import AppModal from "../AppModal/AppModal";

export const FieldFilterModal = ({
  isOpen,
  fields,
  selectedField,
  onSelect,
  onApply,
  onClose,
}) => (
  <AppModal
    modalopen={isOpen}
    onClose={onClose}
    height="280px"
    width="300px"
    customStyles={{
      overlay: {
        position: "absolute",
        top: 0,
        right: 0,
      },
      modal: {
        position: "absolute",
        top: "45%",
        right: "0",
        transform: "translate(-50%, -50%)",
        margin: "0",
      },
    }}
  >
    <div>
      <h2 className="font-medium text-sm">Filter</h2>
      <div className="h-[1px] w-full my-2 bg-secondaryThirty"></div>

      <div className="font-medium text-sm flex flex-col gap-2">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => onSelect(field)}
          >
            <p className="underline">{field.title}</p>
            {selectedField === field.label && (
              <img src="path_to_check_icon" alt="Selected" className="w-5" />
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onApply}
        className="w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105 h-[40px] text-[14px] rounded-full bg-lime font-medium justify-center items-center"
      >
        Apply
      </button>
    </div>
  </AppModal>
);
