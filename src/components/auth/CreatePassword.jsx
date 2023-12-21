import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPassword } from "../../store/actions/thunks";

export default function CreatePassword() {
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State for tracking error messages
  const [errorMessages, setErrorMessages] = useState({
    password: "",
    confirmPassword: "",
  });

  // State for tracking input errors
  const [errorInputs, setErrorInputs] = useState({
    password: false,
    confirmPassword: false,
  });

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

  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputData = {
    email: email,
    password: input.password,
    confirmPassword: input.confirmPassword,
  };

  const handleCreatePassword = async (event) => {
    event.preventDefault();

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

    if (input.password !== input.confirmPassword) {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Password does not match.",
      }));

      setErrorInputs((prevErrors) => ({
        ...prevErrors,
        confirmPassword: true,
      }));

      return;
    }

    await dispatch(createPassword(inputData));
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  // Function to validate input
  const validateInput = (data) => {
    const errors = {};
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (!data[key]) {
          errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
        } else if (key === "password" && !passwordRegex.test(data[key])) {
          errors[key] = "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.";
        }
      }
    }

    // Add a common error message for commonly used passwords
    if (data.password && commonPasswords.includes(data.password.toLowerCase())) {
      errors.password = "Please choose a stronger password.";
    }

    return errors;
  };

  const commonPasswords = [
    "password",
    "123456",
    // Add more passwords as needed
  ];

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
                        </div>
                        <form onSubmit={handleCreatePassword} className="mt-5">
                          <div className={`input-group mb-4 ${errorInputs.password ? "has-error" : ""}`}>
                            <div className="input-group" id="Password-toggle1">
                              <Link className={`input-group-text ${errorInputs.password ? "border-danger" : ""}`} onClick={togglePasswordVisibility}>
                                <i className={`fe ${showPassword ? "fe-eye" : "fe-eye-off"}`} aria-hidden="true"></i>
                              </Link>
                              <input
                                value={input.password}
                                name="password"
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                className={`form-control ${errorInputs.password ? "border-danger" : ""}`}
                                placeholder="Input Password"
                              />
                            </div>
                            <p className="text-danger">{errorMessages.password}</p>
                          </div>
                          <div className={`input-group mb-4 ${errorInputs.confirmPassword ? "has-error" : ""}`}>
                            <div className="input-group" id="Password-toggle1">
                              <Link className={`input-group-text ${errorInputs.confirmPassword ? "border-danger" : ""}`} onClick={toggleConfirmPasswordVisibility}>
                                <i className={`fe ${showConfirmPassword ? "fe-eye" : "fe-eye-off"}`} aria-hidden="true"></i>
                              </Link>
                              <input
                                value={input.confirmPassword}
                                name="confirmPassword"
                                onChange={handleChange}
                                type={showConfirmPassword ? "text" : "password"}
                                className={`form-control ${errorInputs.confirmPassword ? "border-danger" : ""}`}
                                placeholder="Confirm Password"
                              />
                            </div>
                            <p className="text-danger">{errorMessages.confirmPassword}</p>
                          </div>
                          <div className="form-group text-center mb-3">
                            <button className="btn btn-primary btn-lg w-100 br-7" type="submit">
                              Create
                            </button>
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
