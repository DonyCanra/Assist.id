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
                          <h1 className="mb-2">Create Password</h1>
                          {/* <!-- <a href="javascript:void(0);" className="">Create Password</a> --> */}
                        </div>
                        <form className="mt-5">
                          <div className="input-group mb-4">
                            <div className="input-group" id="Password-toggle1">
                              <a href="/" className="input-group-text">
                                <i className="fe fe-eye" aria-hidden="true"></i>
                              </a>
                              <input className="form-control" type="password" placeholder="Create Password" />
                            </div>
                          </div>
                          <div className="input-group mb-4">
                            <div className="input-group" id="Password-toggle1">
                              <a href="/" className="input-group-text">
                                <i className="fe fe-eye" aria-hidden="true"></i>
                              </a>
                              <input className="form-control" type="password" placeholder="Confirm Password" />
                            </div>
                          </div>
                          <div className="form-group text-center mb-3">
                            <button className="btn btn-primary btn-lg w-100 br-7">Create</button>
                          </div>
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
