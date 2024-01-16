import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboard } from "../../../store/actions/thunks";
import FilterDate from "../../../components/datePicker/DatePickerRange";
import subtractDaysFromCurrentDate from "../../../utils/subtractDaysFromCurrentDate";

export default function TotalDashboard() {
  const { dashboard } = useSelector((state) => {
    return state.dashboard;
  });

  const [input, setInput] = useState({
    startDate: subtractDaysFromCurrentDate(0),
    endDate: subtractDaysFromCurrentDate(0),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboard(input));
  }, [dispatch, input]);

  const handleChange = (startDate, endDate) => {
    setInput({
      ...input,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Dashboard</h4>
        </div>
        <div className="page-rightheader">
          <FilterDate input={input} onChange={handleChange} />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden dash1-card border-0 dash1">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12">
                  <div className="text-justify">
                    <span className="fs-14 font-normal">Total Employee</span>
                    <h2 className="mb-2 mt-1 number-font carn2 font-weight-bold">{dashboard.totalEmployee}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden dash1-card border-0 dash4">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12">
                  <div className="text-justify">
                    <span className="fs-14 font-normal">Total Amount Withdrawal</span>
                    <h2 className="mb-2 mt-1 number-font carn2 font-weight-bold">{dashboard.totalWithdraw}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden dash1-card border-0 dash2">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12">
                  <div className="text-justify">
                    <span className="fs-14 font-normal">Total Transaction</span>
                    <h2 className="mb-2 mt-1 number-font carn2 font-weight-bold">{dashboard.totalTransaction}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden dash1-card border-0 dash3">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12">
                  <div className="text-justify">
                    <span className="fs-14 font-normal">Total Registered</span>
                    <h2 className="mb-2 mt-1 number-font carn2 font-weight-bold">{dashboard.totalRegistrasi}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
