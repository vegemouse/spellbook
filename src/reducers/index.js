import { combineReducers } from 'redux';
import  CardsReducer  from './reducer_cards';
import  DecksReducer  from './reducer_decks';

const rootReducer = combineReducers({
  cards: CardsReducer,
  decks: DecksReducer
});

export default rootReducer;
