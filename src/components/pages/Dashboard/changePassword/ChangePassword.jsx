// import { Link } from "react-router-dom";

export default function ChangePassword() {
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
              <input type="password" className="form-control" placeholder="Input Current Password" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input type="password" className="form-control" placeholder="Input New Password" />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" className="form-control" placeholder="Input Confirm Password" />
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <button className="btn btn-danger">Cancel</button>
            <button className="btn btn-primary ms-1">Change</button>
          </div>
        </div>
      </div>
    </>
  );
}
