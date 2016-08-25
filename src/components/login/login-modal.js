import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import LoginForm from './login-form';
import * as SessionActions from 'app/actions/session';

class LoginModal extends Component {

  static propTypes = {
    loginSubmit: PropTypes.func.isRequired,
    open: PropTypes.bool,
    dataError: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { open, dataError } = this.props;

    const isModal = true;

    return (
      <Dialog
        testid="login-form"
        modal={ isModal }
        open={ open }>
        <h1 data-testid="login-header" className="mt0">Login</h1>

        <LoginForm
          dataError={ dataError }
          onSubmit={ this.handleLoginSubmit.bind(this) }
        />
      </Dialog>
    );
  }home

  handleLoginSubmit(values) {
    return new Promise((resolve, reject) => {
      this.props.loginSubmit({values, resolve, reject});
    });
  }
}

export default connect(
  state => ({
    dataError: state.session.get('dataError'),
  }),
  dispatch => bindActionCreators(SessionActions, dispatch)
)(LoginModal);
