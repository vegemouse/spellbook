import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { useScroll } from 'react-router-scroll';

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  promise,
  thunk,
  logger
)(createStore);


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router
    history={browserHistory}
    routes={routes}
    render={applyRouterMiddleware(useScroll())}
    />
  </Provider>
  , document.querySelector('.container'));
