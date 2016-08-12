import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import Alert from 'app/components/alert';

class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <div>
        <label>{label}</label>
        <div>
          <input className="input border" {...input} placeholder={label} type={type}/>
          {touched && error && <span className="red">{error}</span>}
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <Field name="employeeId" type="text" component={ this.renderField } label="Employee Id"/>
        <Field name="pin" type="password" component={ this.renderField } label="Pin"/>

        <div className="right">
          <RaisedButton
            label="Clear"
            onTouchTap={ this.props.reset }
            className="mr2"
            disabled={ this.props.submitting }
          />
          <RaisedButton
            label="Login"
            primary={ true }
            type="submit"
            disabled={ this.props.submitting }
          />
        </div>
      </div>
    );
  }

  renderLoader() {
    return (
      <div className="center">
        <CircularProgress size={ 1 }/>
      </div>
    );
  }

  render() {
    const { error, submitting, onSubmit } = this.props;

    return (
      <form onSubmit={ onSubmit }>

        <Alert isVisible={ !!error && !submitting } status="error">Invalid employeeId and pin</Alert>

        { submitting ? this.renderLoader() : this.renderForm() }

      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.employeeId) {
    errors.employeeId = 'EmployeeId is required.';
  }

  if (!values.pin) {
    errors.pin = 'Pin is required.';
  }

  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
  fields: ['employeeId', 'pin'],
})(LoginForm);
