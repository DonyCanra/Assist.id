import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployee } from "../../../store/actions/thunks";
import Row from "./EmployeeTableRaw";
import SearchComponent from "./SearchEmployee";

export default function Employee() {
  const { employees } = useSelector((state) => {
    return state.employees;
  });

  const dataTable = employees;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Employee</h4>
        </div>
      </div>

      <div className="nav-row">
        <Link to="/employee" style={{ position: "relative", display: "inline-block", bottom: "-8px" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="221" height="41" viewBox="0 0 221 41" fill="none">
            <path
              d="M217.919 33.0225C213.602 32.4436 209.643 30.3174 206.775 27.0387C203.907 23.7601 202.326 19.5516 202.325 15.1949L202.307 15.3853C201.681 11.111 199.539 7.20469 196.272 4.37992C193.005 1.55514 188.831 0.000501148 184.513 0H36.4866C32.1686 0.000501148 27.9949 1.55514 24.728 4.37992C21.4611 7.20469 19.3191 11.111 18.6933 15.3853L18.6751 15.1949C18.6742 19.5516 17.0931 23.7601 14.2253 27.0387C11.3574 30.3174 7.39777 32.4436 3.08147 33.0225H0V41H221V33.0225H217.919Z"
              fill="#3B4051"
            />
          </svg>
          <h1
            style={{
              position: "absolute",
              color: "#FFF",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              left: "50%", // Mengatur posisi horizontal di tengah
              top: "50%", // Mengatur posisi vertical di tengah
              transform: "translate(-50%, -50%)", // Membuat h1 berada tepat di tengah
            }}
          >
            Employee List
          </h1>
        </Link>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#3B4051" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">{/* <h4 className="page-title mb-0 text-primary">Employee List</h4> */}</div>
              <div className="page-rightheader">
                <div className="btn-list">
                  <Link className="btn btn-secondary" to="/add-employee">
                    {/* <button className="btn btn-secondary"> */}
                    <i className="fe fe-plus me-2"></i> Add New Data
                    {/* </button> */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="">
              <SearchComponent />
            </div>

            <div
              className="card-body border-bottom"
              style={{
                margin: "20px 20px 20px 20px",
                background: "#2B2E3F",
                borderRadius: "5px",
              }}
            >
              <div className="table-responsive">
                <table className="table table-bordered card-table table-vcenter text-nowrap">
                  <thead className="text-center">
                    <tr className="border-top border-bottom">
                      <th className="wd-15p border-bottom-0">ID.</th>
                      <th className="wd-15p border-bottom-0">Name</th>
                      <th className="wd-20p border-bottom-0">Address</th>
                      <th className="wd-15p border-bottom-0">Village</th>
                      <th className="wd-10p border-bottom-0">District</th>
                      <th className="wd-25p border-bottom-0">Regency</th>
                      <th className="wd-25p border-bottom-0">Province</th>
                      <th className="wd-25p border-bottom-0">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white text-center">
                    {dataTable?.map((employee, index) => {
                      return <Row key={index} employee={employee} index={index} />;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
