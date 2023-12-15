import { ROLE_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { roles: [] };

function roleReducer(state = inisialState, action) {
  switch (action.type) {
    case ROLE_FETCH_SUCCESS:
      return {
        ...state,
        roles: action.payload,
      };

    default:
      return state;
  }
}

export default roleReducer;
