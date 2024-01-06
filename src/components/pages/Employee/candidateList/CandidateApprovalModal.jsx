import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { approveCandidate } from "../../../../store/actions/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ModalCandidate(props) {
  const { employee } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPDFModal, setShowPDFModal] = useState(false);
  const [invalidCheck, setInvalidCheck] = useState(false);

  const handleApprove = async () => {
    try {
      if (invalidCheck) {
        await dispatch(approveCandidate(employee.id));
        navigate("/employee");
      } else {
        // Handle error when checkbox is not checked
        console.error("Checkbox is not checked");
      }
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  const handleShowPDFModal = () => {
    setShowPDFModal(true);
  };

  const handleClosePDFModal = () => {
    setShowPDFModal(false);
  };

  const handleAgree = () => {
    handleClosePDFModal();
  };

  return (
    <Modal className="text-white" {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header style={{ background: "#2B2E3F" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Are you sure to approve and move the employee list?</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "#2B2E3F", border: "1px solid #000" }}>
        <div className="card-body text-left">
          <div className="">
            <tr>
              <th scope="row">Name</th>
              <td className="text-center w-8"> : </td>
              <td> {employee.name}</td>
            </tr>
            <tr className="border-bottom">
              <th scope="row">NIK</th>
              <td className="text-center w-8"> : </td>
              <td> {employee.nik}</td>
            </tr>
            <tr className="border-bottom">
              <th scope="row">Phone Number</th>
              <td className="text-center w-8"> : </td>
              <td> {employee.phoneNumber}</td>
            </tr>
            <tr className="border-bottom">
              <th scope="row">Email</th>
              <td className="text-center w-8"> : </td>
              <td> {employee.email}</td>
            </tr>
          </div>
        </div>
        {/* <p
          style={{
            color: "#FF1717",
            fontSize: "12px",
            fontStyle: "normal",
            fontWeight: "400",
            lineWeight: "normal",
          }}
        >
          Note : if you approve then automatically active as an employee
        </p> */}
        <div class="col-12">
          <div class="form-check">
            <input onClick={handleShowPDFModal} class="form-check-input" type="checkbox" value="" id="invalidCheck" checked={invalidCheck} onChange={() => setInvalidCheck(!invalidCheck)} />
            <label class="form-check-label" for="invalidCheck">
              Agree to terms and conditions
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ background: "#2B2E3F" }}>
        <button onClick={props.onHide} className="btn btn-danger">
          Cancel
        </button>
        <button onClick={handleApprove} className="btn btn-primary ms-1" type="submit">
          Confirm
        </button>
      </Modal.Footer>

      {/* Modal for displaying PDF */}
      <Modal show={showPDFModal} onHide={handleClosePDFModal} size="lg" centered>
        <Modal.Header style={{ background: "#2B2E3F", display: "flex", justifyContent: "center" }} closeButton>
          <Modal.Title className="text-white">TERM & CONDITION</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ overflowY: "auto", maxHeight: "100vh", background: "#2B2E3F", height: "600px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ flex: 1, width: "100%", marginBottom: "20px" }}>
            <embed
              style={{
                width: "100%",
                height: "100%",
              }}
              src="http://localhost:3030/file/tnc.pdf"
              type="application/pdf"
            />

            {/* <iframe src={tncView} title="tnc" frameborder="0"></iframe> */}
          </div>
        </Modal.Body>

        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <button onClick={handleAgree} className="btn btn-primary ms-1" type="submit">
            Agree
          </button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
}
