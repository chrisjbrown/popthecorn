import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Moment from 'moment';

import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconDone from 'material-ui/svg-icons/action/done';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import Container from 'app/components/container';
import {
  orderRequest,
  orderAssignRequest,
  orderUpdateRequest,
  itemReserveRequest,
} from 'app/actions/';
import DbkColors from 'app/styles/colors';
import ButtonStyles from 'app/styles/buttons';
import Typography from 'app/styles/typography';
import OrderListStyles from 'app/styles/order-list';

class OrderPage extends Component {

  static propTypes = {
    session: PropTypes.object,
    orderData: PropTypes.object,
    params: PropTypes.object,
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
    orderRequest: PropTypes.func,
    orderAssignRequest: PropTypes.func,
    orderUpdateRequest: PropTypes.func,
    itemReserveRequest: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.orderRequest(this.props.params.orderId);
  }

  getIndicatorClass(status) {
    switch (status) {
      case 'INPROGRESS':
        return Typography.indicatorInProgress;
      case 'COMPLETED':
        return Typography.indicatorReady;
      case 'DELIVERED':
        return Typography.indicatorDelivered;
      case 'EXPIRED':
        return Typography.indicatorExpired;
      default:
        return Typography.indicatorOpen;
    }
  }

  renderAssignedStatus() {
    const orderData = this.props.orderData;
    const assignee = orderData.getIn(['order', 'assignee'], '');
    const assignedToYou = assignee.get('id') === this.props.session.getIn(['user', 'number']);
    const time = Moment(orderData.getIn(['order', 'assignedAt'], '')).format('HH:mm');
    const day = Moment(orderData.getIn(['order', 'assignedAt'], '')).format('(DD-MM-YYYY)');

    const completedButtons = (() => {
      switch (orderData.getIn(['order', 'status'])) {
        case 'COMPLETED':
          return (
            <div className="center">
              <div className="mt1">
                <FlatButton
                  onTouchTap={ this.handleUpdateOrder.bind(this, 'DELIVERED') }
                  style={ Object.assign({}, ButtonStyles.orderAction, ButtonStyles.orderActionSuccess) }
                  className="col-10">
                  Opgehaald
                </FlatButton>
              </div>
              <div className="mt1">
                <FlatButton
                  onTouchTap={ this.handleUpdateOrder.bind(this, 'EXPIRED') }
                  style={ Object.assign({}, ButtonStyles.orderAction, ButtonStyles.orderActionFail) }
                  className="col-10">
                  Niet Opgehaald
                </FlatButton>
              </div>
            </div>
          );
        default:
          return [];
      }
    })();

    return (
      <div className="p2 h5" style={ {backgroundColor: '#f6f6f6'} }>
        <div className="flex">
          <div className="col-4">
            <strong>Status</strong>
          </div>
          <div className="col-4">
            <strong>Door</strong>
          </div>
          <div className="col-4">
            <strong>Om</strong>
          </div>
        </div>
        <div className="flex">
          <div className="col-4">
            <span style={ Object.assign({}, Typography.indicator, this.getIndicatorClass(orderData.getIn(['order', 'status'], ''))) }/>
            <span>
              { this.mapStatus(orderData.getIn(['order', 'status'], '')) }
            </span>
          </div>
          <div className="col-4">
            <span>
              { assignedToYou ? 'Jou' : assignee.get('name', '') }
            </span>
          </div>
          <div className="col-4">
            <span style={ {whiteSpace: 'nowrap'} }>
              { time }
            </span>
            <span
              className="h6"
              style={ Object.assign({}, {whiteSpace: 'nowrap', marginLeft: '2px'}, Typography.secondary) }>
              { day }
            </span>
          </div>
        </div>
        { completedButtons }
      </div>
    );
  }

  renderItemAction(status, orderId, itemId, itemIndex) {
    const reserved = status === 'RESERVED';
    return (
      <div
        onClick={ (e) => {e.preventDefault();} }
        onTouchTap={ reserved ? () => {} : this.handleReserveItem.bind(this, orderId, itemId, itemIndex) }
        className="col-2"
        style={ OrderListStyles.itemActionContainer }>
        <div
          style={ Object.assign({}, OrderListStyles.itemAction, reserved ? OrderListStyles.itemActionActive : {}) }>
          { reserved ? <IconDone color="white" /> : [] }
        </div>
      </div>
    );
  }

  renderUnassignedStatus() {
    const orderData = this.props.orderData;
    return (
      <div className="flex p2 h5" style={ {backgroundColor: '#f6f6f6'} }>
        <div className="col-4">
          <div>
            <strong>Status</strong>
          </div>
          <div>
            <span style={ Object.assign({}, Typography.indicator, Typography.indicatorOpen) }/>
            <span>
              { this.mapStatus(orderData.getIn(['order', 'status'])) }
            </span>
          </div>
        </div>
        <FlatButton
          className="col-8"
          onTouchTap={ this.handleAssignOrder.bind(this) }
          style={ ButtonStyles.orderAction }>
          Behandel
        </FlatButton>
      </div>
    );
  }

  renderError() {
    return (
      <Container center>
        <strong> { this.props.dataError } </strong>
      </Container>
    );
  }

  renderLoading() {
    return (
      <Container center>
        <div className="center">
          <CircularProgress color={ DbkColors.accent1Color } size={ 1.5 }  />
        </div>
      </Container>
    );
  }

  renderItemList() {
    const items = this.props.orderData.getIn(['order', 'items'], false);
    const assigned = this.props.orderData.getIn(['order', 'assigned']);
    const orderId = this.props.orderData.getIn(['order', 'id']);

    if (!items) {
      return [];
    }

    const orderItems = items.map((item, i) => {
      const product = item.get('product');
      const status = item.get('status');

      if (item.get('isLoading', false)) {
        return (
          <div key={ i }>
            { this.renderLoading() }
          </div>
        );
      }

      return (
        <div key={ i }>
          <Link to={ '/pickingorders/' + orderId + '/items/' + item.get('id') }>
            <ListItem
              innerDivStyle={ OrderListStyles.itemList }>
              <div className="flex">
                { assigned ? this.renderItemAction(status, orderId, item.get('id'), i) : [] }
                <div className="col-3" style={ OrderListStyles.itemAvatar }>
                  <Avatar src={ product.get('imageUrl') } size={ 60 }/>
                </div>
                <div>
                  <p style={ OrderListStyles.itemPrimaryText }>{ product.get('name') }</p>
                  <p style={ Typography.multiEllipsis }>{ product.get('description') }</p>
                </div>
                <div className="col-1">
                  <IconChevronRight style={ {position: 'relative', top: '20px'} } />
                </div>
              </div>
            </ListItem>
          </Link>
          <Divider />
        </div>
      );
    });

    return orderItems;
  }

  render() {
    const { orderData } = this.props;
    const isLoading = orderData.get('isLoading');
    const dataError = orderData.get('dataError');
    const email = orderData.getIn(['order', 'customer', 'email'], '');
    const phoneNumber = orderData.getIn(['order', 'customer', 'phoneNumber'], '');
    const time = Moment(orderData.getIn(['order', 'placedAt'], '')).format('HH:mm');
    const day = Moment(orderData.getIn(['order', 'placedAt'], '')).format('(DD-MM-YYYY)');

    if (isLoading) {
      return ( this.renderLoading() );
    } else if (dataError) {
      return ( this.renderError() );
    } else if (!orderData.get('order', false)) {
      return (
        <Container center>
          <span> Order not found </span>
        </Container>
      );
    }

    return (
      <Container center>
        <div className="p2 h5">
          <div>
            <strong>Aangevraagd om: </strong>
            <span style={ Typography.secondary }>{ time + ' ' + day }</span>
          </div>
          <div>
            <strong>Email: </strong>
            <span style={ Typography.secondary }>{ email }</span>
          </div>
          <div>
            <strong>Telefoon: </strong>
            <span style={ Typography.secondary }>{ phoneNumber }</span>
          </div>
        </div>

        { orderData.getIn(['order', 'assigned']) ? this.renderAssignedStatus() : this.renderUnassignedStatus() }

        <List>
          { this.renderItemList() }
        </List>
      </Container>
    );
  }

  mapStatus(status) {
    switch (status) {
      case 'NEW':
        return 'Open';
      case 'INPROGRESS':
        return 'In behandeling';
      case 'COMPLETED':
        return 'Gereed';
      case 'DELIVERED':
        return 'Opgehaald';
      case 'EXPIRED':
        return 'Niet Opgehaald';
      default:
        return 'Open';
    }
  }

  handleReserveItem(orderId, itemId, itemIndex) {
    this.props.itemReserveRequest(orderId, itemId, itemIndex);
  }

  handleAssignOrder() {
    this.props.orderAssignRequest(this.props.orderData.getIn(['order', 'id']));
  }

  handleUpdateOrder(status) {
    this.props.orderUpdateRequest(this.props.orderData.getIn(['order', 'id']), status);
  }
}

export default connect(
  state => ({
    session: state.session,
    orderData: state.order,
  }),
  dispatch => bindActionCreators({ orderRequest, orderAssignRequest, orderUpdateRequest, itemReserveRequest }, dispatch)
)(OrderPage);
