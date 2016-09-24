import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { removeError, configRequest } from 'app/actions/';
import Content from 'app/components/content';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    form: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    removeError: PropTypes.func.isRequired,
    configRequest: PropTypes.func.isRequired,
  };

  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      drawerOpen: false,
    };
  }

  componentDidMount() {
    if (!this.props.config.get('images', false)) {
      this.props.configRequest();
    }
  }

  renderNavButton() {
    return (
      <IconButton
        onTouchTap={ this.toggleDrawer.bind(this) }>
        <MenuIcon />
      </IconButton>
    );
  }

  render() {
    const { error, children } = this.props;
    const { drawerOpen } = this.state;

    const errorMsg = error.get('message', false);

    const displayError = (errorMsg && errorMsg !== null && typeof errorMsg !== 'undefined') ? true : false;

    return (
      <MuiThemeProvider muiTheme={ getMuiTheme() }>
        <div>

          <AppBar
            title="Discover movies"
            className="navbar"
            style={ {position: 'fixed'} }
            iconElementLeft={ this.renderNavButton() }
          />
          <Drawer
            open={ drawerOpen }
            docked={ false }
            onRequestChange={ this.toggleDrawer.bind(this) }>
            <List>
              <ListItem
                primaryText="Bla"
                onTouchTap={ this.closeDrawer.bind(this) }
                containerElement={ <Link to="/" />}
                leftIcon={ <MenuIcon /> }
              />
            </List>
          </Drawer>
          <Content isVisible={ true }>
            { children }
          </Content>
          <Snackbar
            open={ displayError }
            message={ displayError ? errorMsg : '' }
            autoHideDuration={ 3500 }
            onRequestClose={ this.props.removeError }
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
    form: state.form,
    error: state.error,
    config: state.config,
  }),
  dispatch => bindActionCreators({ removeError, configRequest }, dispatch)
)(App);
