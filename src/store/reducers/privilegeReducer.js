import { PRIVILEGE_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { privilege: [] };

function privilegeReducer(state = inisialState, action) {
  switch (action.type) {
    case PRIVILEGE_FETCH_SUCCESS:
      return {
        ...state,
        privilege: action.payload,
      };

    default:
      return state;
  }
}

export default privilegeReducer;
