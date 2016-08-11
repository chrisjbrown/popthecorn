import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as SessionActions from 'app/actions/session';
import Toggle from 'material-ui/Toggle';
import Container from 'app/components/container';
import { List, ListItem } from 'material-ui/List';

class SettingsPage extends Component {

  static propTypes = {
    pushEnabled: React.PropTypes.bool,
    togglePush: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {togglePush, pushEnabled} = this.props;

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
              onToggle={ togglePush.bind(this, pushEnabled) }
            />
          </ListItem>
        </List>
      </Container>
    );
  }
}

export default connect(
  state => ({
    pushEnabled: state.session.get('pushEnabled'),
  }),
  dispatch => bindActionCreators(SessionActions, dispatch)
)(SettingsPage);
