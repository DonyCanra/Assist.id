import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchDetailFee } from "../../../store/actions/thunks";
import { formatCurrencyRupiah } from "../../../utils/formatCurrency";

export default function DetailFee() {
  const { fee } = useSelector((state) => {
    return state.fee;
  });

  // Gunakan useLocation hook untuk mendapatkan informasi tentang lokasi
  const location = useLocation();

  // Gunakan URLSearchParams untuk mendapatkan nilai query parameter
  const queryParams = new URLSearchParams(location.search);
  const transactionNo = queryParams.get("transactionNo");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailFee(transactionNo));
  }, [dispatch, transactionNo]);

  return (
    <>
      <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Fee Detail</h4>
        </div>
      </div>

      <div className="row text-white">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="card">
            <div className="card-body col-xl-6 col-lg-6 col-md-6">
              <div className="row">
                <div className="card-body text-left">
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>Transaction Date</th>
                        <th>Disburse Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{fee.transactionDate}</td>
                        <td>{fee.disburseAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px", height: "30px" }}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>Transaction Number</th>
                        <th>Withdraw Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{fee.transactionNo}</td>
                        <td>{formatCurrencyRupiah(fee.bayarindFee + fee.clientFee)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px", height: "30px" }}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{fee.employeeName}</td>
                        <td>{fee.status === "SUCCESS" ? "Success" : "Failed"}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px", height: "30px" }}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>Phone Number</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{fee.employeePhoneNumber}</td>
                        <td>{fee.employeeEmail}</td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px", height: "30px" }}></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>Bayarind Fee</th>
                        <th>Client Fee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{formatCurrencyRupiah(fee.bayarindFee)}</td>
                        <td>{formatCurrencyRupiah(fee.clientFee)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
