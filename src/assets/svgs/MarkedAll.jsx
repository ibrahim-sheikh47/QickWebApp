import React from "react";

const MarkedAll = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <path d="M12 12h8.25M12 6h8.25M12 18h8.25M3.75 6l1.5 1.5 3-3M3.75 12l1.5 1.5 3-3M3.75 18l1.5 1.5 3-3" />
    </g>
  </svg>
);

export default MarkedAll;
