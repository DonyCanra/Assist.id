import { REGENCY_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = { regency: [] };

function regencyReducer(state = initialState, action) {
  switch (action.type) {
    case REGENCY_FETCH_SUCCESS:
      return {
        ...state,
        regency: action.payload,
      };

    default:
      return state;
  }
}

export default regencyReducer;
