import { PROVINCE_FETCH_SUCCESS } from "../actions/actionTypes";

const initialState = { province: [] };

function provinceReducer(state = initialState, action) {
  switch (action.type) {
    case PROVINCE_FETCH_SUCCESS:
      return {
        ...state,
        province: action.payload,
      };

    default:
      return state;
  }
}

export default provinceReducer;
