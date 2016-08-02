import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

import Form from '../form';
import FormGroup from '../form/group';
import FormLabel from '../form/label';
import FormError from '../form/error';
import Input from '../form/input';
import Button from '../button';
import Alert from '../alert';

class LoginForm extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    isPending: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    fields: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { handleSubmit, resetForm, isPending, hasError, fields: { username, password } } = this.props;

    return (
      <Form handleSubmit={ handleSubmit }>
        <Alert data-testid="alert-loading" isVisible={ isPending }>Loading...</Alert>
        <Alert data-testid="alert-error" id="qa-alert" isVisible={ hasError } status="error">Invalid username and password</Alert>

        <FormGroup testid="login-username">
          <FormLabel id="qa-uname-label">Username</FormLabel>
          <Input type="text" fieldDefinition={ username } id="qa-uname-input"/>
          <FormError id="qa-uname-validation" isVisible={ !!(username.touched && username.error) }>
            { username.error }
          </FormError>
        </FormGroup>

        <FormGroup testid="login-password">
          <FormLabel id="qa-password-label">Password</FormLabel>
          <Input type="password" fieldDefinition={ password } id="qa-password-input" />
          <FormError id="qa-password-validation" isVisible={ !!(password.touched && password.error) }>
            { password.error }
          </FormError>
        </FormGroup>

        <FormGroup testid="login-submit">
          <Button type="submit" className="mr1" id="qa-login-button">
            Login
          </Button>
          <Button onClick={ resetForm } type="reset" className="bg-red" id="qa-clear-button">
            Clear
          </Button>
        </FormGroup>
      </Form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Username is required.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  }

  return errors;
};

export default reduxForm({
  form: 'login',
  fields: [
    'username',
    'password',
  ],
  validate,
})(LoginForm);
