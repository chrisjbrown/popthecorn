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
    orders: PropTypes.object,
    requestOrderList: PropTypes.func,
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
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

  renderError() {
    return (
      <strong> Error requesting order list </strong>
    );
  }

  renderOrderList() {
    const orders = this.props.orders;

    const orderListItems = orders.map((order, i) => {
      const detail = order.get('order');
      const customer = order.get('customer');
      const product = order.get('product');

      return (
        <div key={ i }>
          <Link to={ '/orders/' + detail.get('id') }>
            <ListItem
              primaryText={ customer.get('name') }
              secondaryText={ detail.get('id') }
              leftAvatar={<Avatar src={product.get('imageUrl')} />}
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
    const { isLoading, dataError } = this.props;

    return (
      <Container testid="orderlist" size={4} center>
        <h2 data-testid="order-list-heading" className="caps">
          Order List Page
        </h2>

        { isLoading ? this.renderLoading() : [] }
        { dataError ? this.renderError() : [] }
        { !isLoading && !dataError ? this.renderOrderList() : [] }

      </Container>
    );
  }
}

export default connect(
  state => ({
    orders: state.orderList.get('orders'),
    dataError: state.orderList.get('dataError'),
    isLoading: state.orderList.get('isLoading'),
  }),
  dispatch => bindActionCreators(OrderListActions, dispatch)
)(OrderListPage);
