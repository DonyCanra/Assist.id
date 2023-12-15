import { Link } from "react-router-dom";

export default function CreatePassword() {
  return (
    <>
      <div className="page">
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col mx-auto">
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <div className="text-center mb-5">
                      <img src="/images/brand/logo1.png" className="header-brand-img desktop-lgo" alt="Azea logo" />
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div className="text-center mb-3">
                          <h1 className="mb-2">Forgot Password</h1>
                        </div>
                        <form className="mt-5">
                          <div className="input-group mb-4">
                            <div className="input-group-text">
                              <i className="fe fe-user"></i>
                            </div>
                            <input type="text" className="form-control" placeholder="Username" />
                          </div>
                          <div className="form-group text-center mb-3">
                            <button className="btn btn-primary btn-lg w-100 br-7">Send</button>
                          </div>
                          <Link to="/login">
                            <div className="form-group fs-13 text-center">Login</div>
                          </Link>
                        </form>
                      </div>
                    </div>
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
