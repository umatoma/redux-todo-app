import * as api from '../lib/api';

export function addTodo(todo) {
  return { type: 'ADD_TODO', todo };
}

export function updateTodo(id, params) {
  return { type: 'UPDATE_TODO', id, params };
}

export function setTodos(todos) {
  return { type: 'SET_TODOS', todos };
}

export function fetchTodos() {
  return { type: 'FETCH_TODOS' };
}

export function requestAddTodo(text) {
  return { type: 'REQUEST_ADD_TODO', text };
}

export function requestUpdateTodo(id, params) {
  return { type: 'REQUEST_UPDATE_TODO', id, params };
}

export function fetchAuthUser() {
  return { type: 'FETCH_AUTH_USER' };
}

export function setAuthUser(user) {
  return { type: 'SET_AUTH_USER', user };
}

export function requestFetchCurrentUser() {
  return (dispatch, getState) => {
    const { auth } = getState();
    if (auth.isLoading) {
      return Promise.resolve();
    }
    dispatch(fetchAuthUser());
    return api.getCurrentUser()
      .then((user) => dispatch(setAuthUser(user)))
      .catch(() => dispatch(setAuthUser({})));
  };
}
