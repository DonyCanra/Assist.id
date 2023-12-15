import { USER_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { users: [] };

function userReducer(state = inisialState, action) {
  switch (action.type) {
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
