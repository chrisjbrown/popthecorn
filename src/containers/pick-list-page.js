import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from 'base/components/list';
import Container from 'base/components/container';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

class PickListPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container testid="picklist" size={4} center>
        <h2 data-testid="pick-list-heading" className="caps">
          Pick List Page
        </h2>

        <List>
          <li>bla1</li>
          <li>bla2</li>
          <li>bla3</li>
          <li>bla4</li>
        </List>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PickListPage);
