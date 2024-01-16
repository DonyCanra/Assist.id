import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resendEmailForgotPassword } from "../../store/actions/thunks";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [input, setInput] = useState({
    email: "",
  });

  // State for tracking error messages
  const [errorMessages, setErrorMessages] = useState({
    email: "",
  });

  // State for tracking input errors
  const [errorInputs, setErrorInputs] = useState({
    email: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });

    // Clear error messages and reset errorInputs on input change
    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setErrorInputs((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const inputData = {
      email: input.email,
    };

    // Validate input before dispatching the action
    const validationErrors = validateInput(input);
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessages(validationErrors);

      setErrorInputs((prevErrors) => ({
        ...prevErrors,
        ...Object.keys(validationErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
      }));
      return;
    }

    await dispatch(resendEmailForgotPassword(inputData));
    navigate("/login");
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
                          <h1
                            style={{
                              color: "#DDD",
                              fontSize: "30px",
                              fontStyle: "normal",
                              fontWeight: "400",
                              lineHeight: "normal",
                            }}
                            className="mb-2"
                          >
                            Forgot Password
                          </h1>
                          <h6
                            style={{
                              color: "#DDD",
                              fontSize: "13px",
                              fontStyle: "normal",
                              fontWeight: "400",
                              lineHeight: "normal",
                            }}
                            className="text-white"
                          >
                            Please put your email below, we will send instruction to your email for recover your password
                          </h6>
                        </div>
                        <form onSubmit={handleResetPassword} className="mt-5">
                          <div className={`input-group mb-4 ${errorInputs.email ? "has-error" : ""}`}>
                            <div className={`input-group-text ${errorInputs.email ? "border-danger" : ""}`}>
                              <i className="fe fe-mail"></i>
                            </div>
                            <input value={input.email} onChange={handleChange} name="email" type="text" className={`form-control ${errorInputs.email ? "border-danger" : ""}`} placeholder="Input your email" />
                          </div>
                          <p className="text-danger">{errorMessages.email}</p>
                          <div className="form-group text-center mb-3">
                            <button className="btn btn-primary btn-lg w-100 br-7" type="submit">
                              Send
                            </button>
                          </div>
                          <Link to="/login">
                            <div style={{ color: "#fff" }} className="form-group fs-13 text-center">
                              Login
                            </div>
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
