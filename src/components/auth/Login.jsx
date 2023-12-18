import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/thunks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { SHA256 } from "crypto-js";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log(input.password, "belum di hash");
    // SHA256(input.password).toString();
    // console.log(input.password, "sudah di hash");
    await dispatch(login(input));
    navigate("/");
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
                          <h1 className="mb-2">Log In</h1>
                          <h6 className="">Welcome Back !</h6>
                        </div>
                        <form className="mt-5" onSubmit={handleLogin}>
                          <div className="input-group mb-4">
                            <div className="input-group-text">
                              <i className="fe fe-user"></i>
                            </div>
                            <input value={input.email} onChange={handleChange} name="email" type="email" className="form-control" placeholder="Username" />
                          </div>
                          <div className="input-group mb-4">
                            <div className="input-group" id="Password-toggle1">
                              <Link className="input-group-text" onClick={togglePasswordVisibility}>
                                <i className={`fe ${showPassword ? "fe-eye" : "fe-eye-off"}`} aria-hidden="true"></i>
                              </Link>
                              <input value={input.password} name="password" onChange={handleChange} type={showPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" />
                            </div>
                          </div>
                          <div className="form-group text-center mb-3">
                            <button className="btn btn-primary btn-lg w-100 br-7" type="submit">
                              Log In
                            </button>
                          </div>
                          <Link to="/forgot-password">
                            <div className="form-group fs-13 text-center">Forget Password ?</div>
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
