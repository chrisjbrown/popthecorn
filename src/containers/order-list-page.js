import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Radium from 'radium';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconAlarm from 'material-ui/svg-icons/action/alarm';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Badge from 'material-ui/Badge';

import Container from 'app/components/container';
import {
  orderAssignedListRequest,
  orderUnassignedListRequest,
} from 'app/actions/order-list';

import Headings from 'app/styles/headings';
import OrderListStyles from 'app/styles/order-list';
import DbkColors from 'app/styles/colors';
import TabStyle from 'app/styles/tabs';
import Typography from 'app/styles/typography';

@Radium
class OrderListPage extends Component {

  static propTypes = {
    session: PropTypes.object,
    assignedOrders: PropTypes.object,
    unassignedOrders: PropTypes.object,
    orderListData: PropTypes.object,
    orderAssignedListRequest: PropTypes.func,
    orderUnassignedListRequest: PropTypes.func,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      tabIndex: props.orderListData.get('listType'),
    };
  }

  componentDidMount() {
    if (this.state.tabIndex === 0) {
      this.props.orderUnassignedListRequest();
    } else {
      this.props.orderAssignedListRequest();
    }
  }

  renderError() {
    return (
      <strong> Error requesting item list </strong>
    );
  }

  renderLoading() {
    return (
      <div className="center">
        <CircularProgress color={ DbkColors.accent1Color } size={ 1.5 }  />
      </div>
    );
  }

  renderOrderList(orders) {
    const orderListItems = orders.map((order, i) => {
      const customer = order.get('customer');

      return (
        <div key={ i }>
          <Link to={ '/pickingorders/' + order.get('id') }>
            <ListItem
              rightIcon={
                <IconChevronRight style={ OrderListStyles.itemArrow }/>
              }>
              <div>
                <div className="clearfix">
                  <strong>{ customer.get('name') }</strong>
                </div>
                <div className="clearfix mt1">
                  <span style={ Typography.secondary }>{ order.get('orderId') }</span>
                </div>
                <div className="clearfix mt1">
                  { order.get('numberOfItems') } artikelen
                </div>
                <div className="clearfix mt1">
                  <span style={ Typography.time }>
                    <IconAlarm color={ DbkColors.timeColor } style={ {height: '17px'} }/>
                    <span> { order.get('placedAt') }</span>
                  </span>
                </div>
              </div>
            </ListItem>
          </Link>
          { order.get('assigned') ? this.renderStatusBar(order.get('assignee'), order.get('placedAt')) : <Divider /> }
        </div>
      );
    });

    return orderListItems;
  }

  renderStatusBar(assignee) {
    const assignedToYou = assignee.get('id') === this.props.session.getIn(['user', 'number']);

    return (
      <div>
        <div className="mx-auto" style={ Typography.arrowUp }/>
        <div
          className="block"
          style={ Object.assign({}, OrderListStyles.orderItemAssignedStatus, OrderListStyles.statusAssignedToYou) }>
          <span className="h6 col-10 align-middle inline">
            { 'In behandeling door ' }
            <strong>{ assignedToYou ? 'Jou' : assignee.get('name', '') }</strong>
          </span>
        </div>
      </div>
    );
  }

  render() {
    const { assignedOrders, unassignedOrders, orderListData } = this.props;
    const tabIndex = this.state.tabIndex;

    return (
      <div>
        <Tabs
          value={ tabIndex }
          onChange={this.handleTabChange.bind(this)}>
          <Tab
            value={0}
            style={ Object.assign({}, Headings.dbkHeading, Headings.dbkHeadingH2) }
            label={
              <span>
                Openstaand
                <Badge
                  badgeContent={ orderListData.get('numberOfUnassigned') }
                  primary={ tabIndex === 0 }
                  style={ TabStyle.tabBadge }
                />
              </span>
            }
          />
          <Tab
            value={1}
            style={ Object.assign({}, Headings.dbkHeading, Headings.dbkHeadingH2) }
            label={
              <span>
                In Behandeling
                <Badge
                  badgeContent={ orderListData.get('numberOfAssigned') }
                  primary={ tabIndex === 1 }
                  style={ TabStyle.tabBadge }
                />
              </span>
            }
          />
        </Tabs>
        <SwipeableViews
          index={ tabIndex }
          onChangeIndex={this.handleTabChange.bind(this)}>

          <Container size={4} center>
            { unassignedOrders.get('isLoading') ? this.renderLoading() : [] }
            { unassignedOrders.get('dataError') ? this.renderError() : [] }
            <List>
              { !unassignedOrders.get('isLoading') && !unassignedOrders.get('dataError') ? this.renderOrderList(unassignedOrders.get('items')) : [] }
              { (!unassignedOrders.get('isLoading') && !unassignedOrders.get('dataError') && unassignedOrders.get('items').size === 0) ? <div>No orders found</div> : [] }
            </List>
          </Container>

          <Container size={4} center>
            { assignedOrders.get('isLoading') ? this.renderLoading() : [] }
            { assignedOrders.get('dataError') ? this.renderError() : [] }
            <List>
              { !assignedOrders.get('isLoading') && !assignedOrders.get('dataError') ? this.renderOrderList(assignedOrders.get('items')) : [] }
              { (!assignedOrders.get('isLoading') && !assignedOrders.get('dataError') && assignedOrders.get('items').size === 0) ? <div>No orders found</div> : [] }
            </List>
          </Container>
        </SwipeableViews>
      </div>
    );
  }

  handleTabChange(value) {
    if (value !== this.state.tabIndex) {
      if (value === 0) {
        this.props.orderUnassignedListRequest();
      } else {
        this.props.orderAssignedListRequest();
      }
    }

    this.setState({
      tabIndex: value,
    });
  }
}

export default connect(
  state => ({
    session: state.session,
    assignedOrders: state.orderList.get('assignedOrders'),
    unassignedOrders: state.orderList.get('unassignedOrders'),
    orderListData: state.orderList,
  }),
  dispatch => bindActionCreators({ orderAssignedListRequest, orderUnassignedListRequest }, dispatch)
)(OrderListPage);
