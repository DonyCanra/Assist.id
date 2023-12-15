import { useState } from "react";
import subtractDaysFromCurrentDate from "../../../../utils/subtractDaysFromCurrentDate";
import { useDispatch } from "react-redux";
import { fetchDashboard } from "../../../../store/actions/thunks";

export default function FilterDate() {
  const [input, setInput] = useState({
    startDate: "",
    endDate: "",
  });

  const dispatch = useDispatch();

  const handleFilter = async (days) => {
    const endDate = subtractDaysFromCurrentDate(days);
    const startDate = subtractDaysFromCurrentDate(days - 1);

    setInput({
      startDate: startDate.toISOString().split("T")[0],
      endDate: endDate.toISOString().split("T")[0],
    });

    await dispatch(fetchDashboard(input));
  };

  return (
    <>
      <div className="btn-list">
        <button className="btn btn-primary btn-pill" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {" "}
          <i className="fa fa-calendar me-2 fs-14"></i> Search By Date
        </button>
        <div className="dropdown-menu border-0">
          <button onClick={() => handleFilter(1)} className="dropdown-item">
            Today
          </button>
          <button onClick={() => handleFilter(2)} className="dropdown-item">
            Yesterday
          </button>
          <button onClick={() => handleFilter(7)} className="dropdown-item active">
            Last 7 days
          </button>
          <button onClick={() => handleFilter(30)} className="dropdown-item">
            Last 30 days
          </button>
          <button onClick={() => handleFilter(60)} className="dropdown-item">
            Last Month
          </button>
          <button onClick={() => handleFilter(180)} className="dropdown-item">
            Last 6 months
          </button>
          <button onClick={() => handleFilter(360)} className="dropdown-item">
            Last year
          </button>
        </div>
      </div>
    </>
  );
}
