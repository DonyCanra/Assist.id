import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFee } from "../../../store/actions/thunks";
import SearchComponent from "./SearchFee";
import Row from "./FeeTableRaw";
import * as XLSX from "xlsx"; // Import pustaka xlsx

export default function Fee() {
  const { fees } = useSelector((state) => {
    // console.log(state.fees, "<<state data");
    return state.fees;
  });
  console.log(fees, "<<fees");

  const dataTable = fees.data;
  console.log(dataTable, "<<< dataaa");

  const [inputDefault, setInputDefault] = useState({
    startDate: "",
    endDate: "",
    transactionNo: "",
    name: "",
    phoneNumber: "",
    email: "",
    status: "",
    page: 1,
    limit: 10,
  });

  const pageCount = fees.totalPage; // Jumlah halaman yang ingin ditampilkan

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
      "Transaction Date": dataTable.transactionDate,
      "Transaction Number": dataTable.transactionNo,
      Name: dataTable.employeeName,
      "Phone Number": dataTable.employeePhoneNumber,
      Email: dataTable.employeeEmail,
      "Disburse Amount": dataTable.disburseAmount,
      Fee: dataTable.clientFee,
      Status: dataTable.status,
    }));

    // Buat objek worksheet dari data
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Buat objek workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Simpan file Excel
    XLSX.writeFile(wb, "fees.xlsx");
  };

  useEffect(() => {
    dispatch(fetchFee(inputDefault));
  }, [dispatch, inputDefault]);
  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Fee</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#3B4051" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">{/* <h4 className="page-title mb-0 text-primary">Employee List</h4> */}</div>
              <div className="page-rightheader">
                <div className="btn-list">
                  <Link className="btn btn-primary" onClick={handleDownloadExcel}>
                    {/* <button className="btn btn-primary"> */}
                    <i className="fe fe-download me-2 fs-14"></i> Download
                    {/* </button> */}
                  </Link>
                </div>
              </div>
            </div>
            <SearchComponent />
            <div
              className="card-body"
              style={{
                margin: "20px 20px 20px 20px",
                background: "#2B2E3F",
                borderRadius: "5px",
              }}
            >
              <div className="table-responsive">
                <table className="table table-bordered card-table table-vcenter text-nowrap">
                  <thead text-center>
                    <tr className="border-top border-bottom">
                      <th className="wd-15p border-bottom-0">No.</th>
                      <th className="wd-15p border-bottom-0">Transaction Date</th>
                      <th className="wd-20p border-bottom-0">Transaction Number</th>
                      <th className="wd-15p border-bottom-0">Name</th>
                      <th className="wd-10p border-bottom-0">Phone number</th>
                      <th className="wd-25p border-bottom-0">Email</th>
                      <th className="wd-25p border-bottom-0">Disburse Amount</th>
                      <th className="wd-25p border-bottom-0">Fee</th>
                      <th className="wd-25p border-bottom-0">Status</th>
                      <th className="wd-25p border-bottom-0">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-white text-center">
                    {dataTable?.map((fee, index) => {
                      return <Row key={index} fee={fee} index={index} />;
                    })}
                  </tbody>
                </table>
              </div>
              <div className="row row-sm">
                <div className="col-lg">
                  <div className="page-header">
                    <div className="page-leftheader">
                      <div className="dataTables_info" id="example2_info" role="status" aria-live="polite">
                        Showing 1 to {inputDefault.page} of {fees.totalPage} entries
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
                            className={inputDefault.page === fees.totalPage ? "paginate_button page-item disabled" : "paginate_button page-item"}
                            onClick={() => inputDefault.page < fees.totalPage && handlePageChange(inputDefault.page + 1)}
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
