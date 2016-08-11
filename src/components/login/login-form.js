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

  render() {
    const { error, reset, submitting, onSubmit } = this.props;

    return (
      <form onSubmit={ onSubmit }>

        { submitting ? <CircularProgress size={ 1 }/> : [] }
        <Alert isVisible={ !!error } status="error">Invalid employeeId and pin</Alert>


        <Field name="employeeId" type="text" component={ this.renderField } label="Employee Id"/>
        <Field name="pin" type="password" component={ this.renderField } label="Pin"/>

        <div className="right">
          <RaisedButton
            label="Clear"
            onTouchTap={ reset }
            className="mr2"
            disabled={ submitting }
          />
          <RaisedButton
            label="Login"
            primary={ true }
            type="submit"
            disabled={ submitting }
          />
        </div>
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
