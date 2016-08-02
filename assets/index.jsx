import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootSaga from './sagas';
import App from './components/App';
import About from './components/About';
import NotFound from './components/NotFound';
import Home from './containers/Home';
import todos from './reducers/todos';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();

const store = createStore(
  combineReducers({
    todos,
    routing: routerReducer
  }),
  {},
  applyMiddleware(sagaMiddleware, loggerMiddleware)
);
sagaMiddleware.run(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} >
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
