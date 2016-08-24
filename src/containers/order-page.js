import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconDone from 'material-ui/svg-icons/action/done';
// import Avatar from 'material-ui/Avatar';
// import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import Container from 'app/components/container';
import * as OrderActions from 'app/actions/order';

import dbkColors from 'app/styles/colors';
import ButtonStyles from 'app/styles/buttons';
import Typography from 'app/styles/typography';
import OrderListStyles from 'app/styles/order-list';

class OrderPage extends Component {

  static propTypes = {
    requestCompleteOrder: PropTypes.func,
    items: PropTypes.object,
    order: PropTypes.object,
    params: PropTypes.object,
    requestOrder: PropTypes.func,
    orderAssignRequest: PropTypes.func,
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
        <CircularProgress color={ dbkColors.accent1Color } size={ 1.5 }  />
      </div>
    );
  }

  renderError() {
    return (
      <strong> { this.props.dataError } </strong>
    );
  }

/*


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
 */

  renderOrder() {
    const { items } = this.props;

    if (items.size > 0) {
      // const detail = orderData.get('order');
      // const customer = orderData.get('customer');
      // const product = orderData.get('product');
      // const pickingOrder = orderData.get('pickingOrder');

      return (
        <div>
          <div className="flex p2" style={ {backgroundColor: '#f6f6f6'} }>
            <div className="flex-auto">
              <div className="table">
                <div>
                  <div className="table-cell">
                    <strong>Status</strong>
                  </div>
                </div>
                <div>
                  <div className="table-cell">
                    Open
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                style={ ButtonStyles.orderAction }>
                Behandel
              </button>
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

  renderStatus() {
    const order = this.props.order;
    return (
      <div>
        <div className="flex p2" style={ {backgroundColor: '#f6f6f6'} }>
          <div className="flex-auto">
            <div className="table">
              <div>
                <div className="table-cell">
                  <strong>Status</strong>
                </div>
              </div>
              <div>
                <div className="table-cell">
                  <span>
                    { this.mapStatus(order.get('status')) }
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onTouchTap={ this.handleAssignOrder.bind(this) }
              style={ ButtonStyles.orderAction }>
              Behandel
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderItemAction() {
    return (
      <div
        className="col-2"
        style={ OrderListStyles.itemActionContainer }>
        <div
          style={ OrderListStyles.itemAction }>
          <IconDone />
        </div>
      </div>
    );
  }

  renderItemList() {
    const items = this.props.order.get('items', false);

    if (!items) {
      return [];
    }

    const orderItems = items.map((item, i) => {
      const product = item.get('product');
      const status = item.get('status');

      return (
        <div key={ i }>
          <ListItem
            innerDivStyle={ OrderListStyles.itemList }>
            <div className="flex">
              { status === 'NEW' ? [] : this.renderItemAction() }
              <div className="col-3" style={ OrderListStyles.itemAvatar }>
                <Avatar src={ product.get('imageUrl') } size={ 60 }/>
              </div>
              <div>
                <p style={ OrderListStyles.itemPrimaryText }>{ product.get('name') }</p>
                <p style={ Typography.blockWithText }>{ product.get('description') }</p>
              </div>
              <div className="col-1">
                <IconChevronRight style={ {position: 'relative', top: '20px'} } />
              </div>
            </div>
          </ListItem>
          <Divider />
        </div>
      );
    });

    return orderItems;
  }

  render() {
    const { isLoading, dataError } = this.props;

    return (
      <Container center>

        { isLoading ? this.renderLoading() : [] }
        { dataError ? this.renderError() : [] }
        { !isLoading && !dataError ? this.renderStatus() : [] }

        <List>
          { !isLoading && !dataError ? this.renderItemList() : [] }
        </List>
      </Container>
    );
  }

  mapStatus(status) {
    switch (status) {
      case 'NEW':
        return 'Open';
      default:
        return 'BLALBAL';
    }
  }

  handleAssignOrder() {
    this.props.orderAssignRequest(this.props.order.get('id'));
  }
}

export default connect(
  state => ({
    order: state.order.get('order'),
    dataError: state.order.get('dataError'),
    isLoading: state.order.get('isLoading'),
  }),
  dispatch => bindActionCreators(OrderActions, dispatch)
)(OrderPage);
