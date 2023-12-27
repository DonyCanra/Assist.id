import Modal from "react-bootstrap/Modal";
import Row from "./DataBulkTableRaw";
// import { useState } from "react";
import { bulkCreateEmployee } from "../../../../store/actions/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ItemsPerPage = 10;

export default function DataBulkTableModal(props) {
  const { dataBulk, handleDelete } = props;

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataTable = dataBulk;
  const originalData = dataTable.data;

  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentData = originalData.slice(indexOfFirstItem, indexOfLastItem);

  const modifiedData = currentData.map((item) => ({
    name: item.Name,
    nik: item.NIK.toString(),
    phoneNumber: item["Phone Number"].toString(),
    email: item.Email,
    maxAmount: item["Maximum Amount"],
    employeeStatus: "Active",
  }));

  const maxPage = Math.ceil(originalData.length / ItemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBulkCreateEmployee = async (event) => {
    event.preventDefault();

    try {
      await dispatch(bulkCreateEmployee({ data: modifiedData }));
      navigate("/employee");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      {/* ... (bagian lain dari modal tetap sama) */}
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
                <tbody className="text-center" style={{ color: "#fff" }}>
                  {modifiedData.map((employee, index) => (
                    <Row key={index} employee={employee} index={index + indexOfFirstItem} handleDeleteFunction={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="row row-sm">
              <div className="col-lg">
                <div className="page-header">
                  <div className="page-leftheader">
                    <div className="dataTables_info" id="example2_info" role="status" aria-live="polite">
                      Showing 1 to {currentPage} of {maxPage} entries
                    </div>
                  </div>
                  <div className="page-rightheader">
                    <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                      <ul className="pagination">
                        {[...Array(maxPage)].map((_, index) => (
                          <li key={index} className={`paginate_button page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => handlePageChange(index + 1)}>
                            <button className="page-link">{index + 1}</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <form>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <button style={{ cursor: "pointer" }} onClick={props.onHide} className="btn btn-danger">
            Cancel
          </button>
          <button style={{ cursor: "pointer" }} onClick={handleBulkCreateEmployee} className="btn btn-primary ms-3" type="submit">
            Upload
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
