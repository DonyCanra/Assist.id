import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboard } from "../../../../store/actions/thunks";
import FilterDate from "./FilterDate";
import FilterDateWD from "./FilterDateWD";
import FilterDateTSX from "./FilterDateTSX";
import LineChartWithdraw from "../charts/LineChartWithdraw";
import LineChartTransaction from "../charts/LineChartTransaction";

export default function Dashboard() {
  const { dashboard } = useSelector((state) => {
    return state.dashboard;
  });

  const [input] = useState({
    startDate: "",
    endDate: "",
  });

  let isDashboard = false;
  try {
    const dataLocal = JSON.parse(localStorage.privilege);
    isDashboard = dataLocal.dashboardView;
  } catch (error) {
    console.error("Error parsing localStorage.privilege:", error);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboard(input));
  }, [dispatch, input]);

  return (
    <>
      {!isDashboard ? (
        <div className="welcome-message">
          <h3>Selamat datang di ewa dashboard!</h3>
          {/* Tambahkan pesan atau konten selamat datang sesuai kebutuhan Anda */}
        </div>
      ) : (
        <>
          <div className="page-header">
            <div className="page-leftheader">
              <h4 className="page-title mb-0 text-primary">Dashboard</h4>
            </div>
            <div className="page-rightheader">
              <FilterDate />
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

          <div className="row" style={{ marginTop: "50px" }}>
            <svg style={{ marginTop: "10px", marginBottom: "10px" }} xmlns="http://www.w3.org/2000/svg" width="1661" height="8" viewBox="0 0 1661 8" fill="none">
              <path d="M0.957031 0.527344L1660.94 7.40462" stroke="#3B405B" />
            </svg>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="page-header card-header" style={{ margin: "0" }}>
                  <div className="page-leftheader">
                    <h6 className="page-title text-primary" style={{ fontSize: "16px" }}>
                      DATA AMOUNT WITHDRAWAL
                    </h6>
                  </div>
                  <div className="page-rightheader">
                    <FilterDateWD />
                  </div>
                </div>
                <div className="card-body pt-0">
                  <LineChartWithdraw />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="card">
                <div className="page-header card-header" style={{ margin: "0" }}>
                  <div className="page-leftheader">
                    <h4 className="page-title text-primary" style={{ fontSize: "16px" }}>
                      DATA TRANSACTION
                    </h4>
                  </div>
                  <div className="page-rightheader">
                    <FilterDateTSX />
                  </div>
                </div>
                <div className="card-body pt-0">
                  <LineChartTransaction />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
