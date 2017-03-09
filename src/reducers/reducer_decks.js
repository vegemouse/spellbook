import { FETCH_DECKS, FETCH_DECK } from "../actions/index";

const INITIAL_STATE = {decks: {}, deck: null};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_DECKS:
      return {...state, decks: action.payload};
      break;
    case FETCH_DECK:
      return {...state, deck: action.payload};
      break;
    default:
    return state;
  }
}
