import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser, resendEmail } from "../../../../store/actions/thunks";

export default function AddUser() {
  const [input, setInput] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    role: "",
    status: true,
  });

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;

    setInput((prevInput) => ({
      ...prevInput,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateUser = async (event) => {
    event.preventDefault();
    event.persist(); // Memastikan event tetap tersedia setelah fungsi asinkron selesai

    try {
      if (input.status) input.status = "Active";
      else input.status = "InActive";
      await dispatch(createUser(input)); // Sesuaikan parameter sesuai kebutuhan
      await dispatch(resendEmail(input.email)); // Sesuaikan parameter sesuai kebutuhan
      navigate("/users");
    } catch (error) {
      console.error("Error creating user:", error);
    }
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
              <form onSubmit={handleCreateUser}>
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
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="form-label">
                      Role <span class="text-red">*</span>
                    </label>
                    <input type="text" class="form-control" value={input.role} onChange={handleChange} name="role" />
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
