import React, { Component } from 'react';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import Container from 'base/components/container';

import StarIcon from 'material-ui/svg-icons/action/stars';
import Divider from 'material-ui/Divider';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

class OrderListPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container testid="orderlist" size={4} center>
        <h2 data-testid="order-list-heading" className="caps">
          Order List Page
        </h2>

        <List>
          <ListItem
            primaryText="Order 1"
            leftIcon={ <StarIcon /> }
          />
          <Divider />
          <ListItem
            primaryText="Order 2"
            leftIcon={<StarIcon />}
          />
          <Divider />
          <ListItem
            primaryText="Order 3"
            leftIcon={<StarIcon />}
          />
          <Divider />
          <ListItem
            primaryText="Order 4"
            leftIcon={<StarIcon />}
          />
          <Divider />
          <ListItem
            primaryText="Order 5"
            leftIcon={<StarIcon />}
          />
          <Divider />
          <ListItem
            primaryText="Order 6"
            leftIcon={<StarIcon />}
          />
          <Divider />
        </List>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderListPage);
