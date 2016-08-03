import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/Dialog';
import LoginForm from './login-form';

class LoginModal extends Component {

  static propTypes = {
    open: PropTypes.bool,
    isPending: PropTypes.bool,
    hasError: PropTypes.bool,
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { open, isPending, hasError, onSubmit } = this.props;

    const isModal = true;

    return (
      <Dialog
        testid="login-form"
        modal={ isModal }
        open={ open }
        >
        <h1 data-testid="login-header" className="mt0">Login</h1>

        <LoginForm
          isPending={ isPending }
          hasError={ hasError }
          onSubmit={ onSubmit } />
      </Dialog>
    );
  }
}

export default LoginModal;
