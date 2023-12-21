import {
  USER_LOGIN_SUCCESSS,
  USER_RESEND_CREATE_SUCCESSS,
  USER_RESEND_FORGOT_SUCCESSS,
  USER_CREATE_PASSWORD_SUCCESSS,
  DASHBOARD_FETCH_SUCCESS,
  PROFILE_FETCH_SUCCESS,
  LOGACTIVITY_FETCH_SUCCESS,
  IMAGE_CONVERT_SUCCESS,
  PROFILE_UPDATE_SUCCESS,
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_DETAIL_SUCCESS,
  EMPLOYEE_UPDATE_SUCCESS,
  CANDIDATE_FETCH_SUCCESS,
  CANDIDATE_APPROVED_SUCCESS,
  FEE_FETCH_SUCCESS,
  FEE_DETAIL_SUCCESS,
  ROLE_FETCH_SUCCESS,
  USER_FETCH_SUCCESS,
  USER_DETAIL_SUCCESS,
  USER_CREATE_SUCCESS,
  USER_UPDATE_SUCCESS,
  EMPLOYEE_BULK_CREATE_SUCCESS,
  USER_CHANGE_PASSWORD_SUCCESSS,
} from "./actionTypes";

// Action Creator Auth
export const usersLoginSuccess = (data) => {
  return {
    type: USER_LOGIN_SUCCESSS,
    payload: data,
  };
};

export const usersResendCreatePasswordSuccess = (data) => {
  return {
    type: USER_RESEND_CREATE_SUCCESSS,
    payload: data,
  };
};

export const usersResendForgotPasswordSuccess = (data) => {
  return {
    type: USER_RESEND_FORGOT_SUCCESSS,
    payload: data,
  };
};

export const usersCreatePasswordSuccess = (data) => {
  return {
    type: USER_CREATE_PASSWORD_SUCCESSS,
    payload: data,
  };
};

export const usersChangePasswordSuccess = (data) => {
  return {
    type: USER_CHANGE_PASSWORD_SUCCESSS,
    payload: data,
  };
};

// Action Creator Dashboard
export const dashboardFetchSuccess = (data) => {
  return {
    type: DASHBOARD_FETCH_SUCCESS,
    payload: data,
  };
};

export const profileFetchSuccess = (data) => {
  return {
    type: PROFILE_FETCH_SUCCESS,
    payload: data,
  };
};

export const logactivityFetchSuccess = (data) => {
  return {
    type: LOGACTIVITY_FETCH_SUCCESS,
    payload: data,
  };
};

export const imagesConvertSuccess = (data) => {
  return {
    type: IMAGE_CONVERT_SUCCESS,
    payload: data,
  };
};

export const profileUpdateSuccess = (data) => {
  return {
    type: PROFILE_UPDATE_SUCCESS,
    payload: data,
  };
};

// Action Creator Employee
export const employeeFetchSuccess = (data) => {
  return {
    type: EMPLOYEE_FETCH_SUCCESS,
    payload: data,
  };
};

export const employeeCreateSuccess = (data) => {
  return {
    type: EMPLOYEE_CREATE_SUCCESS,
    payload: data,
  };
};

export const employeeBulkCreateSuccess = (data) => {
  return {
    type: EMPLOYEE_BULK_CREATE_SUCCESS,
    payload: data,
  };
};

export const employeeDetailSuccess = (data) => {
  return {
    type: EMPLOYEE_DETAIL_SUCCESS,
    payload: data,
  };
};

export const employeeUpdateSuccess = (data) => {
  return {
    type: EMPLOYEE_UPDATE_SUCCESS,
    payload: data,
  };
};

export const candidateFetchSuccess = (data) => {
  return {
    type: CANDIDATE_FETCH_SUCCESS,
    payload: data,
  };
};

export const candidateApproveSuccess = (data) => {
  return {
    type: CANDIDATE_APPROVED_SUCCESS,
    payload: data,
  };
};

// Action Creator Fee
export const feeFetchSuccess = (data) => {
  return {
    type: FEE_FETCH_SUCCESS,
    payload: data,
  };
};

export const feeDetailSuccess = (data) => {
  return {
    type: FEE_DETAIL_SUCCESS,
    payload: data,
  };
};

// Action Creator Setting
export const roleFetchSuccess = (data) => {
  return {
    type: ROLE_FETCH_SUCCESS,
    payload: data,
  };
};
export const userFetchSuccess = (data) => {
  return {
    type: USER_FETCH_SUCCESS,
    payload: data,
  };
};
export const userDetailSuccess = (data) => {
  return {
    type: USER_DETAIL_SUCCESS,
    payload: data,
  };
};
export const userCreateSuccess = (data) => {
  return {
    type: USER_CREATE_SUCCESS,
    payload: data,
  };
};
export const userUpdateSuccess = (data) => {
  return {
    type: USER_UPDATE_SUCCESS,
    payload: data,
  };
};
