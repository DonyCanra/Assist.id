import { Link } from "react-router-dom";

export default function error() {
  return (
    <>
      <div className="page">
        <div className="page-content">
          <div className="container text-center">
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <div className="text-primary">
                    <div className="display-1 mb-4 font-weight-bold error-text">404</div>
                    <h1 className="h3 mb-3 font-weight-bold">Sorry, an error has occured, Requested Page not found!</h1>
                    <p className="h5 font-weight-normal mb-7 leading-normal">You may have mistyped the address or the page may have moved.</p>
                    <Link className="btn btn-primary text-light mb-5 fs-18">Help</Link>
                    <Link to="/login" className="btn text-primary border-primary mb-5 ms-2 fs-18" href="index.html">
                      Back to Login
                    </Link>
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
