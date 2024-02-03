import { EMPLOYEE_FETCH_DETAIL_SUCCESS } from "../actions/actionTypes";

const initialState = { employee: [] };

function detailEmployeeReducer(state = initialState, action) {
  switch (action.type) {
    case EMPLOYEE_FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        employee: action.payload,
      };

    default:
      return state;
  }
}

export default detailEmployeeReducer;
