import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";
import { fetchDashboard } from "../../../../store/actions/thunks";

export default function FilterDate() {
  const [value, setValue] = useState({
    startDate: subtractDaysFromCurrentDate(0),
    endDate: subtractDaysFromCurrentDate(0),
  });

  const [activeOption, setActiveOption] = useState("Today");

  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(inputDate).toLocaleDateString("en-US", options);
    return formattedDate;
  };

  const handleDateChange = (startDate, endDate, option) => {
    setValue({ startDate, endDate });
    setActiveOption(option);
  };

  useEffect(() => {
    // Fetch data when value.startDate or value.endDate changes
    fetchDashboard(value.startDate, value.endDate);
  }, [value.startDate, value.endDate]);

  return (
    <>
      <div className="page-rightheader">
        <div className="btn-list">
          <Link className="btn btn-primary btn-pill" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-calendar me-2 fs-14"></i> {formatDate(value.startDate)} - {formatDate(value.endDate)}
          </Link>
          <div className="dropdown-menu border-0">
            <button className={`dropdown-item ${activeOption === "All the time" && "active"}`} onClick={() => handleDateChange(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(0), "All the time")}>
              All the time
            </button>
            <button className={`dropdown-item ${activeOption === "Today" && "active"}`} onClick={() => handleDateChange(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(0), "Today")}>
              Today
            </button>
            <button className={`dropdown-item ${activeOption === "Yesterday" && "active"}`} onClick={() => handleDateChange(subtractDaysFromCurrentDate(1), subtractDaysFromCurrentDate(1), "Yesterday")}>
              Yesterday
            </button>
            <button className={`dropdown-item ${activeOption === "Last 7 days" && "active"}`} onClick={() => handleDateChange(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(6), "Last 7 days")}>
              Last 7 days
            </button>
            <button className={`dropdown-item ${activeOption === "This Month" && "active"}`} onClick={() => handleDateChange(subtractDaysFromCurrentDate(0), subtractDaysFromCurrentDate(29), "This Month")}>
              This Month
            </button>
            <button className={`dropdown-item ${activeOption === "Last Month" && "active"}`} onClick={() => handleDateChange(subtractDaysFromCurrentDate(29), subtractDaysFromCurrentDate(58), "Last Month")}>
              Last Month
            </button>
            <button className={`dropdown-item ${activeOption === "Last Year" && "active"}`} onClick={() => handleDateChange(subtractDaysFromCurrentDate(365), subtractDaysFromCurrentDate(0), "Last Year")}>
              Last Year
            </button>
            {/* Tambahkan event handler untuk opsi-opsi lainnya */}
          </div>
        </div>
      </div>
    </>
  );
}
