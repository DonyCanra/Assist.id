import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployee } from "../../../../store/actions/thunks";
import Row from "./EmployeeTableRaw";
import SearchComponent from "./SearchEmployee";
import * as XLSX from "xlsx"; // Import pustaka xlsx
import { formatCurrencyRupiah } from "../../../../utils/formatCurrency";

export default function Employee() {
  const { employees } = useSelector((state) => {
    return state.employees;
  });

  const dataTable = employees.data;
  const [inputDefault, setInputDefault] = useState({
    isCandidate: "No",
    employeeStatus: "",
    registerStatus: "",
    name: "",
    nik: "",
    email: "",
    phoneNumber: "",
    page: 1,
    limit: 10,
  });

  const dataLocal = JSON.parse(localStorage.privilege);

  const pageCount = employees.totalPage; // Jumlah halaman yang ingin ditampilkan

  const dispatch = useDispatch();

  const handlePageChange = (page) => {
    setInputDefault((prevInput) => ({
      ...prevInput,
      page,
    }));
  };

  const handleDownloadExcel = () => {
    // Data untuk diekspor
    const exportData = dataTable.map((dataTable, index) => ({
      "No.": index + 1,
      Name: dataTable.name,
      NIK: dataTable.nik,
      "Phone Number": dataTable.phoneNumber,
      Email: dataTable.email,
      "Max Amount": formatCurrencyRupiah(dataTable.maxAmount),
      "Employee Status": dataTable.employeeStatus ? "Active" : "InActive",
      "Registered Status": dataTable.registerStatus ? "Registered" : "Not Registered",
    }));

    // Buat objek worksheet dari data
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Buat objek workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Simpan file Excel
    XLSX.writeFile(wb, "employeeList.xlsx");
  };

  useEffect(() => {
    dispatch(fetchEmployee(inputDefault));
  }, [dispatch, inputDefault]);

  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Employee</h4>
        </div>
      </div>

      <div className="nav-row">
        <Link to="/employee" style={{ position: "relative", display: "inline-block" }}>
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

        <Link to="/candidate" style={{ position: "relative", display: "inline-block" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="221" height="41" viewBox="0 0 221 41" fill="none">
            <path
              d="M217.919 33.0225C213.602 32.4436 209.643 30.3174 206.775 27.0387C203.907 23.7601 202.326 19.5516 202.325 15.1949L202.307 15.3853C201.681 11.111 199.539 7.20469 196.272 4.37992C193.005 1.55514 188.831 0.000501148 184.513 0H36.4866C32.1686 0.000501148 27.9949 1.55514 24.728 4.37992C21.4611 7.20469 19.3191 11.111 18.6933 15.3853L18.6751 15.1949C18.6742 19.5516 17.0931 23.7601 14.2253 27.0387C11.3574 30.3174 7.39777 32.4436 3.08147 33.0225H0V41H221V33.0225H217.919Z"
              fill="#2A2E3F"
            />
          </svg>
          <h1
            style={{
              position: "absolute",
              color: "#3B4051",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "normal",
              left: "50%", // Mengatur posisi horizontal di tengah
              top: "50%", // Mengatur posisi vertical di tengah
              transform: "translate(-50%, -50%)", // Membuat h1 berada tepat di tengah
            }}
          >
            Candidate
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
                  <Link className="btn btn-secondary" to="/add-employee" style={{ cursor: "pointer", display: dataLocal.employeeAdd ? "" : "none" }}>
                    {/* <button className="btn btn-secondary"> */}
                    <i className="fe fe-plus me-2"></i> Add New Data
                    {/* </button> */}
                  </Link>
                  <Link className="btn btn-primary" onClick={handleDownloadExcel} style={{ cursor: "pointer", display: dataLocal.dashboardView ? "" : "none" }}>
                    {/* <button className="btn btn-primary"> */}
                    <i className="fe fe-download me-2 fs-14"></i> Download
                    {/* </button> */}
                  </Link>
                </div>
              </div>
            </div>

            <SearchComponent />

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
                      <th className="wd-15p border-bottom-0">No.</th>
                      <th className="wd-15p border-bottom-0">Name</th>
                      <th className="wd-20p border-bottom-0">NIK</th>
                      <th className="wd-15p border-bottom-0">Phone Number</th>
                      <th className="wd-10p border-bottom-0">Email</th>
                      <th className="wd-25p border-bottom-0">Max Amount</th>
                      <th className="wd-25p border-bottom-0">Employee Status</th>
                      <th className="wd-25p border-bottom-0">Registered Status</th>
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
              <div className="row row-sm text-white">
                <div className="col-lg">
                  <div className="page-header">
                    <div className="page-leftheader">
                      <div className="dataTables_info" id="example2_info" role="status" aria-live="polite">
                        Showing 1 to {inputDefault.page} of {employees.totalPage} entries
                      </div>
                    </div>
                    <div className="page-rightheader">
                      <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                        <ul className="pagination">
                          <li className={inputDefault.page === 1 ? "paginate_button page-item disabled" : "paginate_button page-item"} onClick={() => inputDefault.page > 1 && handlePageChange(inputDefault.page - 1)}>
                            <Link href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" className="page-link">
                              Previous
                            </Link>
                          </li>
                          {[...Array(pageCount)]?.map((_, index) => (
                            <li key={index} className={`paginate_button page-item ${inputDefault.page === index + 1 ? "active" : ""}`} onClick={() => handlePageChange(index + 1)}>
                              <Link href="#" aria-controls="example2" data-dt-idx={index + 1} tabindex="0" className="page-link">
                                {index + 1}
                              </Link>
                            </li>
                          ))}
                          <li
                            className={inputDefault.page === employees.totalPage ? "paginate_button page-item disabled" : "paginate_button page-item"}
                            onClick={() => inputDefault.page < employees.totalPage && handlePageChange(inputDefault.page + 1)}
                          >
                            <Link href="#" aria-controls="example2" data-dt-idx={pageCount + 1} tabindex="0" className="page-link">
                              Next
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
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
