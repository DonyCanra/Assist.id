import { IMAGE_CONVERT_SUCCESS } from "../actions/actionTypes";

const inisialState = { image: [] };

function imagesReducer(state = inisialState, action) {
  switch (action.type) {
    case IMAGE_CONVERT_SUCCESS:
      return {
        ...state,
        image: action.payload,
      };

    default:
      return state;
  }
}

export default imagesReducer;
