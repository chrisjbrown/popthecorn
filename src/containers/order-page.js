import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

import Container from 'app/components/container';
import * as OrderActions from 'app/actions/order';

class OrderPage extends Component {

  static propTypes = {
    order: PropTypes.object,
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
    const orderData = this.props.order.get('orderData');

    if (orderData !== null) {
      const { product, customer, order } = orderData.toJS();

      return (
        <div>
          <h3>
            <div>Customer: { customer.name }</div>
            <div>ID: { order.id }</div>
          </h3>

          <Avatar className="mx-auto" style={ {display: 'block'} } src={ product.imageUrl } size={ 100 } />

          <div>
            <div className="clearfix mt3">
              <span className="left">Product Name:</span>
              <span className="right">{ product.name }</span>
            </div>
            <div className="clearfix mt3">
              <span className="left">Description:</span>
              <span className="right">{ product.description }</span>
            </div>
            <div className="clearfix mt3">
              <span className="left">Price:</span>
              <span className="right">{ product.price }</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        no products found
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
    order: state.order,
    hasError: state.order.get('hasError'),
    isLoading: state.order.get('isLoading'),
  }),
  dispatch => bindActionCreators(OrderActions, dispatch)
)(OrderPage);
