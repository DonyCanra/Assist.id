import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, resendEmailCreateUser } from "../../../../store/actions/thunks";

export default function AddUser() {
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

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateUser = async (event) => {
    event.preventDefault();
    event.persist(); // Memastikan event tetap tersedia setelah fungsi asinkron selesai

    // Validasi wajib pada setiap input
    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      if (input.status) input.status = "Active";
      else input.status = "InActive";
      await dispatch(createUser(input)); // Sesuaikan parameter sesuai kebutuhan
      await dispatch(resendEmailCreateUser(input.email)); // Sesuaikan parameter sesuai kebutuhan
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Fungsi untuk validasi input
  const validateInput = (data) => {
    const errors = {};
    for (const key in data) {
      if (data.hasOwnProperty(key) && !data[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
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
              <form onSubmit={handleCreateUser}>
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
                    <input type="text" class={`form-control ${errorMessages.phoneNumber ? "border-red" : ""}`} value={input.phoneNumber} onChange={handleChange} name="phoneNumber" placeholder="Input phone number" />
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
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="form-label">
                      Role <span class="text-red">*</span>
                    </label>
                    <input type="text" class={`form-control ${errorMessages.role ? "border-red" : ""}`} value={input.role} onChange={handleChange} name="role" placeholder="Input role" />
                    <p className="text-danger">{errorMessages.role}</p>
                  </div>
                </div>
                <div class="col-sm-6 col-md-6">
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
                  <button class="btn btn-danger">Cancel</button>
                  <button class="btn btn-primary ms-1" type="submit">
                    Confirm
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
