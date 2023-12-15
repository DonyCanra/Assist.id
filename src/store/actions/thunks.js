import {
  usersLoginSuccess,
  dashboardFetchSuccess,
  employeeFetchSuccess,
  employeeCreateSuccess,
  employeeDetailSuccess,
  employeeUpdateSuccess,
  candidateFetchSuccess,
  feeFetchSuccess,
  feeDetailSuccess,
  userFetchSuccess,
  userDetailSuccess,
  userCreateSuccess,
  userUpdateSuccess,
} from "./actionCreator";
import axios from "axios";
import Swal from "sweetalert2";
import { SHA256 } from "crypto-js";
import unixTimestampInSeconds from "../../utils/unixTimestampInSeconds";
import { thunk } from "redux-thunk";
import { useNavigate } from "react-router-dom";

// URL SERVER
const BASE_URL = "https://vendor.bayarind.id:8088";

// Middlewares
const unixTimes = unixTimestampInSeconds();

const axiosInstance = axios.create({
  headers: {
    "X-Access-Key": localStorage.tokenDashboard,
    "X-Time": unixTimes,
  },
});

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
      console.log("user data", input);

      const unixTimes = unixTimestampInSeconds();

      var plainText = input.email + input.password;
      var sha256PlainText = SHA256(plainText).toString();

      var ewaSalt = SHA256("EWASALT").toString();

      var timeMergeSha256Plain = ewaSalt + unixTimes + sha256PlainText;
      var setSignatureSha = SHA256(timeMergeSha256Plain).toString();

      const response = await axios.post(`${BASE_URL}/ewa/auth-dashboard`, input, {
        headers: {
          "X-SIGNATURE": setSignatureSha,
          "X-Time": unixTimes,
        },
      });
      console.log("I'm here", response.status);
      if (response.status !== 200) {
        const data = response.data.error;
        console.log(data, "<<<<<");
        console.log(data.messageData, "errornya");

        throw new Error("Login failed");
      }
      console.log(response.data.data.token, "<< res");
      localStorage.setItem("tokenDashboard", response.data.data.token);
      configureToast("success", "Login Success", "Wellcome to EWA Dahboard");
      return dispatch(usersLoginSuccess(response.data));
    } catch (error) {
      // console.log("Request Failed: ", error.response.data.error.messageData);
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function fetchDashboard(input) {
  return async (dispatch) => {
    // const startDate = "2020-12-14";
    // const endDate = "2023-12-14";
    try {
      const response = await axiosInstance.get(`${BASE_URL}/dashboard/analytics?startDate=${input.startDate}&endDate=${input.endDate}`);

      console.log(response.status, "statusnya");
      if (response.status === 200 || response.status === 204) {
        const data = response.data.data;
        console.log(data, "<< data");
        return dispatch(dashboardFetchSuccess(data));
      } else if (response.status === 511) {
        console.log(response.status, "status");
        const navigate = useNavigate();
        navigate("/login");
      } else {
        console.log("Error bro:", response.status, response.statusText);
        throw new Error("Request failed");
      }
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
    }
  };
}

export function fetchEmployee(input) {
  return async (dispatch) => {
    try {
      // console.log("input", input);
      const response = await axiosInstance.post(`${BASE_URL}/dashboard/employee/status`, input);

      console.log(response.status, "statusnya");
      if (response.status === 200 || response.status === 204) {
        const data = response.data.data;
        console.log(data, "<< data");
        return dispatch(employeeFetchSuccess(data));
      } else if (response.status === 511) {
        console.log(response.status, "status");
        const navigate = useNavigate();
        navigate("/login");
      } else {
        console.log("Error bro:", response.status, response.statusText);
        throw new Error("Request failed");
      }
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function fetchDetailEmployee(id) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/dashboard/employee/${id}`);

      console.log(response.status, "statusnya");
      if (response.status === 200 || response.status === 204) {
        const data = response.data.data;
        console.log(data, "<< data");
        return dispatch(employeeDetailSuccess(data));
      } else if (response.status === 511) {
        console.log(response.status, "status");
        const navigate = useNavigate();
        navigate("/login");
      } else {
        console.log("Error bro:", response.status, response.statusText);
        throw new Error("Request failed");
      }
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function createEmployee(input) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/dashboard/employee`, input);

      console.log(response.status, "statusnya");
      if (response.status === 200 || response.status === 204) {
        const data = response.data;
        console.log(data, "<< data");
        configureToast("success", "Create Success", "New employee has been created");
        return dispatch(employeeCreateSuccess(data));
      } else if (response.status === 511) {
        console.log(response.status, "status");
        const navigate = useNavigate();
        navigate("/login");
      } else {
        console.log("Error bro:", response.status, response.statusText);
        throw new Error("Request failed");
      }
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function updateEmployee(input) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`${BASE_URL}/dashboard/employee`, input);

      console.log(response.status, "statusnya");
      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Updated Success", "Employee has been updated");
      return dispatch(employeeUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function fetchCandidate(input) {
  return async (dispatch) => {
    try {
      // console.log("input", input);
      const response = await axiosInstance.post(`${BASE_URL}/dashboard/employee/status`, input);

      console.log(response.status, "statusnya");
      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(candidateFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}
export function fetchFee(input) {
  return async (dispatch) => {
    try {
      // console.log("input", input);
      const response = await axiosInstance.post(`${BASE_URL}/dashboard/fee`, input);

      console.log(response.status, "statusnya");
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
      const response = await axiosInstance.get(`${BASE_URL}/dashboard/fee?transactionNo=${transactionNo}`);

      console.log(response.status, "statusnya");
      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(feeDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function fetchRole(input) {
  return async (dispatch) => {
    try {
      // console.log("user data employee", input);
      const unixTimes = unixTimestampInSeconds();

      const response = await axios.post(`${BASE_URL}/dashboard/employee/status`, input, {
        headers: {
          "X-Access-Key": localStorage.tokenDashboard,
          "X-Time": unixTimes,
        },
      });
      const data = response.data.data;
      // console.log("Response data:", data.data);
      if (response.status === 200) {
        console.log("Success");
        return dispatch(employeeFetchSuccess(data));
      } else {
        console.log("Error bro:", response.status, response.statusText);
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Request Failed: ", error.message);
      throw error;
    }
  };
}
export function fetchUser(input) {
  return async (dispatch) => {
    try {
      // console.log("input", input);
      const response = await axiosInstance.post(`${BASE_URL}/dashboard/users/paging`, input);

      console.log(response.status, "statusnya");
      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(userFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function fetchDetailUser(id) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/dashboard/users/${id}`);

      console.log(response.status, "statusnya");
      const data = response.data.data;
      console.log(data, "<< data");
      return dispatch(userDetailSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function createUser(input) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}/dashboard/users`, input);

      console.log(response.status, "statusnya");
      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Create Success", "New user has been created");
      return dispatch(userCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export function updateUser(input) {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.put(`${BASE_URL}/dashboard/users`, input);

      console.log(response.status, "statusnya");
      const data = response.data;
      console.log(data, "<< data");
      configureToast("success", "Updated Success", "User has been updated");
      return dispatch(userUpdateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("warning", "", msgError);
      throw error;
    }
  };
}

export default thunk;
