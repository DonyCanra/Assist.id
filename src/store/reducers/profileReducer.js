import { PROFILE_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { profile: [] };

function profileReducer(state = inisialState, action) {
  switch (action.type) {
    case PROFILE_FETCH_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };

    default:
      return state;
  }
}

export default profileReducer;
