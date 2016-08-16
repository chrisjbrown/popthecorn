import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import Alert from 'app/components/alert';

class LoginForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    loginSubmit: PropTypes.func.isRequired,
    dataError: PropTypes.string,
    submitting: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  renderTextField({ input, label, meta: { error, touched }, ...custom }) {
    return (
      <TextField hintText={label}
        floatingLabelText={label}
        errorText={error && touched ? error : ''}
        {...input}
        {...custom}
      />
    );
  }

  renderForm() {
    const { reset, submitting } = this.props;

    return (
      <div>
        <Field name="employeeId" type="text" component={ this.renderTextField } label="Employee Id"/>
        <Field name="pin" type="password" component={ this.renderTextField } label="Pin"/>

        <div className="right">
          <RaisedButton
            backgroundColor="white"
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
    const { dataError, submitting, handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit }>

        <Alert isVisible={ !!dataError && !submitting } status="error">{ dataError }</Alert>

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
