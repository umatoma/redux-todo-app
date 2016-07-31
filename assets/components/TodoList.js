import React, { PropTypes } from 'react'
import { ListGroup, ListGroupItem, Button, Glyphicon, Panel } from 'react-bootstrap'

class TodoList extends React.Component {
  toggleCompleted(todo) {
    this.props.requestUpdateTodo(todo.id, { completed: !todo.completed })
  }

  render() {
    const { todos } = this.props
    const completedTodos = todos.filter(t => t.completed)
    const doingTodos = todos.filter(t => !t.completed)
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading" style={{ backgroundColor: '#ed6c63', color: 'white' }}>
            <strong>Doing</strong>
          </div>
          <ListGroup fill>
            {doingTodos.map(todo =>
              <ListGroupItem key={todo.id} onClick={this.toggleCompleted.bind(this, todo)}>
                {todo.text}
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading" style={{ backgroundColor: '#1fc8db', color: 'white' }}>
            <strong>Completed</strong>
          </div>
          <ListGroup fill>
            {completedTodos.map(todo =>
              <ListGroupItem key={todo.id} onClick={this.toggleCompleted.bind(this, todo)}>
                <span className="badge" style={{ backgroundColor: 'transparent', color: '#1fc8db' }}>
                  <Glyphicon glyph="ok" />
                </span>
                {todo.text}
              </ListGroupItem>
            )}
          </ListGroup>
        </div>
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  requestUpdateTodo: PropTypes.func.isRequired
}

export default TodoList