import Modal from "react-bootstrap/Modal";
import Row from "./DataBulkTableRaw";
// import { useState } from "react";
import { bulkCreateEmployee } from "../../../../store/actions/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ModalCandidate(props) {
  const { dataBulk } = props;
  // console.log(dataBulk.length, "<<<bulktable");
  // console.log(dataBulk, "<<<bulktable");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataTable = dataBulk;
  const originalData = dataTable.data;

  // console.log(originalData.length, "<< dataTable");

  const modifiedData = originalData.map((item) => ({
    name: item.Name,
    nik: item.NIK.toString(),
    phoneNumber: item["Phone Number"].toString(),
    email: item.Email,
    maxAmount: item["Maximum Amount"],
    employeeStatus: true,
  }));

  console.log(modifiedData, "modifiedData");

  // const pageCount = modifiedData.length / 10; // Jumlah halaman yang ingin ditampilkan

  const dataInput = {
    data: modifiedData,
  };

  const handleBulkCreateEmployee = async (event) => {
    event.preventDefault();
    event.persist();

    try {
      await dispatch(bulkCreateEmployee(dataInput));
      navigate("/employee");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header style={{ background: "#2B2E3F", borderRadius: "20px 20px 0px 0px" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">CONFIRMATION</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "#2B2E3F", border: "1px solid #000" }}>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Total Employee : {originalData.length}</h3>
            <div className="table-responsive">
              <table className="table table-bordered card-table table-vcenter text-nowrap">
                <thead>
                  <tr className="border-top">
                    <th>No.</th>
                    <th>Name</th>
                    <th>NIK</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Max Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={{ color: "#fff" }}>
                  {originalData?.map((employee, index) => {
                    return <Row key={index} employee={employee} index={index} />;
                  })}
                </tbody>
              </table>
            </div>
            <div className="row row-sm">
              <div className="col-lg">
                <div className="page-header">
                  <div className="page-leftheader">
                    <div className="dataTables_info" id="example2_info" role="status" aria-live="polite">
                      Showing 1 to 2 of {originalData.length} entries
                    </div>
                  </div>
                  {/* <div className="page-rightheader">
                    <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                      <ul className="pagination">
                        <li className={originalData.length === 1 ? "paginate_button page-item disabled" : "paginate_button page-item"} onClick={() => inputDefault.page > 1 && handlePageChange(inputDefault.page - 1)}>
                          <Link href="#" aria-controls="example2" data-dt-idx="0" tabindex="0" className="page-link">
                            Previous
                          </Link>
                        </li>
                        {[...Array(pageCount)]?.map((_, index) => (
                          <li key={index} className={`paginate_button page-item ${originalData.length === index + 1 ? "active" : ""}`} onClick={() => handlePageChange(index + 1)}>
                            <Link href="#" aria-controls="example2" data-dt-idx={index + 1} tabindex="0" className="page-link">
                              {index + 1}
                            </Link>
                          </li>
                        ))}
                        <li className={modifiedData.length === 3 ? "paginate_button page-item disabled" : "paginate_button page-item"} onClick={() => inputDefault.page < fees.totalPage && handlePageChange(inputDefault.page + 1)}>
                          <Link href="#" aria-controls="example2" data-dt-idx={pageCount + 1} tabindex="0" className="page-link">
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <form>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <button onClick={props.onHide} className="btn btn-danger">
            Cancel
          </button>
          <button onClick={handleBulkCreateEmployee} className="btn btn-primary ms-3" type="submit">
            Upload
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
