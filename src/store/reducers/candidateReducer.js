import { CANDIDATE_FETCH_SUCCESS } from "../actions/actionTypes";

const inisialState = { candidates: [] };

function candidateReducer(state = inisialState, action) {
  switch (action.type) {
    case CANDIDATE_FETCH_SUCCESS:
      return {
        ...state,
        candidates: action.payload,
      };

    default:
      return state;
  }
}

export default candidateReducer;
