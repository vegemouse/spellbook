import { FETCH_CARDS, SELECT_CARD } from "../actions/index";

const INITIAL_STATE = { foundCards: [], selectedCard: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_CARDS:
      return {...state, foundCards: action.payload};
      break;
    case SELECT_CARD:
      return {...state, selectedCard: action.payload};
      break;
    default:
    return state;
  }
}
