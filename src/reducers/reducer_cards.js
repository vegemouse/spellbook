import { FETCH_CARDS } from "../actions/index";

const INITIAL_STATE = { foundCards: [], selectedCard: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CARDS:
      return {...state, foundCards: action.payload};
      break;
    default:
    return state;
  }
}
