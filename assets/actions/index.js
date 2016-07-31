export function addTodo(todo) {
  return { type: 'ADD_TODO', todo }
}

export function updateTodo(id, params) {
  return { type: 'UPDATE_TODO', id, params }
}

export function setTodos(todos) {
  return { type: 'SET_TODOS', todos }
}

export function fetchTodos() {
  return { type: 'FETCH_TODOS' }
}

export function requestAddTodo(text) {
  return { type: 'REQUEST_ADD_TODO', text }
}

export function requestUpdateTodo(id, params) {
  return { type: 'REQUEST_UPDATE_TODO', id, params }
}