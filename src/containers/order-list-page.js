import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import StarIcon from 'material-ui/svg-icons/action/stars';
import Divider from 'material-ui/Divider';

import Container from 'base/components/container';

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
        <Link to={ '/orders/' + 'orderid1' }>
          <ListItem
            primaryText={ 'Order 1' }
            leftIcon={<StarIcon />}
          />
        </Link>
          <Divider />
          <Link to={ '/orders/' + 'orderid2' }>
            <ListItem
              primaryText={ 'Order 2' }
              leftIcon={<StarIcon />}
            />
          </Link>
          <Divider />
          <Link to={ '/orders/' + 'orderid3' }>
            <ListItem
              primaryText={ 'Order 3' }
              leftIcon={<StarIcon />}
            />
          </Link>
          <Divider />
          <Link to={ '/orders/' + 'orderid4' }>
            <ListItem
              primaryText={ 'Order 4' }
              leftIcon={<StarIcon />}
            />
          </Link>
          <Divider />
          <Link to={ '/orders/' + 'orderid5' }>
            <ListItem
              primaryText={ 'Order 5' }
              leftIcon={<StarIcon />}
            />
          </Link>
          <Divider />
          <Link to={ '/orders/' + 'orderid6' }>
            <ListItem
              primaryText={ 'Order 6' }
              leftIcon={<StarIcon />}
            />
          </Link>
          <Divider />
        </List>
      </Container>
    );
  }
}

export default connect()(OrderListPage);
