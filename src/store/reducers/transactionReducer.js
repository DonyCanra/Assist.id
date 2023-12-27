import { TRANSACTION_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { transaction: [] };

function transactionReducer(state = inisialState, action) {
  switch (action.type) {
    case TRANSACTION_FETCH_SUCCESS:
      return {
        ...state,
        transaction: action.payload,
      };

    default:
      return state;
  }
}

export default transactionReducer;
