import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailEmployee, updateEmployee } from "../../../../store/actions/thunks";
import { Modal, Button } from "react-bootstrap";
import { formatCurrencyRupiah, parseCurrencyRupiah } from "../../../../utils/formatCurrency";

export default function EditEmployee() {
  const { employee } = useSelector((state) => {
    return state.employee;
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    id: id,
    name: "",
    nik: "",
    phoneNumber: "",
    email: "",
    maxAmount: null,
    employeeStatus: "",
  });

  const [formattedMaxAmount, setFormattedMaxAmount] = useState("");

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    nik: "",
    phoneNumber: "",
    email: "",
    maxAmount: "",
  });

  useEffect(() => {
    if (employee) {
      setInput({
        id: employee.id,
        name: employee.name,
        nik: employee.nik,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        maxAmount: employee.maxAmount,
        employeeStatus: employee.employeeStatus,
      });
      // Format nilai maxAmount saat data karyawan tersedia
      const formattedValue = formatCurrencyRupiah(employee.maxAmount);
      setFormattedMaxAmount(formattedValue);
    }
  }, [employee]);

  useEffect(() => {
    dispatch(fetchDetailEmployee(id));
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    if (name === "maxAmount") {
      // Menghapus karakter non-digit dan mengonversinya ke nilai numerik
      const numericValue = parseCurrencyRupiah(value) + 5000;
      setInput((prevInput) => ({
        ...prevInput,
        [name]: numericValue,
      }));

      // Format angka ke format rupiah
      const formattedValue = formatCurrencyRupiah(numericValue);
      setFormattedMaxAmount(formattedValue);
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

  const handleUpdateEmployee = async (event) => {
    event.preventDefault();
    event.persist();

    input.maxAmount = parseFloat(input.maxAmount);

    input.id = id;

    if (typeof input.employeeStatus === "boolean") {
      input.employeeStatus = input.employeeStatus ? "Active" : "InActive";
    }
    const dataInput = {
      data: [input],
    };

    // Validate input before updating employee
    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      await dispatch(updateEmployee(dataInput));
      handleCloseConfirmationModal();
      navigate("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
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
        }
      }
    }
    return errors;
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Edit Employee</h4>
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
                  <input value={input.phoneNumber} onChange={handleChange} name="phoneNumber" type="text" className="form-control" placeholder="Input phone number employee" />
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
                    value={formattedMaxAmount}
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
                    <label className="custom-switch">
                      {/* <span className="custom-switch-description me-2">Check Box</span> */}
                      <input checked={input.employeeStatus} onChange={handleChange} name="employeeStatus" className="custom-switch-input" type="checkbox" />
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
        <Modal.Body style={{ background: "#2B2E3F" }}>Are you sure to edit employee?</Modal.Body>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <Button variant="btn btn-danger" onClick={handleCloseConfirmationModal}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleUpdateEmployee}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
