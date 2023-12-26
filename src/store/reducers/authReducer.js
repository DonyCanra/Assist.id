import { LOGIN_SUCCESS } from "../actions/thunks";

const inisialState = {
  auth: [],
};

function authReducer(state = inisialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload,
      };

    default:
      return state;
  }
}

export default authReducer;
