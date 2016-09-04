import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import App from './components/App.jsx';
import About from './components/About';
import NotFound from './components/NotFound';
import Home from './containers/Home';
import authReducer from './reducers/auth';
import todosReducer from './reducers/todos';
import * as actions from './actions';
import AuthWrapper from './lib/auth-wrapper.jsx';

const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'production') {
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

const store = createStore(
  combineReducers({
    auth: authReducer,
    todos: todosReducer,
    routing: routerReducer
  }),
  {},
  applyMiddleware(middlewares)
);

const history = syncHistoryWithStore(browserHistory, store);
store.dispatch(actions.requestFetchCurrentUser());

const authWrapper = new AuthWrapper({
  redirectUrl: '/unauthorized',
  authStateSelector: (state) => state.auth
});
render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={authWrapper.wrapComponent(App)}>
        <Route path="/" component={Home} />
        <Route path="about" component={About} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
