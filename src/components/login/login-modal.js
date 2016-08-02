import React, { Component, PropTypes } from 'react';

import { Modal, ModalContent } from '../modal';
import LoginForm from './login-form';

class LoginModal extends Component {

  static propTypes = {
    isVisible: PropTypes.bool,
    isPending: PropTypes.bool,
    hasError: PropTypes.bool,
    onSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible, isPending, hasError, onSubmit } = this.props;

    return (
      <Modal testid="login-form" isVisible={ isVisible }>
        <ModalContent>
          <h1 data-testid="login-header" className="mt0">Login</h1>

          <LoginForm
            isPending={ isPending }
            hasError={ hasError }
            onSubmit={ onSubmit } />
        </ModalContent>
      </Modal>
    );
  }
}

export default LoginModal;
