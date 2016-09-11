import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

class TodoForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      text: '',
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.linkState = this.linkState.bind(this);
  }

  getValidationState(key) {
    const { text } = this.state;
    switch (key) {
      case 'text':
        if (text.trim().length === 0) {
          return 'error';
        }
        return null;
      default:
        return null;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props
      .onSubmit(this.state)
      .then(() => this.setState({ text: '', error: null }))
      .catch((err) => this.setState({ error: err.message }));
  }

  linkState(key) {
    return (e) => {
      this.setState({ [key]: e.target.value });
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup validationState={this.getValidationState('text')}>
          <ControlLabel>Create Todo</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter text"
            value={this.state.text}
            onChange={this.linkState('text')}
          />
          <FormControl.Feedback />
          <HelpBlock>{this.state.error}</HelpBlock>
        </FormGroup>
      </form>
    );
  }
}

export default TodoForm;
