import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePush } from 'base/actions/session';
import Button from 'base/components/button';
import Container from 'base/components/container';

function mapStateToProps(state) {
  return {
    pushEnabled: state.session.get('pushEnabled'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: (pushEnabled) => dispatch(togglePush(pushEnabled)),
  };
}

class SettingsPage extends Component {

  static propTypes = {
    pushEnabled: React.PropTypes.bool,
    toggle: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {toggle, pushEnabled} = this.props;
    return (
      <Container size={4} center>
        <h2 className="caps">
          SettingsPage
        </h2>

        <Button onClick={toggle.bind(this, pushEnabled)}>
          { pushEnabled ? 'Disable Push Messages' : 'Enable Push Messages' }
        </Button>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
