import { expect } from 'chai';
import thunkMiddleware from 'redux-thunk';
import nock from 'nock';
import configureStore from 'redux-mock-store';
import * as actions from '../../../assets/actions';

describe('actions/index.js', () => {
  const middlewares = [thunkMiddleware];
  const mockStore = configureStore(middlewares);

  afterEach(() => {
    nock.cleanAll();
  });

  describe('addTodo', () => {
    it('should create an action to add a todo', () => {
      const todo = {
        id: 1,
        text: 'Sample Todo',
        completed: false
      };
      const expectedAction = {
        type: 'ADD_TODO',
        todo
      };
      expect(actions.addTodo(todo)).to.be.deep.equal(expectedAction);
    });
  });

  describe('updateTodo', () => {
    it('should create an action to update a todo', () => {
      const id = 1;
      const params = {
        text: 'Sample Todo',
        completed: false
      };
      const expectedAction = {
        type: 'UPDATE_TODO',
        id,
        params
      };
      expect(actions.updateTodo(id, params)).to.be.deep.equal(expectedAction);
    });
  });

  describe('setTodos', () => {
    it('should create an action to set todo list', () => {
      const todos = [
        { id: 1, text: 'Sample Todo 001', completed: false },
        { id: 2, text: 'Sample Todo 002', completed: true }
      ];
      const expectedAction = {
        type: 'SET_TODOS',
        todos
      };
      expect(actions.setTodos(todos)).to.be.deep.equal(expectedAction);
    });
  });

  describe('requestFetchTodos', () => {
    it('should fetch todo list', () => {
      const json = {
        todos: [
          { id: 1, text: 'Sample Todo 001', completed: false },
          { id: 2, text: 'Sample Todo 002', completed: true }
        ]
      };
      nock('http://localhost/')
        .get('/api/todos')
        .reply(200, json);

      const store = mockStore({});
      return store.dispatch(actions.requestFetchTodos())
        .then(() => {
          expect(store.getActions()[0]).to.be.deep.equal({
            type: 'SET_TODOS',
            todos: json.todos
          });
        });
    });
  });

  describe('requestAddTodo', () => {
    it('should add a todo', () => {
      const json = {
        todo: { id: 1, text: 'Sample Todo', completed: false }
      };
      nock('http://localhost/')
        .post('/api/todos', {
          todo: { text: 'Sample Todo' }
        })
        .reply(200, json);

      const store = mockStore({});
      return store.dispatch(actions.requestAddTodo('Sample Todo'))
        .then(() => {
          expect(store.getActions()[0]).to.be.deep.equal({
            type: 'ADD_TODO',
            todo: json.todo
          });
        });
    });
  });

  describe('requestUpdateTodo', () => {
    it('should update todo', () => {
      const json = {
        todo: { id: 1, text: 'Sample Todo', completed: true }
      };
      nock('http://localhost/')
        .put('/api/todos/1', {
          todo: { completed: true }
        })
        .reply(200, json);

      const store = mockStore({});
      return store.dispatch(actions.requestUpdateTodo(1, { completed: true }))
        .then(() => {
          expect(store.getActions()[0]).to.be.deep.equal({
            type: 'UPDATE_TODO',
            id: 1,
            params: json.todo
          });
        });
    });
  });

  describe('requestFetchCurrentUser', () => {
    it('should fetch current user info', () => {
      const json = { id: 'user_a' };
      nock('http://localhost/')
        .get('/api/users/current')
        .reply(200, json);

      const store = mockStore({
        auth: { isLoading: false, user: {} }
      });
      return store.dispatch(actions.requestFetchCurrentUser())
        .then(() => {
          expect(store.getActions()[0]).to.be.deep.equal({
            type: 'FETCH_AUTH_USER'
          });
          expect(store.getActions()[1]).to.be.deep.equal({
            type: 'SET_AUTH_USER',
            user: json
          });
        });
    });

    it('should not fetch current user info if already requesting', () => {
      const store = mockStore({
        auth: { isLoading: true, user: {} }
      });
      return store.dispatch(actions.requestFetchCurrentUser())
        .then(() => {
          expect(store.getActions()).to.be.deep.equal([]);
        });
    });
  });
});
