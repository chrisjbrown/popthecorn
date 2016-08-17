import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import Container from 'app/components/container';
import * as OrderActions from 'app/actions/order';

class OrderPage extends Component {

  static propTypes = {
    requestCompleteOrder: PropTypes.func,
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
        <CircularProgress color="f6a800" size={ 1.5 }  />
      </div>
    );
  }

  renderError() {
    return (
      <strong> { this.props.dataError } </strong>
    );
  }

  renderOrder() {
    const { orderData, requestCompleteOrder } = this.props;

    if (orderData.size > 0) {
      const detail = orderData.get('order');
      const customer = orderData.get('customer');
      const product = orderData.get('product');
      const pickingOrder = orderData.get('pickingOrder');

      return (
        <div>
          <div style={ {backgroundColor: '#f6f6f6', padding: '10px'} }>
            <div className="clearfix">
              <span className="col col-4">Status</span>
              <span className="col col-4">Door</span>
              <span className="col col-4">Om</span>
            </div>
            <div className="clearfix">
              <span style={ {textTransform: 'capitalize'} } className="col col-4">{ pickingOrder.get('status').toLowerCase() }</span>
              <span className="col col-4">{ customer.get('name') }</span>
              <span className="col col-4">{ detail.get('placedAt') }</span>
            </div>
            <div style={ {textAlign: 'center'} }>
              <RaisedButton
                onTouchTap={ requestCompleteOrder.bind(null, pickingOrder.get('id')) }
                label={ pickingOrder.get('status') === 'DELIVERED' ? 'Opgehaald' : 'Voltooid' }
                labelStyle={ {textTransform: 'none'} }
                secondary={true}/>
            </div>
          </div>

          <div className="mt3">
            <div>
              <strong>Aanvraag om: </strong>
              <span>{ detail.get('placedAt') }</span>
            </div>
            <div>
              <strong>Door: </strong>
              <span>{ customer.get('name') }</span>
            </div>
            <div>
              <strong>OrderNummer: </strong>
              <span>{ detail.get('id') }</span>
            </div>
          </div>

          <Avatar className="mx-auto mt3" style={ {display: 'block'} } src={ product.get('imageUrl') } size={ 200 } />

          <div className="mt3">
            <div>
              <span>{ product.get('description') }</span>
              <Divider/>
            </div>
            <div>
              <strong>Aantal: </strong>
              <span>{ orderData.get('quantity') } x</span>
              <Divider/>
            </div>
            <div>
              <strong>Artikelnummer: </strong>
              <span>{ product.get('code') }</span>
              <Divider/>
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
