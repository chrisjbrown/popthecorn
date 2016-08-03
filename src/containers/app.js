import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { loginUser, logoutUser } from 'base/actions/session';

import Content from 'base/components/content';
import LoginModal from 'base/components/login/login-modal';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

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

const muiTheme = getMuiTheme();

class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    session: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      drawerOpen: false,
    };
  }

  render() {
    const { session, children, login, logout } = this.props;
    const { drawerOpen } = this.state;

    const token = session.get('token', false);
    const isLoggedIn = token && token !== null && typeof token !== 'undefined';

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <LoginModal
            onSubmit={ login }
            isPending={ session.get('isLoading', false) }
            hasError={ session.get('hasError', false) }
            open={ !isLoggedIn } />

          <AppBar
            iconElementLeft={
              <IconButton
                onTouchTap={ this.toggleDrawer.bind(this) }>
                <MenuIcon />
              </IconButton>
            }
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                targetOrigin={ {horizontal: 'right', vertical: 'top'} }
                anchorOrigin={ {horizontal: 'right', vertical: 'top'} }>
                <MenuItem onTouchTap={ logout } primaryText="Sign out" />
              </IconMenu>
            }
          />
          <Drawer
            open={ drawerOpen }
            docked={ false }
            onRequestChange={ this.toggleDrawer.bind(this) }>
            <List>
              <ListItem
                primaryText="Orders"
                onTouchTap={ this.closeDrawer.bind(this) }
                containerElement={ <Link to="/" />}
                leftIcon={ <MenuIcon /> }
              />
              <ListItem
              primaryText="Settings"
              onTouchTap={ this.closeDrawer.bind(this) }
              containerElement={ <Link to="/settings" />}
              leftIcon={<AccessibilityIcon />} />
            </List>
          </Drawer>
          <Content isVisible={ isLoggedIn }>
            { children }
          </Content>
        </div>
      </MuiThemeProvider>
    );
  }

  closeDrawer() {
    this.setState({
      drawerOpen: false,
    });
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
