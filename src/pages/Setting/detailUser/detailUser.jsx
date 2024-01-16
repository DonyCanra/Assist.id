export default function DetailUser() {
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card" style={{ background: "#212332" }}>
            <div className="page-header" style={{ margin: "20px 20px 20px 20px" }}>
              <div className="page-leftheader">
                <h4 className="page-title mb-0 text-primary">Detail Fee</h4>
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
                  <input type="text" className="form-control" placeholder="Input name empoyee" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="text-red">*</span>
                  </label>
                  <input type="text" className="form-control" placeholder="Input email empoyee" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Email <span className="text-red">*</span>
                  </label>
                  <input type="email" className="form-control" placeholder="Input email empoyee" />
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-group">
                  <label className="form-label">
                    Role<span className="text-red">*</span>
                  </label>
                  <input type="text" className="form-control" placeholder="Input max amount" />
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
                      <input type="checkbox" name="custom-switch-checkbox1" className="custom-switch-input" checked />
                      <span className="custom-switch-indicator custom-switch-indicator-lg"></span>
                    </label>
                  </div>
                </div>
                <a className="btn btn-danger">Cancel</a>
                <a className="btn btn-primary ms-1">Confirm</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
