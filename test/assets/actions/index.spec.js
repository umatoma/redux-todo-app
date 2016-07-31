import { expect } from 'chai'
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../../assets/actions'

const mockStore = configureMockStore([
  thunk
])

describe('actions/index.js', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('addTodo', () => {
    it('should create an action to add a todo', () => {
      const todo = {
        id: 1,
        text: 'Sample Todo',
        completed: false
      }
      const expectedAction = {
        type: 'ADD_TODO',
        todo
      }
      expect(actions.addTodo(todo)).to.be.deep.equal(expectedAction)
    })
  })

  describe('updateTodo', () => {
    it('should create an action to update a todo', () => {
      const id = 1
      const params = {
        text: 'Sample Todo',
        completed: false
      }
      const expectedAction = {
        type: 'UPDATE_TODO',
        id,
        params
      }
      expect(actions.updateTodo(id, params)).to.be.deep.equal(expectedAction)
    })
  })

  describe('setTodos', () => {
    it('should create an action to set todo list', () => {
      const todos = [
        { id: 1, text: 'Sample Todo 001', completed: false },
        { id: 2, text: 'Sample Todo 002', completed: true }
      ]
      const expectedAction = {
        type: 'SET_TODOS',
        todos
      }
      expect(actions.setTodos(todos)).to.be.deep.equal(expectedAction)
    })
  })
})