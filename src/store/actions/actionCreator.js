import {
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_DELETE_SUCCESS,
  PROVINCE_FETCH_SUCCESS,
  REGENCY_FETCH_SUCCESS,
  DISTRICT_FETCH_SUCCESS,
  VILLAGE_FETCH_SUCCESS,
  EMPLOYEE_FETCH_DETAIL_SUCCESS
} from "./actionTypes";

// Action Creator Employee
export const employeeFetchSuccess = (data) => {
  return {
    type: EMPLOYEE_FETCH_SUCCESS,
    payload: data,
  };
};

export const detailEmployeeSuccess = (data) => {
  return {
    type: EMPLOYEE_FETCH_DETAIL_SUCCESS,
    payload: data,
  };
};

export const employeeCreateSuccess = (data) => {
  return {
    type: EMPLOYEE_CREATE_SUCCESS,
    payload: data,
  };
};

export const employeeUpdateSuccess = (data) => {
  return {
    type: EMPLOYEE_UPDATE_SUCCESS,
    payload: data,
  };
};

export const employeeDeleteSuccess = (data) => {
  return {
    type: EMPLOYEE_DELETE_SUCCESS,
    payload: data,
  };
};

export const provinceFetchSuccess = (data) => {
  return {
    type: PROVINCE_FETCH_SUCCESS,
    payload: data,
  };
};
export const regencyFetchSuccess = (data) => {
  return {
    type: REGENCY_FETCH_SUCCESS,
    payload: data,
  };
};
export const districtFetchSuccess = (data) => {
  return {
    type: DISTRICT_FETCH_SUCCESS,
    payload: data,
  };
};
export const villageFetchSuccess = (data) => {
  return {
    type: VILLAGE_FETCH_SUCCESS,
    payload: data,
  };
};
