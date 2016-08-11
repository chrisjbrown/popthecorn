import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

import Container from 'app/components/container';
import * as OrderListActions from 'app/actions/order-list';

class OrderListPage extends Component {

  static propTypes = {
    orders: PropTypes.array,
    requestOrderList: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestOrderList();
  }

  renderLoading() {
    return (
      <div className="center">
        <CircularProgress size={ 1.5 }  />
      </div>
    );
  }

  renderOrderList() {
    const { orders } = this.props;

    const orderListItems = orders.map((order, i) => {
      return (
        <div key={ i }>
          <Link to={ '/orders/' + order.order.id }>
            <ListItem
              primaryText={ order.customer.name }
              secondaryText={ order.order.id }
              leftAvatar={<Avatar src={order.product.imageUrl} />}
            />
          </Link>
          <Divider />
        </div>
      );
    });

    return (
      <List>
        { orderListItems }
      </List>
    );
  }

  render() {
    const { isLoading } = this.props;

    return (
      <Container testid="orderlist" size={4} center>
        <h2 data-testid="order-list-heading" className="caps">
          Order List Page
        </h2>

        { isLoading ? this.renderLoading() : this.renderOrderList() }
      </Container>
    );
  }
}

export default connect(
  state => ({
    orders: state.orderList.get('orders').toJS(),
    hasError: state.orderList.get('hasError'),
    isLoading: state.orderList.get('isLoading'),
  }),
  dispatch => bindActionCreators(OrderListActions, dispatch)
)(OrderListPage);
