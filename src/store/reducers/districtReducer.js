import { DISTRICT_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = { district: [] };

function districtReducer(state = initialState, action) {
  switch (action.type) {
    case DISTRICT_FETCH_SUCCESS:
      return {
        ...state,
        district: action.payload,
      };

    default:
      return state;
  }
}

export default districtReducer;
