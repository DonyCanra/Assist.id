import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboard } from "../../../../store/actions/thunks";
import FilterDate from "./FilterDate";
// import Loader from "../../../common/Loader";

export default function Dashboard() {
  const { dashboard } = useSelector((state) => {
    return state.dashboard;
  });

  const [input] = useState({
    startDate: "",
    endDate: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboard(input));
  }, [dispatch, input]);


  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Dashboard</h4>
        </div>
        <div className="page-rightheader">
          <FilterDate />
        </div>
      </div>

      {/** Centered Loader */}
      {/* {isLoading && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh", // Adjust the height as needed
          }}
        >
          <Loader />
        </div>
      )} */}

      <div className="row">
        <div className="col-xl-3 col-lg-6 col-md-6 col-xm-12">
          <div className="card overflow-hidden dash1-card border-0 dash1">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 col-sm-12 col-12">
                  <div className="text-justify">
                    <span className="fs-14 font-normal">Total Employee</span>
                    <h2 className="mb-2 mt-1 number-font carn2 font-weight-bold">{dashboard.totalEmployee}</h2>
                    {/* <!-- <span className=""><i className="fe fe-arrow-up-circle"></i> 53% <span className="ms-1 fs-11">From Last Month</span> --> */}
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
                    {/* <!-- <span className=""><i className="fe fe-arrow-up-circle"></i> 53% <span className="ms-1 fs-11">From Last Month</span> --> */}
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
                    {/* <!-- <span className=""><i className="fe fe-arrow-up-circle"></i> 53% <span className="ms-1 fs-11">From Last Month</span> --> */}
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
                    {/* <!-- <span className=""><i className="fe fe-arrow-up-circle"></i> 53% <span className="ms-1 fs-11">From Last Month</span> --> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card">
            <div className="card-header border-bottom-0">
              <h3 className="card-title">Data Client Fee</h3>
            </div>
            <div className="card-body pt-0">
              <div className="chart-wrapper">
                <div id="statistics"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
