import { ROLE_DETAIL_SUCCESS } from "../actions/actionTypes";

const inisialState = { role: [] };

function detailRoleReducer(state = inisialState, action) {
  switch (action.type) {
    case ROLE_DETAIL_SUCCESS:
      return {
        ...state,
        role: action.payload,
      };

    default:
      return state;
  }
}

export default detailRoleReducer;
