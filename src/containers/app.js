import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';

import Content from 'app/components/content';
import LoginModal from 'app/components/login/login-modal';
import * as SessionActions from 'app/actions/session';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme();

class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    session: PropTypes.object,
    form: PropTypes.object,
    error: PropTypes.object,
    loginSubmit: PropTypes.func,
    logoutUser: PropTypes.func,
    removeErr: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      drawerOpen: false,
    };
  }

  render() {
    const { session, error, logoutUser, children } = this.props;
    const { drawerOpen } = this.state;

    const errorMsg = error.get('message', false);
    const token = session.get('token', false);

    const displayError = (errorMsg && errorMsg !== null && typeof errorMsg !== 'undefined') ? true : false;
    const isLoggedIn = (token && token !== null && typeof token !== 'undefined') ? true : false;

    return (
      <MuiThemeProvider muiTheme={ muiTheme }>
        <div>
          <LoginModal
            onSubmit={ this.handleLoginSubmit.bind(this) }
            open={ !isLoggedIn } />

          <AppBar
            className="navbar"
            style={ {position: 'fixed'} }
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
                <MenuItem onTouchTap={ logoutUser } primaryText="Sign out" />
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
          <Content style isVisible={ isLoggedIn }>
            { children }
          </Content>
          <Snackbar
            open={ displayError }
            message={ displayError ? errorMsg : '' }
            autoHideDuration={3000}
          />
        </div>
      </MuiThemeProvider>
    );
  }

  closeDrawer() {
    this.setState({
      drawerOpen: false,
    });
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    return new Promise((resolve, reject) => {
      const values = this.props.form.login.values;
      this.props.loginSubmit({values, resolve, reject});
    }).catch((error) => {
      console.error(error);
    });
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }
}

export default connect(
  state => ({
    session: state.session,
    router: state.router,
    error: state.error,
    form: state.form,
  }),
  dispatch => bindActionCreators(SessionActions, dispatch)
)(App);
