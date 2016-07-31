const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        action.todo,
        ...state
      ]
    case 'SET_TODOS':
      return action.todos
    case 'UPDATE_TODO':
      return state.map(todo => {
        if (action.id === todo.id) {
          return Object.assign({}, todo, action.params)
        }
        return todo
      })
    default:
      return state
  }
}

export default todos