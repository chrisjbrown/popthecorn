import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';

import Container from 'base/components/container';
import * as OrderActions from 'base/actions/order';

class OrderPage extends Component {

  static propTypes = {
    products: PropTypes.array,
    id: PropTypes.number,
    name: PropTypes.string,
    customer: PropTypes.string,
    params: PropTypes.object,
    requestOrder: PropTypes.func,
    isLoading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.requestOrder(this.props.params.id);
  }

  renderLoading() {
    return (
      <div className="center">
        <CircularProgress size={ 1.5 }  />
      </div>
    );
  }

  renderOrder() {
    const { products, customer, id, name } = this.props;

    const productListItems = products.map((product) => {
      return (
        <ListItem key={ product.id }>
          <div>{ product.name }</div>
          <div>{ product.type }</div>
          <div>{ product.price }</div>
        </ListItem>
      );
    });

    return (
      <div>
        <h3>
          <div>Customer: { customer }</div>
          <div>ID: { id }</div>
          <div>Name: { name }</div>
        </h3>

        <List>
          { productListItems.length > 0 ? productListItems : 'no products in order' }
        </List>
      </div>
    );
  }

  render() {
    const { isLoading } = this.props;

    return (
      <Container testid="order" size={4} center>
        <h2 data-testid="order-heading" className="caps">
          Order Page
        </h2>

        <Divider/>

        { isLoading ? this.renderLoading() : this.renderOrder() }

      </Container>
    );
  }
}

export default connect(
  state => ({
    id: state.order.get('id'),
    name: state.order.get('name'),
    customer: state.order.get('customer'),
    products: state.order.get('products').toJS(),
    hasError: state.order.get('hasError'),
    isLoading: state.order.get('isLoading'),
  }),
  dispatch => bindActionCreators(OrderActions, dispatch)
)(OrderPage);
