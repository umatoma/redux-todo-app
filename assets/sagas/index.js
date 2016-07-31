import { takeEvery } from 'redux-saga'
import { put, call, fork } from 'redux-saga/effects'
import * as actions from '../actions'
import * as api from '../lib/api'

export function* fetchTodos() {
  try {
    const json = yield call(api.getTodos)
    yield put(actions.setTodos(json.todos))
  } catch(e) {
    console.log(e)
  }
}

export function* requestAddTodo(action) {
  try {
    const json = yield call(api.addTodo, action.text)
    yield put(actions.addTodo(json.todo))
  } catch(e) {
    console.log(e)
  }
}

export function* requestUpdateTodo(action) {
  try {
    const { id, params } = action
    const json = yield call(api.updateTodo, id, params)
    yield put(actions.updateTodo(id, json.todo))
  } catch(e) {
    console.log(e)
  }
}

export default function* rootSaga() {
  yield fork(takeEvery, 'FETCH_TODOS', fetchTodos)
  yield fork(takeEvery, 'REQUEST_ADD_TODO', requestAddTodo)
  yield fork(takeEvery, 'REQUEST_UPDATE_TODO', requestUpdateTodo)
}