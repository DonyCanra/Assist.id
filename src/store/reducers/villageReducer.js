import { VILLAGE_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = { village: [] };

function villageReducer(state = initialState, action) {
  switch (action.type) {
    case VILLAGE_FETCH_SUCCESS:
      return {
        ...state,
        village: action.payload,
      };

    default:
      return state;
  }
}

export default villageReducer;
