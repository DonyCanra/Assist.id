import { useState } from "react";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";
import { useDispatch } from "react-redux";
import { fetchDataWithdraw } from "../../../../store/actions/thunks";

export default function FilterDate() {
  const [inputWithdraw, setInputWithdraw] = useState({
    startDate: "",
    endDate: "",
  });

  const [activeFilter, setActiveFilter] = useState(""); // Tambahkan state untuk melacak filter yang aktif
  const dispatch = useDispatch();

  const handleFilter = async (start, end, filterName) => {
    const startDate = subtractDaysFromCurrentDate(start);
    const endDate = subtractDaysFromCurrentDate(end);

    setInputWithdraw({
      startDate: startDate,
      endDate: endDate,
    });

    await dispatch(fetchDataWithdraw(inputWithdraw));
    setActiveFilter(filterName); // Tetapkan filter yang aktif setelah mengubah input
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
        </div>
      </div>
    </>
  );
}
