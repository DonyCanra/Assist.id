import { useState } from "react";
import { Link } from "react-router-dom";

export default function CreatePassword() {
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };
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
                              <Link className="input-group-text" onClick={togglePasswordVisibility}>
                                <i className={`fe ${showPassword ? "fe-eye" : "fe-eye-off"}`} aria-hidden="true"></i>
                              </Link>
                              <input value={input.password} name="password" onChange={handleChange} type={showPassword ? "text" : "password"} className="form-control" placeholder="Input Password" />
                            </div>
                          </div>
                          <div className="input-group mb-4">
                            <div className="input-group" id="Password-toggle1">
                              <Link className="input-group-text" onClick={toggleConfirmPasswordVisibility}>
                                <i className={`fe ${showConfirmPassword ? "fe-eye" : "fe-eye-off"}`} aria-hidden="true"></i>
                              </Link>
                              <input value={input.confirmPassword} name="confirmPassword" onChange={handleChange} type={showConfirmPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" />
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
