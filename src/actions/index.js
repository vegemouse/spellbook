import axios from 'axios';
import Firebase from 'firebase';

export const FETCH_CARDS = "FETCH_CARDS";
export const FETCH_DECKS = "FETCH_DECKS";
export const SELECT_CARD = "SELECT_CARD";
export const FETCH_DECK = "FETCH_DECK";

const ROOT_URL = "https://api.magicthegathering.io/v1/cards";
const Decks = new Firebase('https://spellbook-2cd44.firebaseio.com/');

export function fetchCards(inputtedCard) {
  const request = axios.get(`${ROOT_URL}?name=${inputtedCard}`);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({ type: FETCH_CARDS, payload: data.cards})
    });
  }
}

export function fetchDecks() {
  return dispatch => {
    Decks.child('decks').on('value', snapshot => {
      dispatch({
        type: FETCH_DECKS,
        payload: snapshot.val()
      });
    });
  };
}

export function createDeck(deck) {
  return dispatch => Decks.child('decks').push(deck);
}

export function selectCard(card) {
  return {
    type: SELECT_CARD,
    payload: card
  }
}

export function fetchDeck(id) {
  return dispatch => {
    Decks.child('decks').child(id).on('value', snapshot => {
      dispatch({
        type: FETCH_DECK,
        payload: snapshot.val()
      });
    });
  };
}
