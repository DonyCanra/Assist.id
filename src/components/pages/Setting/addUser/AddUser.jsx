import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, fetchRole, resendEmailCreateUser } from "../../../../store/actions/thunks";
import { Modal, Button } from "react-bootstrap";

export default function AddUser() {
  const { roles } = useSelector((state) => {
    return state.roles;
  });

  const dataRole = roles;

  const [inputDefault] = useState({
    search: "",
    status: "Active",
  });

  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    status: true,
  });

  // State untuk melacak pesan kesalahan pada setiap input
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    // Batasi panjang karakter untuk phone number
    if (name === "phoneNumber" && value.length > 13) {
      return; // Kembalikan jika panjang karakter melebihi batas
    }

    setInput((prevInput) => ({
      ...prevInput,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Set pesan kesalahan menjadi kosong setiap kali ada perubahan pada input
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    dispatch(fetchRole(inputDefault));
  }, [dispatch, inputDefault]);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const handleCancel = () => {
    navigate("/users");
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    event.persist(); // Memastikan event tetap tersedia setelah fungsi asinkron selesai

    if (typeof input.status === "boolean") {
      input.status = input.status ? "Active" : "InActive";
    }
    const inputData = {
      email: input.email,
    };

    // Validasi wajib pada setiap input
    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      await dispatch(createUser(input)); // Sesuaikan parameter sesuai kebutuhan
      await dispatch(resendEmailCreateUser(inputData)); // Sesuaikan parameter sesuai kebutuhan
      handleCloseConfirmationModal();
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Fungsi untuk validasi input
  const validateInput = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\d{9,13}$/;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          errors[key] = `This field is required ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}`;
        } else if (key === "email" && !emailRegex.test(data[key])) {
          errors[key] = "Format email not valid.";
        } else if (key === "phoneNumber" && !phoneNumberRegex.test(data[key])) {
          errors[key] = "Phone number must be between 9 and 13 digits.";
        }
      }
    }
    return errors;
  };

  return (
    <>
      <div className="row text-white">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Add User</h4>
              </div>
            </div>

            <div
              className="card-body"
              style={{
                margin: "20px 20px 20px 20px",
                background: "#2B2E3F",
                borderRadius: "5px",
              }}
            >
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Name <span class="text-red">*</span>
                  </label>
                  <input type="text" class={`form-control ${errorMessages.name ? "border-red" : ""}`} value={input.name} onChange={handleChange} name="name" placeholder="Input name" />
                  <p className="text-danger">{errorMessages.name}</p>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Phone Number <span class="text-red">*</span>
                  </label>
                  <input type="number" class={`form-control ${errorMessages.phoneNumber ? "border-red" : ""}`} value={input.phoneNumber} onChange={handleChange} name="phoneNumber" placeholder="Input phone number" />
                  <p className="text-danger">{errorMessages.phoneNumber}</p>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Email <span class="text-red">*</span>
                  </label>
                  <input type="email" class={`form-control ${errorMessages.email ? "border-red" : ""}`} value={input.email} onChange={handleChange} name="email" placeholder="Input email" />
                  <p className="text-danger">{errorMessages.email}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Role <span class="text-red">*</span>
                  </label>
                  <select
                    class={`form-select ${errorMessages.role}`}
                    value={input.role}
                    onChange={handleChange}
                    name="role"
                    aria-label="select example"
                    style={{
                      background: "#2B2E3F",
                      color: "#fff",
                      border: "1px solid #707070",
                    }}
                  >
                    <option value="">-- Select role --</option>
                    {dataRole &&
                      dataRole?.map((role, index) => (
                        <option key={index} value={role.roleName}>
                          {role.roleName}
                        </option>
                      ))}
                  </select>
                  <p className="text-danger">{errorMessages.role}</p>
                </div>
              </div>
              <div class="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Status <span className="text-red">*</span>
                  </label>
                  <div className="form-group">
                    <label className="custom-switch">
                      <input checked={input.status} onChange={handleChange} name="status" className="custom-switch-input" type="checkbox" />
                      <span className="custom-switch-indicator custom-switch-indicator-lg"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="page-header">
                  <div className="page-leftheader">
                    <button onClick={handleCancel} className="btn btn-danger page-leftheader">
                      Cancel
                    </button>
                  </div>
                  <div className="page-rightheader">
                    <button onClick={handleShowConfirmationModal} className="btn btn-primary ms-1 page-rightheader" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} centered>
        <Modal.Header style={{ background: "#2B2E3F" }} closeButton>
          <Modal.Title>CONFIRMATION</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#2B2E3F" }}>Are you sure to add user?</Modal.Body>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <Button variant="btn btn-danger" onClick={handleCloseConfirmationModal}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleCreateUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
