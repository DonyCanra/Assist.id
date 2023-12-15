import { EMPLOYEE_DETAIL_SUCCESS } from "../actions/actionTypes";

const inisialState = { employee: [] };

function detailEmployeeReducer(state = inisialState, action) {
  switch (action.type) {
    case EMPLOYEE_DETAIL_SUCCESS:
      return {
        ...state,
        employee: action.payload,
      };

    default:
      return state;
  }
}

export default detailEmployeeReducer;
