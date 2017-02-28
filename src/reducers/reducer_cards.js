import { FETCH_CARDS } from "../actions/index";

const INITIAL_STATE = { foundCards: [] };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CARDS:
      return {foundCards: action.payload.data, ...state};
    default:
    return state;
  }
}
