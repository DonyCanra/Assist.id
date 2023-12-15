import { USER_DETAIL_SUCCESS } from "../actions/actionTypes";

const inisialState = { user: [] };

function detailUserReducer(state = inisialState, action) {
  switch (action.type) {
    case USER_DETAIL_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default detailUserReducer;
