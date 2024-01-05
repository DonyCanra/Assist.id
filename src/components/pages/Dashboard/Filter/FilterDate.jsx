import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";

export default function FilterDate(props) {
  const { input, onChange } = props;

  const [activeFilter, setActiveFilter] = useState("allTime");

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleFilterClick = (startDate, endDate, filterName) => {
    onChange(startDate, endDate);
    setActiveFilter(filterName);
  };

  useEffect(() => {
    // Update the active filter when input changes
    setActiveFilter("allTime"); // You can set the default active filter based on your requirement
  }, [input]);

  return (
    <>
      <div className="page-rightheader">
        <div className="btn-list">
          <Link className="btn btn-primary btn-pill" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-calendar me-2 fs-14"></i> {formatDate(input.startDate)} - {formatDate(input.endDate)}
          </Link>
          <div className="dropdown-menu border-0">
            <button className={`dropdown-item ${activeFilter === "allTime" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(0), "allTime")}>
              All the time
            </button>
            <button className={`dropdown-item ${activeFilter === "today" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(0), "today")}>
              Today
            </button>
            <button className={`dropdown-item ${activeFilter === "yesterday" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(1), subtractDaysFromCurrentDate(1), "yesterday")}>
              Yesterday
            </button>
            <button className={`dropdown-item ${activeFilter === "last7Days" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(6), "last7Days")}>
              Last 7 days
            </button>
            <button className={`dropdown-item ${activeFilter === "thisMonth" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(29), "thisMonth")}>
              This Month
            </button>
            <button className={`dropdown-item ${activeFilter === "lastMonth" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(29), subtractDaysFromCurrentDate(58), "lastMonth")}>
              Last Month
            </button>
            <button className={`dropdown-item ${activeFilter === "lastYear" ? "active" : ""}`} onClick={() => handleFilterClick(subtractDaysFromCurrentDate(365), subtractDaysFromCurrentDate(0), "lastYear")}>
              Last Year
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
