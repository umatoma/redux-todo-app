import { expect } from 'chai'
import reducer from '../../../assets/reducers/todos'

describe('reducers/todos.js', () => {
  it('should return the initial state', () => {
    const state = reducer(undefined, {})
    expect(state).to.be.instanceof(Array)
    expect(state).to.be.empty
  })

  it('should handle ADD_TODO action', () => {
    const state = reducer([], {
      type: 'ADD_TODO',
      todo: { id: 1, text: 'Sample Todo', completed: false }
    })
    expect(state).to.be.deep.equal([
      { id: 1, text: 'Sample Todo', completed: false }
    ])
  })

  it('should handle SET_TODOS action', () => {
    const state = reducer([], {
      type: 'SET_TODOS',
      todos: [
        { id: 1, text: 'Sample Todo 001', completed: false },
        { id: 2, text: 'Sample Todo 002', completed: true }
      ]
    })
    expect(state).to.be.deep.equal([
      { id: 1, text: 'Sample Todo 001', completed: false },
      { id: 2, text: 'Sample Todo 002', completed: true }
    ])
  })

  it('should handle UPDATE_TODO action', () => {
    const initialState = [
      { id: 1, text: 'Sample Todo 001', completed: false },
      { id: 2, text: 'Sample Todo 002', completed: true }
    ]
    const state = reducer(initialState, {
      type: 'UPDATE_TODO',
      id: 2,
      params: { text: 'Sample Todo 002 ex', completed: false }
    })
    expect(state).to.be.deep.equal([
      { id: 1, text: 'Sample Todo 001', completed: false },
      { id: 2, text: 'Sample Todo 002 ex', completed: false }
    ])
  })
})