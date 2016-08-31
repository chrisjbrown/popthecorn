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
import PrintIcon from 'material-ui/svg-icons/action/print';
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
import { logoutUser } from 'app/actions/session';

import Headings from 'app/styles/headings';
import DbkColors from 'app/styles/colors';
import Typography from 'app/styles/typography';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const dbkTheme = getMuiTheme({
  palette: DbkColors,
  fontFamily: 'Proxima\ Nova',
  appBar: {
    color: DbkColors.alternateTextColor,
    textColor: DbkColors.textColor,
  },
  raisedButton: {
    color: DbkColors.primary3Color,
    textColor: DbkColors.alternateTextColor,
    primaryColor: DbkColors.accent1Color,
    secondaryColor: DbkColors.primary3Color,
  },
  floatingActionButton: {
    color: DbkColors.primary3Color,
    iconColor: DbkColors.alternateTextColor,
  },
  tabs: {
    textColor: DbkColors.primary2Color,
    selectedTextColor: DbkColors.textColor,
  },
  badge: {
    primaryColor: DbkColors.primary3Color,
    color: DbkColors.primary2Color,
    textColor: DbkColors.alternateTextColor,
  },
});

class App extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    orderData: PropTypes.object.isRequired,
    itemData: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
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
    // TODO find a better way to do this
    const pathname = this.props.routing.locationBeforeTransitions.pathname;
    const customer = this.props.orderData.getIn(['order', 'customer'], false);

    if (pathname === '/') {
      return <span style={ Headings.dbkNHeading }> KLANTAANVRAGEN </span>;
    } else if (pathname.includes('search')) {
      return <span style={ Headings.dbkHeading }> SEARCH </span>;
    } else if (pathname.includes('settings')) {
      return <span style={ Headings.dbkHeading }> SETTINGS </span>;
    } else if (pathname.includes('items') ) {
      return <span style={ Headings.dbkHeading }> { this.props.itemData.getIn(['item', 'product', 'name']) } </span>;
    } else if (pathname.includes('pickingorders')) {
      return (
        <div style={ Object.assign({}, Headings.dbkHeading, Headings.dbkNavHeading) }>
          <div style={ {height: '17px'} }>
            <strong>
              { customer ? customer.get('name') : [] }
            </strong>
          </div>
          <div style={ Typography.secondary }>
            { this.props.orderData.getIn(['order', 'orderId']) }
          </div>
        </div>
      );
    }
    return '';
  }

  renderNavButton() {
    // TODO find a better way to do this
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

  renderPrintButton() {
    return (
      <IconButton style={ {backgroundColor: DbkColors.printColor} }>
        <PrintIcon color={ 'white' } onTouchTap={ this.handlePrint }/>
      </IconButton>
    );
  }

  renderSignOut() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        targetOrigin={ {horizontal: 'right', vertical: 'top'} }
        anchorOrigin={ {horizontal: 'right', vertical: 'top'} }>
        <MenuItem onTouchTap={ this.props.logoutUser } primaryText="Sign out" />
      </IconMenu>
    );
  }

  render() {
    const { session, error, children, orderData } = this.props;
    const { drawerOpen } = this.state;

    const assigned = orderData.getIn(['order', 'assigned'], false);
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
              assigned &&
              this.props.routing.locationBeforeTransitions.pathname.includes('pickingorders') &&
              !this.props.routing.locationBeforeTransitions.pathname.includes('items') ?
                this.renderPrintButton() : this.renderSignOut()
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

  handlePrint() {
    console.log('print print');
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen,
    });
  }
}

export default connect(
  state => ({
    itemData: state.item,
    orderData: state.order,
    session: state.session,
    routing: state.routing,
    error: state.error,
    form: state.form,
  }),
  dispatch => bindActionCreators({ logoutUser }, dispatch)
)(App);
