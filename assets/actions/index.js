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

export function fetchAuthUser() {
  return { type: 'FETCH_AUTH_USER' };
}

export function setAuthUser(user) {
  return { type: 'SET_AUTH_USER', user };
}

export function requestFetchTodos() {
  return (dispatch) => api.getTodos()
    .then((json) => dispatch(setTodos(json.todos)));
}

export function requestAddTodo(text) {
  return (dispatch) => api.addTodo(text)
    .then((json) => dispatch(addTodo(json.todo)));
}

export function requestUpdateTodo(id, params) {
  return (dispatch) => api.updateTodo(id, params)
    .then((json) => dispatch(updateTodo(id, json.todo)));
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
