import { DASHBOARD_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { dashboard: [] };

function dashboardReducer(state = inisialState, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
      };

    default:
      return state;
  }
}

export default dashboardReducer;
