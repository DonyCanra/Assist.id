import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resendEmail } from "../../store/actions/thunks";
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

  const inputData = {
    email: input.email,
  };

  const handleResetPassword = async (event) => {
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

    await dispatch(resendEmail(inputData));
    navigate("/login");
  };

  // Function to validate input
  const validateInput = (data) => {
    const errors = {};
    for (const key in data) {
      if (data.hasOwnProperty(key) && !data[key]) {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    }
    return errors;
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
                          <h1 className="mb-2">Forgot Password</h1>
                        </div>
                        <form onSubmit={handleResetPassword} className="mt-5">
                          <div className={`input-group mb-4 ${errorInputs.email ? "has-error" : ""}`}>
                            <div className="input-group-text">
                              <i className="fe fe-mail"></i>
                            </div>
                            <input value={input.email} onChange={handleChange} name="email" type="email" className={`form-control ${errorInputs.email ? "border-danger" : ""}`} placeholder="Input your email" />
                          </div>
                          <p className="text-danger">{errorMessages.email}</p>
                          <div className="form-group text-center mb-3">
                            <button className="btn btn-primary btn-lg w-100 br-7" type="submit">
                              Send
                            </button>
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
