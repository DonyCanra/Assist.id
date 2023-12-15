import { FEE_DETAIL_SUCCESS } from "../actions/actionTypes";

const inisialState = { fee: [] };

function detailFeeReducer(state = inisialState, action) {
  switch (action.type) {
    case FEE_DETAIL_SUCCESS:
      return {
        ...state,
        fee: action.payload,
      };

    default:
      return state;
  }
}

export default detailFeeReducer;
