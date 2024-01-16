import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Import the styles
import "react-date-range/dist/theme/default.css"; // Import the theme

import subtractDaysFromCurrentDate from "../../utils/subtractDaysFromCurrentDate";

export default function FilterDate(props) {
  const { input, onChange } = props;

  const [activeFilter, setActiveFilter] = useState("Today");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleFilterClick = (startDate, endDate, filterName) => {
    onChange(startDate, endDate);
    setActiveFilter(filterName);
  };

  const handleAllTimeClick = () => {
    onChange("", "");
    setActiveFilter("allTime");
  };

  const handleCustomRangeClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateRangeChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;

    // Format the dates to "YYYY-MM-DD" format
    const formattedStartDate = formatCustomDate(startDate);
    const formattedEndDate = formatCustomDate(endDate);

    onChange(formattedStartDate, formattedEndDate);
    setShowDatePicker(false);
    setActiveFilter("customRange");
  };

  const formatCustomDate = (date) => {
    if (!(date instanceof Date)) {
      // If the input is not a Date object, you can try creating one
      date = new Date(date);

      // Check if the created date is valid
      if (isNaN(date.getTime())) {
        // If the date is still not valid, handle the error as needed
        throw new Error("Invalid date");
      }
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="page-rightheader">
        <div className="btn-list">
          <Link style={{ background: "#1837E0", border: "1px solid #1837E0" }} className="btn btn-primary btn-pill" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-calendar me-2 fs-14"></i> {activeFilter === "allTime" ? "All the time" : `${formatDate(input.startDate)} - ${formatDate(input.endDate)}`}
          </Link>
          <div className="dropdown-menu border-0">
            <button className={`dropdown-item text-white ${activeFilter === "allTime" ? "active" : ""}`} onClick={handleAllTimeClick}>
              All the time
            </button>
            <button className={`dropdown-item text-white ${activeFilter === "today" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(0), "today")}>
              Today
            </button>
            <button className={`dropdown-item text-white ${activeFilter === "yesterday" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(1), subtractDaysFromCurrentDate(1), "yesterday")}>
              Yesterday
            </button>
            <button className={`dropdown-item text-white ${activeFilter === "last7Days" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(6), subtractDaysFromCurrentDate(0), "last7Days")}>
              Last 7 days
            </button>
            <button className={`dropdown-item text-white ${activeFilter === "thisMonth" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(29), subtractDaysFromCurrentDate(0), "thisMonth")}>
              This Month
            </button>
            <button className={`dropdown-item text-white ${activeFilter === "lastMonth" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(58), subtractDaysFromCurrentDate(29), "lastMonth")}>
              Last Month
            </button>
            <button className={`dropdown-item text-white ${activeFilter === "lastYear" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(365), subtractDaysFromCurrentDate(0), "lastYear")}>
              Last Year
            </button>
            <button id="daterange-btn" className={`dropdown-item text-white ${activeFilter === "customRange" ? "active" : ""}`} onClick={handleCustomRangeClick}>
              Custom Range
            </button>
          </div>
        </div>

        {/* Custom Date Range Picker */}
        {showDatePicker && (
          <DateRangePicker
            onChange={handleDateRangeChange}
            ranges={[
              {
                startDate: input.startDate || new Date(),
                endDate: input.endDate || new Date(),
                key: "selection",
              },
            ]}
            numberOfCalendars={2}
          />
        )}
      </div>
    </>
  );
}
