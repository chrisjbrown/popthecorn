import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

import Container from 'app/components/container';
import * as OrderActions from 'app/actions/order';

class OrderPage extends Component {

  static propTypes = {
    orderData: PropTypes.object,
    params: PropTypes.object,
    requestOrder: PropTypes.func,
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
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

  renderError() {
    return (
      <strong> { this.props.dataError } </strong>
    );
  }

  renderOrder() {
    const orderData = this.props.orderData;

    if (orderData.size > 0) {
      const order = orderData.get('order');
      const customer = orderData.get('customer');
      const product = orderData.get('product');

      return (
        <div>
          <h3>
            <div>Customer: { customer.get('name') }</div>
            <div>ID: { order.get('id') }</div>
          </h3>

          <Avatar className="mx-auto" style={ {display: 'block'} } src={ product.get('imageUrl') } size={ 100 } />

          <div>
            <div className="clearfix mt3">
              <span className="left">Product Name:</span>
              <span className="right">{ product.get('name') }</span>
            </div>
            <div className="clearfix mt3">
              <span className="left">Description:</span>
              <span className="right">{ product.get('description') }</span>
            </div>
            <div className="clearfix mt3">
              <span className="left">Price:</span>
              <span className="right">{ product.get('price') }</span>
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
    const { isLoading, dataError } = this.props;

    return (
      <Container testid="order" size={4} center>

        { isLoading ? this.renderLoading() : [] }
        { dataError ? this.renderError() : [] }
        { !isLoading && !dataError ? this.renderOrder() : [] }

      </Container>
    );
  }
}

export default connect(
  state => ({
    orderData: state.order.get('orderData'),
    dataError: state.order.get('dataError'),
    isLoading: state.order.get('isLoading'),
  }),
  dispatch => bindActionCreators(OrderActions, dispatch)
)(OrderPage);
