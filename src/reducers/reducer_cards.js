import { FETCH_CARDS } from "../actions/index";

const INITIAL_STATE = { };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CARDS:
      return {foundCards: action.payload, ...state};
    default:
    return state;
  }
}
