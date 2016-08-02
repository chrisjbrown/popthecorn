import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loginUser, logoutUser } from 'base/actions/session';

import { Link } from 'react-router';
import Button from 'base/components/button';
import Content from 'base/components/content';
import LoginModal from 'base/components/login/login-modal';
import Logo from 'base/components/logo';
import Navigator from 'base/components/navigator';
import NavigatorItem from 'base/components/navigator-item';

function mapStateToProps(state) {
  return {
    session: state.session,
    router: state.router,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => dispatch(loginUser()),
    logout: () => dispatch(logoutUser()),
  };
}

class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    session: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { session, children, login, logout } = this.props;

    // const token = session.get('token', false);
    const isLoggedIn = true; // token && token !== null && typeof token !== 'undefined';
    const firstName = session.getIn(['user', 'first'], '');
    const lastName = session.getIn(['user', 'last'], '');

    return (
      <div>
        <LoginModal
          onSubmit={ login }
          isPending={ session.get('isLoading', false) }
          hasError={ session.get('hasError', false) }
          isVisible={ !isLoggedIn } />
        <Navigator testid="navigator">
          <NavigatorItem mr>
            <Logo />
          </NavigatorItem>
          <NavigatorItem isVisible={ false } mr>
            <Link to="/counter">Counter</Link>
          </NavigatorItem>
          <NavigatorItem isVisible={ false } mr>
            <Link to="/about">About Us</Link>
          </NavigatorItem>
          <NavigatorItem isVisible={ isLoggedIn } mr>
            <Link to="/">Pick List</Link>
          </NavigatorItem>
          <NavigatorItem isVisible={ false } mr>
            <Link to="/settings">Settings</Link>
          </NavigatorItem>
          <NavigatorItem isVisible={ false }>
            <Link to="/scan">Scan</Link>
          </NavigatorItem>
          <div className="flex flex-auto"></div>
          <NavigatorItem isVisible={ false } mr>
            <div data-testid="user-profile" className="h3">{ `${firstName} ${lastName}` }</div>
          </NavigatorItem>
          <NavigatorItem isVisible={ false }>
            <Button disabled onClick={ logout } className="bg-red white">
              Logout
            </Button>
          </NavigatorItem>
        </Navigator>
        <Content isVisible={ isLoggedIn }>
          { children }
        </Content>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
