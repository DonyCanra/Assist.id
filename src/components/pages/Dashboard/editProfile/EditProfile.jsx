import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, updateProfile } from "../../../../store/actions/thunks";
import ImageUploader from "./ImageUploader";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function EditProfile() {
  const { profile } = useSelector((state) => state.profile);
  const { image } = useSelector((state) => state.image);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
    avatar: "",
  });

  const [error, setError] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    // Batasi panjang karakter untuk phone number
    if (name === "phoneNumber" && value.length > 13) {
      return; // Kembalikan jika panjang karakter melebihi batas
    }
    setInput({
      ...input,
      [name]: value,
    });

    // Clear error message when input changes
    setError((prevError) => ({
      ...prevError,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (profile) {
      setInput({
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        avatar: profile.avatar,
      });
    }
  }, [profile]);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  input.avatar = image.fileName;

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{9,13}$/;
    if (!input.phoneNumber) {
      setError((prevError) => ({
        ...prevError,
        phoneNumber: "Phone number is required.",
      }));
      return false;
    } else if (!phoneNumberRegex.test(input.phoneNumber)) {
      setError((prevError) => ({
        ...prevError,
        phoneNumber: "Phone number must be between 9 and 13 characters.",
      }));
      return false;
    }
    return true;
  };

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleCloseConfirmationModal = () => setShowConfirmationModal(false);
  const handleShowConfirmationModal = () => setShowConfirmationModal(true);

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    // Validasi wajib pada setiap input
    if (!input.name) {
      setError((prevError) => ({
        ...prevError,
        name: "Name is required.",
      }));
      return;
    }

    if (!validatePhoneNumber()) {
      return;
    }

    try {
      await dispatch(updateProfile(input));
      handleCloseConfirmationModal();
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Edit Profile</h4>
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
                  <input value={input.name} onChange={handleChange} name="name" type="text" className={`form-control ${error.name && "is-invalid"}`} placeholder="" />
                  {error.name && <div className="invalid-feedback">{error.name}</div>}
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="text-red">*</span>
                  </label>
                  <input value={input.phoneNumber} onChange={handleChange} onBlur={validatePhoneNumber} name="phoneNumber" type="number" className={`form-control ${error.phoneNumber && "is-invalid"}`} placeholder="" />
                  {error.phoneNumber && <div className="invalid-feedback">{error.phoneNumber}</div>}
                </div>
              </div>

              <ImageUploader profile={profile} />

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
        <Modal.Body style={{ background: "#2B2E3F" }}>Are you sure to update profile?</Modal.Body>
        <Modal.Footer style={{ background: "#2B2E3F" }}>
          <Button variant="btn btn-danger" onClick={handleCloseConfirmationModal}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleUpdateProfile}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
