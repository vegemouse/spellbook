import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DeckList from './components/deck_list';
import NewDeck from './components/deck_new';
import DeckDetail from './components/deck_detail';
import Intro from './components/intro';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Intro} />
    <Route path="decks" component={DeckList} />
    <Route path="decks/new" component={NewDeck} />
    <Route path="decks/:id" component={DeckDetail} />
  </Route>
);
