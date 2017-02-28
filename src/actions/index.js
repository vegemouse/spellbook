import axios from 'axios';

export const FETCH_CARDS = "FETCH_CARDS";

const ROOT_URL = "https://api.magicthegathering.io/v1/cards";

export function fetchCards() {
  const request = axios.get(`${ROOT_URL}?name=nissa`);

  return (dispatch) => {
    request.then(({data}) => {
      console.log(data.cards);
      dispatch({ type: FETCH_CARDS, payload: data.cards})
    });
  }
}
