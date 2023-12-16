import Modal from "react-bootstrap/Modal";
import { approveCandidate } from "../../../../store/actions/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ModalCandidate(props) {
  const { employee } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleApprove = async () => {
    // Panggil fetchDetailEmployee dan tunggu sampai selesai
    await dispatch(approveCandidate(employee.id));

    // Setelah fetch selesai, tampilkan modal
    navigate("/employee");
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header style={{ background: "#2B2E3F" }} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Are you sure approve to move employee list ?</Modal.Title>
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
        <p
          style={{
            color: "#FF1717",
            fontSize: "12px",
            fontStyle: "normal",
            fontSeight: "400",
            lineWeight: "normal",
          }}
        >
          Note ; if you approve then automatically active as an employee
        </p>
      </Modal.Body>
      <Modal.Footer style={{ background: "#2B2E3F" }}>
        <button onClick={props.onHide} className="btn btn-danger">
          Cancel
        </button>
        <button onClick={handleApprove} className="btn btn-primary ms-1" type="submit">
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}
