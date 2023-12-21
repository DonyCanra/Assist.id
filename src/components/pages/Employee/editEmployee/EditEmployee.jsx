import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailEmployee, updateEmployee } from "../../../../store/actions/thunks";

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
        name: employee.name,
        nik: employee.nik,
        phoneNumber: employee.phoneNumber,
        email: employee.email,
        maxAmount: employee.maxAmount,
        employeeStatus: employee.employeeStatus,
      });
    }
  }, [employee]);

  useEffect(() => {
    dispatch(fetchDetailEmployee(id));
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
    }));

    // Clear error message when input changes
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  input.id = id;
  input.maxAmount = parseFloat(input.maxAmount);
  const dataInput = {
    data: [input],
  };

  const handleCancel = () => {
    navigate("/employee");
  };

  const handleUpdateEmployee = async (event) => {
    event.preventDefault();
    event.persist();

    // Validate input before updating employee
    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    try {
      await dispatch(updateEmployee(dataInput));
      navigate("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Validation function
  const validateInput = (data) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          errors[key] = `This field is required ${key.replace(/([a-z][A-Z])/g, (match) => `${match[0]} ${match[1].toUpperCase()}`)}.`;
        } else if (key === "nik" && data[key].length > 16) {
          errors[key] = "NIK must be a maximum of 16 characters.";
        } else if (key === "email" && !emailRegex.test(data[key])) {
          errors[key] = "Invalid email format.";
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
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Name <span class="text-red">*</span>
                  </label>
                  <input type="text" class="form-control" value={input.name} onChange={handleChange} name="name" />
                  <p className="text-danger">{errorMessages.name}</p>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    NIK <span class="text-red">*</span>
                  </label>
                  <input type="text" class="form-control" value={input.nik} onChange={handleChange} name="nik" />
                  <p className="text-danger">{errorMessages.nik}</p>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Phone Number <span class="text-red">*</span>
                  </label>
                  <input type="text" class="form-control" value={input.phoneNumber} onChange={handleChange} name="phoneNumber" />
                  <p className="text-danger">{errorMessages.phoneNumber}</p>
                </div>
              </div>

              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Email <span class="text-red">*</span>
                  </label>
                  <input type="email" class="form-control" value={input.email} onChange={handleChange} name="email" />
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

              <div class="col-sm-6 col-md-6">
                <div className="form-group">
                  <label className="form-label">
                    Status <span className="text-red">*</span>
                  </label>
                  <div className="form-group">
                    <label className="custom-switch">
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
                    <button onClick={handleUpdateEmployee} className="btn btn-primary ms-1 page-rightheader" type="submit">
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
