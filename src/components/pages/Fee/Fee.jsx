import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFee } from "../../../store/actions/thunks";
import SearchComponent from "./SearchFee";
import Row from "./FeeTableRaw";

export default function Fee() {
  const { fees } = useSelector((state) => {
    console.log(state.fees, "<<state data");
    return state.fees;
  });
  const dataTable = fees.data;
  console.log(dataTable, "<<< dataaa");

  const [inputDefault] = useState({
    startDate: "",
    endDate: "",
    transactionNo: "",
    name: "",
    phoneNumber: "",
    email: "",
    status: "",
  });

  const dispatch = useDispatch();

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
                  <Link className="btn btn-primary" to="/add-employee">
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
                <table className="table table-bordered text-nowrap" id="example2">
                  <thead className="text-center">
                    <tr>
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
                    <tr hidden>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {dataTable?.map((fee, index) => {
                      return <Row key={index} fee={fee} index={index} />;
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
