import {
  usersLoginSuccess,
  usersResendPasswordSuccess,
  usersCreatePasswordSuccess,
  dashboardFetchSuccess,
  profileFetchSuccess,
  logactivityFetchSuccess,
  imagesConvertSuccess,
  profileUpdateSuccess,
  employeeFetchSuccess,
  employeeCreateSuccess,
  employeeDetailSuccess,
  employeeUpdateSuccess,
  candidateFetchSuccess,
  candidateApproveSuccess,
  feeFetchSuccess,
  feeDetailSuccess,
  userFetchSuccess,
  userDetailSuccess,
  userCreateSuccess,
  userUpdateSuccess,
  employeeBulkCreateSuccess,
} from "./actionCreator";

import axios from "axios";
import Swal from "sweetalert2";
import { SHA256 } from "crypto-js";
import unixTimestampInSeconds from "../../utils/unixTimestampInSeconds";
import { thunk } from "redux-thunk";
import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// URL SERVER
const BASE_URL = process.env.REACT_APP_URL;
// const BASE_URL = "https://vendor.bayarind.id:8088";

// Fungsi untuk konfigurasi Toast
const configureToast = (type, title, message) => {
  return Swal.mixin({
    toast: true,
    color: "#fff",
    position: "bottom-right",
    iconColor: "#fff",
    customClass: {
      popup: "colored-toast",
    },
    background: "#2B2E3F",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
  }).fire({
    icon: type,
    title: title,
    text: message,
  });
};

export function login(input) {
  return async (dispatch) => {
    try {
      input.password = SHA256(input.password).toString();
      // console.log("user data", input);

      const unixTimes = unixTimestampInSeconds();

      var plainText = input.email + input.password;
      var sha256PlainText = SHA256(plainText).toString();

      var ewaSalt = SHA256("EWASALT").toString();

      var timeMergeSha256Plain = ewaSalt + unixTimes + sha256PlainText;
      var setSignatureSha = SHA256(timeMergeSha256Plain).toString();

      const config = {
        headers: {
          "X-SIGNATURE": setSignatureSha,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/ewa/auth-dashboard`, input, config);
      localStorage.setItem("tokenDashboard", response.data.data.token);
      configureToast("success", "Login Success", "Wellcome to EWA Dahboard");
      return dispatch(usersLoginSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function resendEmail(input) {
  return async (dispatch) => {
    try {
      // console.log(input.email, "<<<resend");
      const unixTimes = unixTimestampInSeconds();

      var setSignatureSha = SHA256(input.email).toString();

      const config = {
        headers: {
          "X-SIGNATURE": setSignatureSha,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/ewa/resend-email`, input, config);
      console.log(response, "response");
      configureToast("success", "", "Please check Email to reset password!");
      return dispatch(usersResendPasswordSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function createPassword(input) {
  return async (dispatch) => {
    try {
      // console.log(input, "<<< inputtt");

      const token = input.email;
      const decoded = jwtDecode(token);

      const unixTimes = unixTimestampInSeconds();

      var setSignatureSha = SHA256(decoded.email).toString();
      var setTokenSha = SHA256(input.password).toString();
      var setConfirmTokenSha = SHA256(input.confirmPassword).toString();

      const dataInput = {
        email: decoded.email,
        password: setTokenSha,
        confirmPassword: setConfirmTokenSha,
      };

      // console.log(dataInput, "<< data Input before axios");

      const config = {
        headers: {
          "X-SIGNATURE": setSignatureSha,
          "X-Time": unixTimes,
          "X-Access-Key": input.email,
        },
      };

      const response = await axios.post(`${BASE_URL}/ewa/password-create`, dataInput, config);
      configureToast("success", "", "Password has been created");
      return dispatch(usersCreatePasswordSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function fetchDashboard(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.get(`${BASE_URL}/dashboard/analytics?startDate=${input.startDate}&endDate=${input.endDate}`, config);

      const data = response.data.data;
      // console.log(data, "<< data");
      return dispatch(dashboardFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}
export function fetchProfile() {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.get(`${BASE_URL}/dashboard/users/profile`, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(profileFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function fetchLogactivity(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/log-activity`, input, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(logactivityFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function convertImages(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/upload/file`, input, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(imagesConvertSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function updateProfile(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      const response = await axios.put(`${BASE_URL}/dashboard/users/update-profile`, input, config);

      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Updated Success", "Profile has been updated");
      return dispatch(profileUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function fetchEmployee(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();

      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      // console.log("input", input);
      const response = await axios.post(`${BASE_URL}/dashboard/employee/status`, input, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(employeeFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function fetchDetailEmployee(id) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      const response = await axios.get(`${BASE_URL}/dashboard/employee/${id}`, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(employeeDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function createEmployee(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      const response = await axios.post(`${BASE_URL}/dashboard/employee`, input, config);

      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Create Success", "New employee has been created");
      return dispatch(employeeCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function bulkCreateEmployee(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      const response = await axios.post(`${BASE_URL}/dashboard/employee`, input, config);

      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Create Success", "New employee has been created");
      return dispatch(employeeBulkCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function updateEmployee(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      const response = await axios.put(`${BASE_URL}/dashboard/employee`, input, config);

      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Updated Success", "Employee has been updated");
      return dispatch(employeeUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function fetchCandidate(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      // console.log("input", input);
      const response = await axios.post(`${BASE_URL}/dashboard/employee/status`, input, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(candidateFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function approveCandidate(id) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      // console.log("input", input);
      const response = await axios.get(`${BASE_URL}/dashboard/employee/approve/${id}`, config);

      const data = response.data;
      console.log(data, "<< data");
      return dispatch(candidateApproveSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function fetchFee(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      // console.log("input", input);
      const response = await axios.post(`${BASE_URL}/dashboard/fee`, input, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(feeFetchSuccess(data));
    } catch (error) {
      console.error("Request Failed: ", error.message);
      throw error;
    }
  };
}

export function fetchDetailFee(transactionNo) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };
      const response = await axios.get(`${BASE_URL}/dashboard/fee?transactionNo=${transactionNo}`, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(feeDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function fetchRole(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/employee/status`, input, config);

      const data = response.data.data;
      console.log(data, "datanya");
      return dispatch(employeeFetchSuccess(data));
    } catch (error) {
      console.error("Request Failed: ", error.message);
      throw error;
    }
  };
}
export function fetchUser(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();

      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };
      // console.log("input", input);
      const response = await axios.post(`${BASE_URL}/dashboard/users/paging`, input, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(userFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function fetchDetailUser(id) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.get(`${BASE_URL}/dashboard/users/${id}`, config);

      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(userDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function createUser(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/users`, input, config);

      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Create Success", "New user has been created");
      return dispatch(userCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export function updateUser(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.put(`${BASE_URL}/dashboard/users`, input, config);

      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Updated Success", "User has been updated");
      return dispatch(userUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("warning", "", msgError);
      }
    }
  };
}

export default thunk;
