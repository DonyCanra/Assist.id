import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetailUser, updateUser } from "../../../../store/actions/thunks";

export default function EditUser() {
  const { user } = useSelector((state) => {
    return state.user;
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    id: id,
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    status: true,
  });

  useEffect(() => {
    if (user) {
      setInput({
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  useEffect(() => {
    dispatch(fetchDetailUser(id));
  }, [dispatch, id]);

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: type === "checkbox" ? checked : type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleCancel = () => {
    navigate("/users");
  };

  input.id = id;

  const handleUpdateUser = async (event) => {
    event.preventDefault();
    event.persist();
    try {
      if (input.status) input.status = "Active";
      else input.status = "InActive";
      await dispatch(updateUser(input));
      navigate("/users");
    } catch (error) {
      console.error("Error updating users:", error);
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
                <h4 className="page-title mb-0 text-primary">Edit User</h4>
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
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Role <span class="text-red">*</span>
                  </label>
                  <select
                    className="form-select"
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
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Finance">Finance</option>
                    <option value="User">User</option>
                  </select>
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
                    <button onClick={handleUpdateUser} className="btn btn-primary ms-1 page-rightheader" type="submit">
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
