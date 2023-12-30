import {
  usersLoginSuccess,
  usersCreatePasswordSuccess,
  usersChangePasswordSuccess,
  usersResendCreatePasswordSuccess,
  usersResendForgotPasswordSuccess,
  dashboardFetchSuccess,
  profileFetchSuccess,
  logactivityFetchSuccess,
  imagesConvertSuccess,
  profileUpdateSuccess,
  employeeFetchSuccess,
  employeeCreateSuccess,
  employeeDetailSuccess,
  employeeUpdateSuccess,
  employeeBulkCreateSuccess,
  candidateFetchSuccess,
  candidateApproveSuccess,
  feeFetchSuccess,
  feeDetailSuccess,
  userFetchSuccess,
  userDetailSuccess,
  userCreateSuccess,
  userUpdateSuccess,
  roleFetchSuccess,
  roleCreateSuccess,
  roleUpdateSuccess,
  roleDetailSuccess,
  privilegeFetchSuccess,
  transactionFetchSuccess,
  withdrawFetchSuccess,
} from "./actionCreator";

import { SHA256 } from "crypto-js";
import { thunk } from "redux-thunk";
import { redirect } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";
import unixTimestampInSeconds from "../../utils/unixTimestampInSeconds";

// URL SERVER
const BASE_URL = process.env.REACT_APP_DEV;

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
  const newPassword = input.passwordLogin;
  return async (dispatch) => {
    try {
      const passwordHash = SHA256(newPassword).toString();

      const unixTimes = unixTimestampInSeconds();

      var plainText = input.email + passwordHash;
      var sha256PlainText = SHA256(plainText).toString();

      var ewaSalt = SHA256(process.env.REACT_APP_SALT).toString();

      var timeMergeSha256Plain = ewaSalt + unixTimes + sha256PlainText;
      var setSignatureSha = SHA256(timeMergeSha256Plain).toString();

      const config = {
        headers: {
          "X-SIGNATURE": setSignatureSha,
          "X-Time": unixTimes,
        },
      };
      // input.passwordLogin = SHA256(input.password).toString();
      input.password = passwordHash;

      const response = await axios.post(`${BASE_URL}/ewa/auth-dashboard`, { email: input.email, password: passwordHash }, config);

      localStorage.setItem("tokenDashboard", response.data.data.token);
      localStorage.setItem("privilege", JSON.stringify(response.data.data.privilege));

      configureToast("success", "Login Success", "Wellcome to EWA Dahboard");
      return dispatch(usersLoginSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
      throw error;
    }
  };
}

export function resendEmailCreateUser(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();

      var setSignatureSha = SHA256(input.email).toString();

      const config = {
        headers: {
          "X-Time": unixTimes,
          "X-SIGNATURE": setSignatureSha,
        },
      };

      const response = await axios.post(`${BASE_URL}/ewa/resend-email`, input, config);
      configureToast("success", "SUCCESS", "Please check Email to reset password!");
      return dispatch(usersResendCreatePasswordSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
      throw error;
    }
  };
}

export function resendEmailForgotPassword(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();

      var setSignatureSha = SHA256(input.email).toString();

      const config = {
        headers: {
          "X-Time": unixTimes,
          "X-SIGNATURE": setSignatureSha,
        },
      };

      const response = await axios.post(`${BASE_URL}/ewa/forgot-password`, input, config);
      configureToast("success", "SUCCESS", "Please check Email to reset password!");
      return dispatch(usersResendForgotPasswordSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
      throw error;
    }
  };
}

export function createPassword(input) {
  return async (dispatch) => {
    try {
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

      const config = {
        headers: {
          "X-SIGNATURE": setSignatureSha,
          "X-Time": unixTimes,
          "X-Access-Key": input.email,
        },
      };

      const response = await axios.post(`${BASE_URL}/ewa/password-create`, dataInput, config);
      configureToast("success", "SUCCESS", "Password has been created");
      return dispatch(usersCreatePasswordSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
      throw error;
    }
  };
}

export function changePassword(input) {
  return async (dispatch) => {
    try {
      var setCurrentTokenSha = SHA256(input.currentPassword).toString();
      var setnewTokenSha = SHA256(input.newPassword).toString();
      var setConfirmTokenSha = SHA256(input.confirmPassword).toString();

      const dataInput = {
        currentPassword: setCurrentTokenSha,
        newPassword: setnewTokenSha,
        confirmPassword: setConfirmTokenSha,
      };

      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/password-change`, dataInput, config);
      configureToast("success", "SUCCESS", "Password has been changed, please login again");
      return dispatch(usersChangePasswordSuccess(response.data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
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
      dispatch(dashboardFetchSuccess(data));
      // Check if the window has already been reloaded
      if (!localStorage.getItem("dashboardReloaded")) {
        // Reload the window upon successful data fetch
        window.location.reload();

        // Set the flag to indicate that the window has been reloaded
        localStorage.setItem("dashboardReloaded", "true");
      }
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
    }
  };
}

export function fetchDataTransaction(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/chart/transaction`, input, config);

      const data = response.data.data;
      return dispatch(transactionFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
    }
  };
}

export function fetchDataWithdraw(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/chart/withdrawal`, input, config);

      const data = response.data.data;
      return dispatch(withdrawFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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

      // Dispatch aksi ke store Redux
      dispatch(profileFetchSuccess(data));

      // Mengembalikan data untuk digunakan di komponen atau di tempat lain jika diperlukan
      return data;
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      return dispatch(logactivityFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
    }
  };
}

export function fetchPrivilege() {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-time": unixTimes,
        },
      };

      const response = await axios.get(`${BASE_URL}/dashboard/users/profile-privilege`, config);

      const data = response.data.data;

      localStorage.setItem("privilege", JSON.stringify(data));
      return dispatch(privilegeFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      return dispatch(imagesConvertSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      configureToast("success", "Updated Success", "Profile has been updated");
      return dispatch(profileUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      const response = await axios.post(`${BASE_URL}/dashboard/employee/status`, input, config);

      const data = response.data.data;

      return dispatch(employeeFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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

      return dispatch(employeeDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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

      configureToast("success", "SUCCESS", "New employee has been created");
      return dispatch(employeeCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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

      configureToast("success", "SUCCESS", "New employee has been created");
      return dispatch(employeeBulkCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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

      configureToast("success", "SUCCESS", "Employee has been updated");
      return dispatch(employeeUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      const response = await axios.post(`${BASE_URL}/dashboard/employee/status`, input, config);

      const data = response.data.data;

      return dispatch(candidateFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      const response = await axios.get(`${BASE_URL}/dashboard/employee/approve/${id}`, config);

      const data = response.data;

      configureToast("success", "SUCCESS", "Employee has been approved");
      return dispatch(candidateApproveSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      const response = await axios.post(`${BASE_URL}/dashboard/fee`, input, config);

      const data = response.data.data;

      return dispatch(feeFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
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

      return dispatch(feeDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      const response = await axios.post(`${BASE_URL}/dashboard/role`, input, config);

      const data = response.data.data;

      return dispatch(roleFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
    }
  };
}

export function fetchDetailRole(id) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.get(`${BASE_URL}/dashboard/role/${id}`, config);

      const data = response.data.data;
      return dispatch(roleDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
    }
  };
}

export function createRole(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };

      const response = await axios.post(`${BASE_URL}/dashboard/role/save`, input, config);

      const data = response.data;
      configureToast("success", "SUCCESS", "New role has been created");
      return dispatch(roleCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
    }
  };
}

export function updateRole(input) {
  return async (dispatch) => {
    try {
      const unixTimes = unixTimestampInSeconds();
      const config = {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      };

      const responseUpdate = await axios.put(`${BASE_URL}/dashboard/role/save`, input, config);
      const responsePrivilege = await axios.get(`${BASE_URL}/dashboard/users/profile-privilege`, config);

      localStorage.setItem("privilege", JSON.stringify(responsePrivilege.data.data));

      const data = responseUpdate.data;

      configureToast("success", "SUCCESS", "Role has been updated");
      return dispatch(roleUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
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
      const response = await axios.post(`${BASE_URL}/dashboard/users/paging`, input, config);
      const data = response.data.data;
      return dispatch(userFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      return dispatch(userDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      configureToast("success", "SUCCESS", "New user has been created");
      return dispatch(userCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
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
      configureToast("success", "SUCCESS", "User has been updated");
      return dispatch(userUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      const codeError = error.response.data.error.code;
      if (codeError === 511) {
        configureToast("warning", "WARNING", msgError);
        localStorage.clear();
        throw redirect("/login");
      } else {
        configureToast("error", "FAILED", msgError);
      }
    }
  };
}

export default thunk;
