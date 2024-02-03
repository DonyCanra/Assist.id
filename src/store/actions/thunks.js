import {
  employeeCreateSuccess,
  employeeFetchSuccess,
  provinceFetchSuccess,
  districtFetchSuccess,
  regencyFetchSuccess,
  villageFetchSuccess,
  employeeDeleteSuccess,
  detailEmployeeSuccess
} from "./actionCreator";

import { thunk } from "redux-thunk";
// import { redirect } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

// URL SERVER
const BASE_URL_EMPLOYEE = process.env.REACT_APP_EMPLOYEE;
const BASE_URL_EMSIFA = process.env.REACT_APP_EMSIFA;

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

export function fetchEmployee() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL_EMPLOYEE}`);

      const data = response.data;

      return dispatch(employeeFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function fetchDetailEmployee(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL_EMPLOYEE}/${id}`);

      const data = response.data;

      return dispatch(detailEmployeeSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function createEmployee(input) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL_EMPLOYEE}`, input);

      const data = response.data;
      configureToast("success", "SUCCESS", "New employee has been created");
      return dispatch(employeeCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function updateEmployee(input, id) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${BASE_URL_EMPLOYEE}/${id}`, input);

      const data = response.data;
      configureToast("success", "SUCCESS", "Employee has been updated");
      return dispatch(employeeCreateSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function deleteEmployee(id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${BASE_URL_EMPLOYEE}/${id}`,);

      const data = response.data;
      configureToast("success", "SUCCESS", "Employee has been deleted");
      window.location.reload();
      return dispatch(employeeDeleteSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function fetchProvince() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL_EMSIFA}/provinces.json`);

      const data = response.data;

      console.log(data, "province");

      return dispatch(provinceFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function fetchRegency(provinceId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL_EMSIFA}/regencies/${provinceId}.json`);
      
      const data = response.data;
      
      console.log(data, "regency");
      
      return dispatch(regencyFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function fetchDistrict(regencyId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL_EMSIFA}/districts/${regencyId}.json`);
      
      const data = response.data;
      
      console.log(data, "district");
      
      return dispatch(districtFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export function fetchVillage(districtId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL_EMSIFA}/villages/${districtId}.json`);

      const data = response.data;

      console.log(data, "village");

      return dispatch(villageFetchSuccess(data));
    } catch (error) {
      const msgError = error.response.data.error.messageData;
      configureToast("error", "FAILED", msgError);
    }
  };
}

export default thunk;
