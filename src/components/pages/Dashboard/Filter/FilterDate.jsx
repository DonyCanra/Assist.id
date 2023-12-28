import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";
import { useDispatch } from "react-redux";

export default function FilterDate({ handleFetch }) {
  const [input, setInput] = useState({
    startDate: "",
    endDate: "",
  });

  const [activeFilter, setActiveFilter] = useState("");
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);

  const dispatch = useDispatch();

  const handleFilter = async (start, end, filterName) => {
    const startDate = subtractDaysFromCurrentDate(start);
    const endDate = subtractDaysFromCurrentDate(end);

    setInput({
      startDate: startDate,
      endDate: endDate,
    });

    await dispatch(handleFetch(input));
    setActiveFilter(filterName);
  };

  const handleCustomFilter = async () => {
    if (customStartDate && customEndDate) {
      const startDate = customStartDate.toLocaleDateString("en-CA"); // Format: yy/mm/dd
      const endDate = customEndDate.toLocaleDateString("en-CA");

      setInput({
        startDate: startDate,
        endDate: endDate,
      });

      await dispatch(handleFetch(input));
      setActiveFilter("custom");
    }
  };

  return (
    <>
      <div className="btn-list">
        <button className="btn btn-primary btn-pill" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {" "}
          <i className="fa fa-calendar me-2 fs-14"></i> Search By Date
        </button>
        <div className="dropdown-menu border-0">
          <button onClick={() => handleFilter(0, 0, "today")} className={`dropdown-item ${activeFilter === "today" ? "active" : ""}`}>
            Today
          </button>
          <button onClick={() => handleFilter(7, 0, "last7days")} className={`dropdown-item ${activeFilter === "last7days" ? "active" : ""}`}>
            Yesterday
          </button>
          <button onClick={() => handleFilter(14, 0, "last14days")} className={`dropdown-item ${activeFilter === "last14days" ? "active" : ""}`}>
            Last 7 days
          </button>
          <button onClick={() => handleFilter(30, 0, "last30days")} className={`dropdown-item ${activeFilter === "last30days" ? "active" : ""}`}>
            Last 30 days
          </button>
          <button onClick={() => handleFilter(60, 0, "lastMonth")} className={`dropdown-item ${activeFilter === "lastMonth" ? "active" : ""}`}>
            Last Month
          </button>
          <button onClick={() => handleFilter(180, 0, "last6months")} className={`dropdown-item ${activeFilter === "last6months" ? "active" : ""}`}>
            Last 6 months
          </button>
          <button className={`dropdown-item ${activeFilter === "custom" ? "active" : ""}`} onClick={() => setActiveFilter("custom")}>
            Custom
          </button>
        </div>
      </div>

      {activeFilter === "custom" && (
        <div className="custom-datepicker">
          <DatePicker selected={customStartDate} onChange={(date) => setCustomStartDate(date)} selectsStart startDate={customStartDate} endDate={customEndDate} placeholderText="Start Date" className="form-control" />
          <DatePicker selected={customEndDate} onChange={(date) => setCustomEndDate(date)} selectsEnd startDate={customStartDate} endDate={customEndDate} placeholderText="End Date" className="form-control" />
          <button onClick={handleCustomFilter} className="btn btn-primary">
            Apply
          </button>
        </div>
      )}
    </>
  );
}
