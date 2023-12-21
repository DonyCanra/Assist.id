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
    try {
      await dispatch(updateEmployee(dataInput));
      navigate("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };
  return (
    <>
      {/* <div className="page-header">
        <div className="page-leftheader">
          <h4 className="page-title mb-0 text-primary">Add New Employee</h4>
        </div>
      </div> */}

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Edit Employee</h4>
              </div>
              {/* <div className="page-rightheader">
                <div className="btn-list">
                  <button className="btn btn-secondary">
                    <i className="fe fe-plus me-2"></i> Add New Data Bulk
                  </button>
                </div>
              </div> */}
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
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    NIK <span class="text-red">*</span>
                  </label>
                  <input type="text" class="form-control" value={input.nik} onChange={handleChange} name="nik" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Phone Number <span class="text-red">*</span>
                  </label>
                  <input type="text" class="form-control" value={input.phoneNumber} onChange={handleChange} name="phoneNumber" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Email <span class="text-red">*</span>
                  </label>
                  <input type="email" class="form-control" value={input.email} onChange={handleChange} name="email" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">
                    Max Amount <span class="text-red">*</span>
                  </label>
                  <input type="text" class="form-control" value={input.maxAmount} onChange={handleChange} name="maxAmount" />
                </div>
              </div>
              <div class="col-sm-6 col-md-6">
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
