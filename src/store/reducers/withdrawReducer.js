import { WITHDRAW_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { withdraw: [] };

function withdrawReducer(state = inisialState, action) {
  switch (action.type) {
    case WITHDRAW_FETCH_SUCCESS:
      return {
        ...state,
        withdraw: action.payload,
      };

    default:
      return state;
  }
}

export default withdrawReducer;
