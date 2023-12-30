import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/actions/thunks";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [inputDefault, setInputDefault] = useState({
    email: "",
    passwordLogin: "",
  });

  // ...
  const [loading, setLoading] = useState(false);
  // ...

  const [showPassword, setShowPassword] = useState(false);

  // State untuk melacak pesan kesalahan
  const [errorMessages, setErrorMessages] = useState({
    email: "",
    passwordLogin: "",
  });

  // State untuk melacak apakah input memiliki kesalahan atau tidak
  const [errorInputs, setErrorInputs] = useState({
    email: false,
    passwordLogin: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;

    setInputDefault((prevInputDefault) => ({
      ...prevInputDefault,
      [name]: value,
    }));

    // Set pesan kesalahan menjadi kosong setiap kali ada perubahan pada input
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Set state errorInputs menjadi false ketika ada perubahan pada input
    setErrorInputs((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Validasi sebelum login
    const validationErrors = validateInput(inputDefault);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);

      // Set state errorInputs menjadi true untuk input yang memiliki kesalahan
      setErrorInputs((prevErrors) => ({
        ...prevErrors,
        ...Object.keys(validationErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      }));

      return;
    }

    setLoading(true); // Mulai loading

    try {
      await dispatch(login(inputDefault));
      navigate("/");
    } catch (error) {
      // Handle error, misalnya menampilkan pesan kesalahan
      console.error("Login error:", error);
    } finally {
      setLoading(false); // Selesai loading, baik sukses maupun gagal
    }
  };

  const validateInput = (data) => {
    const errors = {};

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        } else if (key === "email" && !isValidEmail(data[key])) {
          errors[key] = "Please input email correctly. Email address must contain a “@“ sign and a period (.) Example: jisookim@gmail.com.";
        }
      }
    }

    return errors;
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
                          <h1 className="mb-2 text-white">Log In</h1>
                          <h6 className="text-white">Welcome Back!</h6>
                        </div>
                        <form className="mt-5" onSubmit={handleLogin}>
                          <div className={`input-group mb-3 ${errorInputs.email ? "has-error" : ""}`}>
                            <div className="input-group" id="Password-toggle1">
                              <Link className={`input-group-text ${errorInputs.email ? "border-danger" : ""}`}>
                                <i className="fe fe-user"></i>
                              </Link>
                              <input value={inputDefault.email} onChange={handleChange} name="email" type="text" className={`form-control ${errorInputs.email ? "border-danger" : ""}`} placeholder="Email" />
                            </div>
                            <p className="text-danger">{errorMessages.email}</p>
                          </div>
                          <div className={`input-group mb-3 ${errorInputs.passwordLogin ? "has-error" : ""}`}>
                            <div className="input-group" id="Password-toggle1">
                              <Link className={`input-group-text ${errorInputs.passwordLogin ? "border-danger" : ""}`} onClick={togglePasswordVisibility}>
                                <i className={`fe ${showPassword ? "fe-eye" : "fe-eye-off"}`} aria-hidden="true"></i>
                              </Link>
                              <input
                                value={inputDefault.passwordLogin}
                                name="passwordLogin"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errorInputs.passwordLogin ? "border-danger" : ""}`}
                                placeholder="Password"
                              />
                            </div>
                            <p className="text-danger">{errorMessages.passwordLogin}</p>
                          </div>
                          <div className="form-group text-center mb-3">
                            {loading ? (
                              <button className="btn btn-primary btn-lg w-100 br-7" type="button" disabled>
                                Logging In...
                              </button>
                            ) : (
                              <button className="btn btn-primary btn-lg w-100 br-7" type="submit">
                                Log In
                              </button>
                            )}
                          </div>
                          <Link to="/forgot-password">
                            <div className="form-group fs-13 text-center text-white">Forgot Password?</div>
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
