import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import rootSaga from './sagas';
import App from './components/App.jsx';
import About from './components/About';
import NotFound from './components/NotFound';
import Home from './containers/Home';
import authReducer from './reducers/auth';
import todosReducer from './reducers/todos';
import * as actions from './actions';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
const store = createStore(
  combineReducers({
    auth: authReducer,
    todos: todosReducer,
    routing: routerReducer
  }),
  {},
  applyMiddleware(thunkMiddleware, sagaMiddleware, loggerMiddleware)
);
sagaMiddleware.run(rootSaga);

const history = syncHistoryWithStore(browserHistory, store);
store.dispatch(actions.requestFetchCurrentUser());

render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="about" component={About} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
