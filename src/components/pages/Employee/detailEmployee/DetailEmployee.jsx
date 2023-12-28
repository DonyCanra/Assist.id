import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDetailEmployee } from "../../../../store/actions/thunks";
import { formatCurrencyRupiah } from "../../../../utils/formatCurrency";
import Row from "./DetailEmployeeTableRaw";

export default function DetailEmployee() {
  const { employee } = useSelector((state) => {
    return state.employee;
  });

  const historyEmployee = employee.historyEmployee;

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailEmployee(id));
  }, [dispatch, id]);

  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Detail Employee</h4>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-6 col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Employee Information</h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap">
                    <tbody style={{ color: "#fff" }}>
                      <tr>
                        <th scope="row">Name</th>
                        <td>:</td>
                        <td>{employee.name}</td>
                      </tr>
                      <tr>
                        <th scope="row">NIK</th>
                        <td>:</td>
                        <td>{employee.nik}</td>
                      </tr>
                      <tr>
                        <th scope="row">Phone Number</th>
                        <td>:</td>
                        <td>{employee.phoneNumber}</td>
                      </tr>
                      <tr>
                        <th scope="row">Email</th>
                        <td>:</td>
                        <td>{employee.email}</td>
                      </tr>
                      <tr>
                        <th scope="row">Registration Status</th>
                        <td>:</td>
                        <td>
                          <button
                            style={{
                              color: employee.registeredStatus ? "#FAFF00" : "#F0F",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "normal",
                              borderRadius: "5px",
                              border: employee.registeredStatus ? "1px solid #FAFF00" : "1px solid #F0F",
                              background: employee.registeredStatus ? "rgba(250, 255, 0, 0.10)" : "rgba(250, 255, 0, 0.10)",
                              width: "97px",
                              height: "22px",
                            }}
                          >
                            {employee.registerStatus === true ? "Registered" : "Not Registered"}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Employee Status</th>
                        <td>:</td>
                        <td>
                          <button
                            style={{
                              color: employee.employeeStatus ? "#38CB89" : "rgba(255, 5, 50, 0.80)",
                              fontSize: "12px",
                              fontStyle: "normal",
                              fontWeight: 400,
                              lineHeight: "normal",
                              borderRadius: "5px",
                              border: employee.employeeStatus ? "1px solid #38CB89" : "1px solid #D41136",
                              background: employee.employeeStatus ? "rgba(56, 203, 137, 0.10)" : "rgba(212, 17, 54, 0.10)",
                              width: "78px",
                              height: "22px",
                            }}
                          >
                            {employee.employeeStatus === true ? "Active" : "InActive"}
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Default Max Amount</th>
                        <td>:</td>
                        <td>{formatCurrencyRupiah(employee.maxAmountDefault)}</td>
                      </tr>
                      <tr>
                        <th scope="row">Max Amount</th>
                        <td>:</td>
                        <td>{formatCurrencyRupiah(employee.maxAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">History</h3>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered card-table table-vcenter text-nowrap">
                  <thead>
                    <tr className="border-top">
                      <th>No.</th>
                      <th>Date Change</th>
                      <th>Actor</th>
                      <th>Max Amount Before</th>
                      <th>Max Amount After</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "#fff" }}>
                    {historyEmployee?.map((employee, index) => {
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
