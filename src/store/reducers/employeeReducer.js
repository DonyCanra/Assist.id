import { EMPLOYEE_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { employees: [] };

function employeeReducer(state = inisialState, action) {
  switch (action.type) {
    case EMPLOYEE_FETCH_SUCCESS:
      return {
        ...state,
        employees: action.payload,
      };

    default:
      return state;
  }
}

export default employeeReducer;
