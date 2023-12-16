import { LOGACTIVITY_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { logactivity: [] };

function logactivityReducer(state = inisialState, action) {
  switch (action.type) {
    case LOGACTIVITY_FETCH_SUCCESS:
      return {
        ...state,
        logactivity: action.payload,
      };

    default:
      return state;
  }
}

export default logactivityReducer;
