import React, { PropTypes } from 'react'
import { Table, Badge } from 'react-bootstrap'

class TodoListInfo extends React.Component {
  render() {
    const { todos } = this.props
    const completedCount = todos.filter(todo => todo.completed).length
    const doingCount = todos.filter(todo => !todo.completed).length
    return (
      <Table responsive>
        <tbody>
          <tr>
            <th>Doing</th>
            <td>
              <Badge style={{ backgroundColor: '#ed6c63' }}>{doingCount}</Badge>
            </td>
          </tr>
          <tr>
            <th>Completed</th>
            <td>
              <Badge style={{ backgroundColor: '#1fc8db' }}>{completedCount}</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

TodoListInfo.propTypes = {
  todos: PropTypes.array.isRequired
}

export default TodoListInfo