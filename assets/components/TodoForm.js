import React, { PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

class TodoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  handleSubmit(e) {
    e.preventDefault()
    let text = this.state.text.trim()
    if (text) {
      this.props.requestAddTodo(text)
      this.setState({ text: '' })
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value })
  }

  getValidateState() {
    const length = this.state.text.trim().length;
    if (length > 0) {
      return 'success'
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <FormGroup validationState={this.getValidateState()}>
          <ControlLabel>Create Todo</ControlLabel>
          <FormControl
            type="text"
            value={this.state.text}
            placeholder="Enter text"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    )
  }
}

TodoForm.propTypes = {
  requestAddTodo: PropTypes.func.isRequired
}

export default TodoForm