import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap'
import TodoForm from '../components/TodoForm'
import TodoListInfo from '../components/TodoListInfo'
import TodoList from '../components/TodoList'
import * as actions from '../actions'

class Home extends React.Component {

  componentDidMount() {
    this.props.fetchTodos()
  }

  render() {
    let { requestAddTodo, requestUpdateTodo, todos } = this.props
    let jumbotronStyle = {
      backgroundColor: '#42afe3',
      backgroundImage: 'linear-gradient(141deg, #13bfdf 0%, #42afe3 71%, #53a1eb 100%)',
      color: 'white'
    }
    return (
      <div>
        <Jumbotron style={jumbotronStyle}>
          <div className="container">
            <h1>ToDo List</h1>
            <p>Redux Sample App</p>
          </div>
        </Jumbotron>
        <Grid>
          <TodoForm requestAddTodo={requestAddTodo} />
          <Row>
            <Col xs={4}>
              <TodoListInfo todos={todos} />
            </Col>
            <Col xs={8}>
              <TodoList todos={todos} requestUpdateTodo={requestUpdateTodo} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
  todos: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)