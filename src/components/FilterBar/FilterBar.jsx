import React from "react";
import { formatDate } from "../../constants";

export const FilterBar = ({
  dateRange,
  fields,
  onDateRangeClick,
  onFieldClick,
  onDownloadClick,
  selectedField,
  onSearch,
}) => (
  <div className="flex justify-between">
    <div>
      <input
        type="search"
        placeholder="Search..."
        className="border rounded-full px-4"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>

    <div className="flex gap-4">
      <button onClick={onDateRangeClick}>
        {`${formatDate(dateRange[0].startDate)} - ${formatDate(
          dateRange[0].endDate
        )}`}
      </button>
      <button onClick={onFieldClick}>{selectedField}</button>
      <button onClick={onDownloadClick}>Download</button>
    </div>
  </div>
);
