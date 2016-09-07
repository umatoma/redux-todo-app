import React, { PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

class TodoForm extends React.Component {
  static validate(values) {
    const errors = {};
    if (!values.text || values.text.trim().length === 0) {
      errors.text = 'Invalid Text';
    }

    return errors;
  }

  static renderField({ input, meta: { touched, error } }) {
    return (
      <FormGroup validationState={touched && error && 'error'}>
        <ControlLabel>Create Todo</ControlLabel>
        <FormControl {...input} />
        <FormControl.Feedback />
        <HelpBlock>{touched ? error : null}</HelpBlock>
      </FormGroup>
    );
  }

  constructor(props) {
    super(props);
    this.state = { text: '' };
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(value) {
    const text = value.text.trim();
    if (text) {
      this.props.requestAddTodo(text);
    }
  }

  onChange(value) {
    console.log('onChange', value);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="text"
          type="text"
          placeholder="Enter text"
          component={TodoForm.renderField}
        />
      </form>
    );
  }
}

TodoForm.propTypes = {
  requestAddTodo: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'todoForm',
  validate: TodoForm.validate
})(TodoForm);
