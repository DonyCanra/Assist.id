import { FEE_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { fees: [] };

function feeReducer(state = inisialState, action) {
  switch (action.type) {
    case FEE_FETCH_SUCCESS:
      return {
        ...state,
        fees: action.payload,
      };

    default:
      return state;
  }
}

export default feeReducer;
