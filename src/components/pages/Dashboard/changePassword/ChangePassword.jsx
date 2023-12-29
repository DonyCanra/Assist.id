import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../../store/actions/thunks";
import { Modal, Button } from "react-bootstrap";

export default function ChangePassword() {
  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      await dispatch(changePassword(input));
      handleCloseConfirmationModal();
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error change profile:", error);
    }
  };

  // Function to validate input
  const validateInput = (data) => {
    const errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        } else if (key === "newPassword" && !passwordRegex.test(data[key])) {
          errors[key] = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.";
        }
      }
    }

    // Add a common error message for commonly used passwords
    if (data.newPassword && commonPasswords.includes(data.newPassword.toLowerCase())) {
      errors.newPassword = "Please choose a stronger password.";
    }

    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Password does not match.";
    }

    return errors;
  };

  const commonPasswords = [
    "password",
    "123456",
    // Add more passwords as needed
  ];

  return (
    <>
      <div className="card text-white">
        <div className="card-header">
          <h3 className="card-title">Change Password</h3>
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
              <label className="form-label">Current Password</label>
              <input value={input.currentPassword} onChange={handleChange} name="currentPassword" type="password" className={`form-control ${errorMessages.currentPassword ? "is-invalid" : ""}`} placeholder="Input Current Password" />
              <div className="invalid-feedback">{errorMessages.currentPassword}</div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input value={input.newPassword} onChange={handleChange} name="newPassword" type="password" className={`form-control ${errorMessages.newPassword ? "is-invalid" : ""}`} placeholder="Input New Password" />
              <div className="invalid-feedback">{errorMessages.newPassword}</div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input value={input.confirmPassword} onChange={handleChange} name="confirmPassword" type="password" className={`form-control ${errorMessages.confirmPassword ? "is-invalid" : ""}`} placeholder="Input Confirm Password" />
              <div className="invalid-feedback">{errorMessages.confirmPassword}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <button onClick={handleCancel} className="btn btn-danger">
              Cancel
            </button>
            <button onClick={handleShowConfirmationModal} className="btn btn-primary ms-1" type="submit">
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal} centered>
        <Modal.Header style={{ background: "#2B2E3F" }} closeButton>
          <Modal.Title>CONFIRMATION</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#2B2E3F" }}>Are you sure to change password?</Modal.Body>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <Button variant="btn btn-danger" onClick={handleCloseConfirmationModal}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleChangePassword}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
