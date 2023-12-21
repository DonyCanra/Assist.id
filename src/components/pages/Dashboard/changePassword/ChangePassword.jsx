// import { Link } from "react-router-dom";

import { useState } from "react";
import { changePassword } from "../../../../store/actions/thunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const [input, setInput] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  console.log(input, "<<<");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    event.persist();
    try {
      await dispatch(changePassword(input));
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error change profile:", error);
    }
  };

  return (
    <>
      <div className="card">
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
              <input value={input.currentPassword} onChange={handleChange} name="currentPassword" type="password" className="form-control" placeholder="Input Current Password" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input value={input.newPassword} onChange={handleChange} name="newPassword" type="password" className="form-control" placeholder="Input New Password" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input value={input.confirmPassword} onChange={handleChange} name="confirmPassword" type="password" className="form-control" placeholder="Input Confirm Password" />
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <button onClick={handleCancel} className="btn btn-danger">
              Cancel
            </button>
            <button onClick={handleChangePassword} className="btn btn-primary ms-1" type="submit">
              Change
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
