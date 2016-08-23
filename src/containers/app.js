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
import ChevronLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import AccessibilityIcon from 'material-ui/svg-icons/action/accessibility';
import SearchIcon from 'material-ui/svg-icons/action/search';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';

import Content from 'app/components/content';
import LoginModal from 'app/components/login/login-modal';
import * as SessionActions from 'app/actions/session';

import headings from 'app/styles/headings';
import dbkColors from 'app/styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const dbkTheme = getMuiTheme({
  palette: dbkColors,
  fontFamily: 'Proxima\ Nova',
  appBar: {
    color: dbkColors.alternateTextColor,
    textColor: dbkColors.textColor,
  },
  raisedButton: {
    color: dbkColors.primary3Color,
    textColor: dbkColors.alternateTextColor,
  },
  floatingActionButton: {
    color: dbkColors.primary3Color,
    iconColor: dbkColors.alternateTextColor,
  },
  tabs: {
    textColor: dbkColors.primary2Color,
    selectedTextColor: dbkColors.textColor,
  },
  badge: {
    primaryColor: dbkColors.primary3Color,
    color: dbkColors.primary2Color,
    textColor: dbkColors.alternateTextColor,
  },
});

class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    order: PropTypes.object,
    session: PropTypes.object,
    routing: PropTypes.object,
    router: PropTypes.object,
    form: PropTypes.object,
    error: PropTypes.object,
    logoutUser: PropTypes.func,
    removeErr: PropTypes.func,
    params: PropTypes.object,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      drawerOpen: false,
    };
  }

  getNavTitle() {
    const pathname = this.props.routing.locationBeforeTransitions.pathname;
    const customer = this.props.order.get('customer');

    if (pathname === '/') {
      return <span style={ headings.dbkNHeading }> KLANTAANVRAGEN </span>;
    } else if (pathname.includes('search')) {
      return <span style={ headings.dbkHeading }> SEARCH </span>;
    } else if (pathname.includes('settings')) {
      return <span style={ headings.dbkHeading }> SETTINGS </span>;
    } else if (pathname.includes('pickingorders')) {
      return (
        <span style={ Object.assign({}, headings.dbkHeading, headings.dbkNavHeading) }>
          <span className="clearfix">
            { customer ? customer.get('name') : [] }
          </span>
          <span className="clearfix">
            { this.props.params.id }
          </span>
        </span>
      );
    }
    return '';
  }

  renderNavButton() {
    const pathname = this.props.routing.locationBeforeTransitions.pathname;

    if (pathname.includes('pickingorders')) {
      return (
        <IconButton
          onTouchTap={ this.context.router.goBack.bind() }>
          <ChevronLeftIcon />
        </IconButton>
      );
    }
    return (
      <IconButton
        onTouchTap={ this.toggleDrawer.bind(this) }>
        <MenuIcon />
      </IconButton>
    );
  }

  render() {
    const { session, error, logoutUser, children } = this.props;
    const { drawerOpen } = this.state;

    const errorMsg = error.get('message', false);
    const token = session.get('token', false);

    const displayError = (errorMsg && errorMsg !== null && typeof errorMsg !== 'undefined') ? true : false;
    const isLoggedIn = (token && token !== null && typeof token !== 'undefined') ? true : false;

    return (
      <MuiThemeProvider muiTheme={ dbkTheme }>
        <div>
          <LoginModal
            open={ !isLoggedIn } />

          <AppBar
            title={ this.getNavTitle() }
            className="navbar"
            style={ {position: 'fixed'} }
            iconElementLeft={ this.renderNavButton() }
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
                primaryText="Search"
                onTouchTap={ this.closeDrawer.bind(this) }
                containerElement={ <Link to="/search" />}
                leftIcon={<SearchIcon />}
              />
              <ListItem
                primaryText="Settings"
                onTouchTap={ this.closeDrawer.bind(this) }
                containerElement={ <Link to="/settings" />}
                leftIcon={<AccessibilityIcon />}
              />
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

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }
}

export default connect(
  state => ({
    order: state.order.get('orderData'),
    session: state.session,
    routing: state.routing,
    error: state.error,
    form: state.form,
  }),
  dispatch => bindActionCreators(SessionActions, dispatch)
)(App);
