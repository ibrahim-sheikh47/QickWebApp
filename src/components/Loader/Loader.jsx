import React from "react";

const Loader = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 flex justify-center items-center"
      style={{ zIndex: 999999 }}
    >
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-lime w-16 h-16"></div>
    </div>
  );
};

export default Loader;
