import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePush } from 'base/actions/session';
import Toggle from 'material-ui/Toggle';
import Container from 'base/components/container';
import { List, ListItem } from 'material-ui/List';

function mapStateToProps(state) {
  return {
    pushEnabled: state.session.get('pushEnabled'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    togglePushNotifications: (pushEnabled) => dispatch(togglePush(pushEnabled)),
  };
}

class SettingsPage extends Component {

  static propTypes = {
    pushEnabled: React.PropTypes.bool,
    togglePushNotifications: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {togglePushNotifications, pushEnabled} = this.props;
    return (
      <Container size={4} center>
        <h2 className="caps">
          Settings Page
        </h2>

        <List>
          <ListItem>
            <Toggle
              label={ 'Push Messages' }
              toggled={ pushEnabled }
              onToggle={ togglePushNotifications.bind(this, pushEnabled) }
            />
          </ListItem>
        </List>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
