import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Jumbotron, Grid, Row, Col } from 'react-bootstrap';
import TodoForm from '../components/TodoForm';
import TodoListInfo from '../components/TodoListInfo';
import TodoList from '../components/TodoList';
import * as actions from '../actions';

class Home extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    requestFetchTodos: PropTypes.func.isRequired,
    requestAddTodo: PropTypes.func.isRequired,
    requestUpdateTodo: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.requestFetchTodos();
  }

  onAddFormSubmit(params) {
    const { text } = params;
    return this.props.requestAddTodo(text);
  }

  render() {
    const { requestUpdateTodo, todos } = this.props;
    const jumbotronStyle = {
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
          <TodoForm onSubmit={this.onAddFormSubmit} />
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
    );
  }
}

const mapStateToProps = (state) => ({ todos: state.todos });
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
