/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";

const AppModal = React.memo(
  ({ onClose, children, modalopen, height, width, customStyles }) => {
    const modalContentRef = useRef(null);
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
      const checkScrollbar = () => {
        if (modalContentRef.current) {
          setHasScrollbar(
            modalContentRef.current.scrollHeight >
              modalContentRef.current.clientHeight
          );
        }
      };

      checkScrollbar();
      window.addEventListener("resize", checkScrollbar);
      return () => window.removeEventListener("resize", checkScrollbar);
    }, [children]);

    if (!modalopen) return null;

    const handleModalContentClick = (e) => {
      e.stopPropagation();
    };

    return (
      <div
        className="fixed inset-0 flex items-center justify-center z-50"
        style={customStyles?.overlay}
        onClick={onClose}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => {}}
        ></div>
        <div
          className="relative z-10 bg-white p-6 shadow-lg rounded-[16px]"
          style={{
            height: height,
            width: width,
            ...customStyles?.modal,
          }}
          onClick={handleModalContentClick}
        >
          <div
            ref={modalContentRef}
            style={{
              scrollbarWidth: "thin",
              paddingInlineEnd: hasScrollbar ? "8px" : "0px", // Adjust padding when scrollbar is present
            }}
            className="max-h-[80vh] overflow-y-auto scrollbar scrollbar-thumb-gray-500 scrollbar-track-gray-200"
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
);

export default AppModal;
