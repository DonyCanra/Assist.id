import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createEmployee } from "../../../../store/actions/thunks";
import { Modal, Button } from "react-bootstrap";
import { formatCurrencyRupiah, parseCurrencyRupiah } from "../../../../utils/formatCurrency";
import "./addEmployee.css";

export default function AddEmployee() {
  const [input, setInput] = useState({
    name: "",
    nik: "",
    phoneNumber: "",
    email: "",
    maxAmount: 0,
    employeeStatus: true,
  });

  // State untuk melacak pesan kesalahan
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    nik: "",
    phoneNumber: "",
    email: "",
    maxAmount: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    // Batasi panjang karakter untuk phone number
    if (name === "phoneNumber" && value.length > 13) {
      return; // Kembalikan jika panjang karakter melebihi batas
    }

    // Batasi panjang karakter untuk phone number
    if (name === "nik" && value.length > 16) {
      return; // Kembalikan jika panjang karakter melebihi batas
    }

    if (name === "maxAmount") {
      const numericValue = value.trim() !== "" ? parseCurrencyRupiah(value) : 0;
      setInput((prevInput) => ({
        ...prevInput,
        [name]: numericValue,
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Set pesan kesalahan menjadi kosong setiap kali ada perubahan pada input
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const handleCancel = () => {
    navigate("/employee");
  };

  const handleCreateEmployee = async (event) => {
    event.preventDefault();
    event.persist();

    input.maxAmount = parseFloat(input.maxAmount);

    input.employeeStatus = input.employeeStatus ? "Active" : "InActive";
    const dataInput = {
      data: [input],
    };

    // Validasi sebelum membuat karyawan
    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      await dispatch(createEmployee(dataInput));
      handleCloseConfirmationModal();
      navigate("/employee");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  const validateInput = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneNumberRegex = /^\d{9,13}$/;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          errors[key] = `This field is required ${key.charAt(0).toUpperCase() + key.slice(1).replace(/([a-z])([A-Z])/g, "$1 $2")}`;
        } else if (key === "nik" && data[key].length !== 16) {
          errors[key] = "NIK must be 16 characters.";
        } else if (key === "email" && !emailRegex.test(data[key])) {
          errors[key] = "Format email not valid.";
        } else if (key === "phoneNumber" && !phoneNumberRegex.test(data[key])) {
          errors[key] = "Phone number must be between 9 and 13 digits.";
        } else if (key === "maxAmount" && (isNaN(data[key]) || data[key] <= 0)) {
          errors[key] = "Max Amount must be a positive number.";
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
                <h4 className="page-title mb-0 text-primary">Add New Employee</h4>
              </div>
              <div className="page-rightheader">
                <div className="btn-list">
                  <Link to="/add-employee-excel">
                    <button className="btn btn-secondary">
                      <i className="fe fe-plus me-2"></i> Add New Data Bulk
                    </button>
                  </Link>
                </div>
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
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Name <span className="text-red">*</span>
                  </label>
                  <input value={input.name} onChange={handleChange} name="name" type="text" className="form-control" placeholder="Input name employee" />
                  <p className="text-danger">{errorMessages.name}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    NIK <span className="text-red">*</span>
                  </label>
                  <input value={input.nik} onChange={handleChange} name="nik" type="text" className="form-control" placeholder="Input NIK employee" />
                  <p className="text-danger">{errorMessages.nik}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="text-red">*</span>
                  </label>
                  <input value={input.phoneNumber} onChange={handleChange} name="phoneNumber" type="number" className="form-control" placeholder="Input phone number employee" />
                  <p className="text-danger">{errorMessages.phoneNumber}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Email <span className="text-red">*</span>
                  </label>
                  <input value={input.email} onChange={handleChange} name="email" type="text" className="form-control" placeholder="Input email empoyee" />
                  <p className="text-danger">{errorMessages.email}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Max Amount <span className="text-red">*</span>
                  </label>
                  <input
                    value={Number.isNaN(input.maxAmount) ? 0 : formatCurrencyRupiah(input.maxAmount)}
                    onChange={handleChange}
                    name="maxAmount"
                    type="text" // Menggunakan type "text" untuk input maxAmount agar dapat menampilkan format rupiah
                    className="form-control"
                    placeholder="Input max amount employee"
                  />
                  <p className="text-danger">{errorMessages.maxAmount}</p>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    Status <span className="text-red">*</span>
                  </label>
                  <div className="form-group">
                    <label
                      className="custom-switch"
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {/* <span className="custom-switch-description me-2">Check Box</span> */}
                      <input checked={input.employeeStatus} onChange={handleChange} name="employeeStatus" className="custom-switch-input" type="checkbox" />
                      <span className="custom-switch-indicator custom-switch-indicator-lg"></span>
                    </label>
                    <h1
                      style={{
                        position: "absolute",
                        color: "#FFF",
                        fontSize: "15px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "normal",
                        left: "9%", // Mengatur posisi horizontal di tengah
                        top: "65%", // Mengatur posisi vertical di tengah
                        transform: "translate(-50%, -50%)", // Membuat h1 berada tepat di tengah
                      }}
                    >
                      {input.employeeStatus ? "Active" : ""}
                    </h1>
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
      <Modal className="text-white" show={showConfirmationModal} onHide={handleCloseConfirmationModal} centered>
        <Modal.Header style={{ background: "#2B2E3F" }} closeButton>
          <Modal.Title>CONFIRMATION</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#2B2E3F" }}>Are you sure to create employee?</Modal.Body>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <Button variant="btn btn-danger" onClick={handleCloseConfirmationModal}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleCreateEmployee}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
