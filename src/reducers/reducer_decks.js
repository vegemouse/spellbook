import { FETCH_DECKS } from "../actions/index";

const INITIAL_STATE = {decks: {}};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_DECKS:
      return {...state, decks: action.payload};
      break;
    default:
    return state;
  }
}
