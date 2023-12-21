import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createEmployee } from "../../../../store/actions/thunks";

export default function AddEmployee() {
  const [input, setInput] = useState({
    name: "",
    nik: "",
    phoneNumber: "",
    email: "",
    maxAmount: null,
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

  input.maxAmount = parseFloat(input.maxAmount);
  const dataInput = {
    data: [input],
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleCancel = () => {
    navigate("/employee");
  };

  const handleCreateEmployee = async (event) => {
    event.preventDefault();
    event.persist();

    // Validasi sebelum membuat karyawan
    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      await dispatch(createEmployee(dataInput, "<<<<"));
      navigate("/employee");
    } catch (error) {
      console.error("Error creating employee:", error);
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
                  <input value={input.phoneNumber} onChange={handleChange} name="phoneNumber" type="text" className="form-control" placeholder="Input phone number employee" />
                  <p className="text-danger">{errorMessages.phoneNumber}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Email <span className="text-red">*</span>
                  </label>
                  <input value={input.email} onChange={handleChange} name="email" type="email" className="form-control" placeholder="Input email empoyee" />
                  <p className="text-danger">{errorMessages.email}</p>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Max Amount <span className="text-red">*</span>
                  </label>
                  <input value={input.maxAmount} onChange={handleChange} name="maxAmount" type="number" className="form-control" placeholder="Input max amount employee" />
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
                    <button onClick={handleCreateEmployee} className="btn btn-primary ms-1 page-rightheader" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
