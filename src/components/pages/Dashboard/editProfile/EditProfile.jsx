// import { Link } from "react-router-dom";
// import "./Employee.css";

export default function AddEmployee() {
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
                <h4 className="page-title mb-0 text-primary">Edit Profile</h4>
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
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Name <span className="text-red">*</span>
                  </label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="text-red">*</span>
                  </label>
                  <input type="text" className="form-control" placeholder="" />
                </div>
              </div>
              <div className="col-lg-12 col-xl-8">
                <button class="btn btn-pill btn-dark mb-2">
                  Choose File
                </button>

                <div className="box-widget widget-user">
                  <div className="widget-user-image1 d-xl-flex d-block">
                    <img alt="" className="avatar" style={{ borderRadius: "20px" }} src="/images/photos/image5.png" />
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6">
                <div className="form-group">
                  <div className="form-group"></div>
                </div>
                <button className="btn btn-danger">Cancel</button>
                <button className="btn btn-primary ms-1">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
