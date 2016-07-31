import { expect } from 'chai'
import nock from 'nock'
import { put, call } from 'redux-saga/effects'
import * as sagas from '../../../assets/sagas'
import * as api from '../../../assets/lib/api'
import * as actions from '../../../assets/actions'

describe('sagas/index.js', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchTodos', () => {
    it('creates SET_TODOS when fetch todo list has been done', () => {
      const json = {
        todos: [
          { id: 1, text: 'Sample Todo 001', completed: false },
          { id: 2, text: 'Sample Todo 002', completed: true }
        ]
      }
      nock('http://localhost/')
        .get('/api/todos')
        .reply(200, json)

      const saga = sagas.fetchTodos()
      expect(saga.next().value).to.be.deep.equal(call(api.getTodos))
      expect(saga.next(json).value).to.be.deep.equal(put(actions.setTodos(json.todos)))
      expect(saga.next()).to.be.deep.equal({ done: true, value: undefined })
    })
  })
  // ---------- End of fetchTodos ---------- //

  describe('requestAddTodo', () => {
    it('creates ADD_TODO when post todo has been done', () => {
      const json = {
        todo: { id: 1, text: 'Sample Todo', completed: false }
      }
      nock('http://localhost/')
        .post('/api/todos/1')
        .reply(200, json)

      const saga = sagas.requestAddTodo({ type: 'REQUEST_ADD_TODO', text: 'Sample Todo' })
      expect(saga.next().value).to.be.deep.equal(call(api.addTodo, 'Sample Todo'))
      expect(saga.next(json).value).to.be.deep.equal(put(actions.addTodo(json.todo)))
      expect(saga.next()).to.be.deep.equal({ done: true, value: undefined })
    })
  })
  // ---------- End of requestAddTodo ---------- //

  describe('requestUpdateTodo', () => {
    it('creates UPDATE_TODO when put todo has been done', () => {
      const json = {
        todo: { id: 1, text: 'Sample Todo', completed: true }
      }
      nock('http://localhost/')
        .put('/api/todos/1')
        .reply(200, json)

      const saga = sagas.requestUpdateTodo({
        type: 'REQUEST_UPDATE_TODO',
        id: 1,
        params: { completed: true }
      })
      expect(saga.next().value).to.be.deep.equal(call(api.updateTodo, 1, { completed: true }))
      expect(saga.next(json).value).to.be.deep.equal(put(actions.updateTodo(1, json.todo)))
      expect(saga.next()).to.be.deep.equal({ done: true, value: undefined })
    })
  })
  // ---------- End of requestUpdateTodo ---------- //
})