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
      tabIndex: props.orderListData.get('listType', 0),
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

  renderStatusBar(assignee) {
    const assignedToYou = assignee.get('id', '') === this.props.session.getIn(['user', 'number']);

    return (
      <div>
        <div className="mx-auto" style={ Object.assign({}, Typography.arrowUp, assignedToYou ? Typography.arrowUpAssignedToYou : {}) }/>
        <div
          className="block"
          style={ Object.assign({}, OrderListStyles.orderItemAssignedStatus, assignedToYou ? OrderListStyles.statusAssignedToYou : {}) }>
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
    const unassignedItems = unassignedOrders.get('items', false);
    const assignedItems = assignedOrders.get('items', false);
    const renderUnassigned = !unassignedOrders.get('isLoading', false) && !unassignedOrders.get('dataError', false) && unassignedItems !== null;
    const renderAssigned = !assignedOrders.get('isLoading', false) && !assignedOrders.get('dataError', false) && assignedItems !== null;
    const noUnassigned = !unassignedOrders.get('isLoading', false) && !unassignedOrders.get('dataError', false) && unassignedItems === null;
    const noAssigned = !assignedOrders.get('isLoading', false) && !assignedOrders.get('dataError', false) && assignedOrders === null;

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
                  badgeContent={ orderListData.get('numberOfUnassigned', 0) }
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
                  badgeContent={ orderListData.get('numberOfAssigned', 0) }
                  primary={ tabIndex === 1 }
                  style={ TabStyle.tabBadge }
                />
              </span>
            }
          />
        </Tabs>
        <SwipeableViews
          index={ tabIndex }
          animateTransitions={ false }
          onChangeIndex={this.handleTabChange.bind(this)}>

          <Container size={4} center>
            { unassignedOrders.get('isLoading', false) ? this.renderLoading() : [] }
            { unassignedOrders.get('dataError', false) ? this.renderError() : [] }
            <List>
              { renderUnassigned ? this.mapOrders(unassignedItems) : [] }
              { noUnassigned ? <div>No orders found</div> : [] }
            </List>
          </Container>

          <Container size={4} center>
            { assignedOrders.get('isLoading', false) ? this.renderLoading() : [] }
            { assignedOrders.get('dataError', false) ? this.renderError() : [] }
            <List>
              { renderAssigned ? this.mapOrders(this.filterCurrentUser(assignedItems)) : [] }
              { renderAssigned ? this.mapOrders(this.filterOtherUsers(assignedItems)) : [] }
              { noAssigned ? <div>No orders found</div> : [] }
            </List>
          </Container>
        </SwipeableViews>
      </div>
    );
  }

  filterOtherUsers(orders) {
    const currentUser = this.props.session.getIn(['user', 'number'], '');
    const otherUserOrders = orders.filter((order) => {
      return order.getIn(['assignee', 'id'], '') !== currentUser;
    });

    return otherUserOrders;
  }

  filterCurrentUser(orders) {
    const currentUser = this.props.session.getIn(['user', 'number'], '');
    const currentUserOrders = orders.filter((order) => {
      return order.getIn(['assignee', 'id'], '') === currentUser;
    });

    return currentUserOrders;
  }

  mapOrders(orders) {
    return orders.map((order, i) => {
      const customer = order.get('customer');

      return (
        <div key={ i }>
          <Link to={ '/pickingorders/' + order.get('id', '') }>
            <ListItem
              rightIcon={
                <IconChevronRight style={ OrderListStyles.itemArrow }/>
              }>
              <div>
                <div className="clearfix">
                  <strong>{ customer.get('name', '') }</strong>
                </div>
                <div className="clearfix mt1">
                  <span style={ Typography.secondary }>{ order.get('orderId', '') }</span>
                </div>
                <div className="clearfix mt1">
                  { order.get('numberOfItems', '') } artikelen
                </div>
                <div className="clearfix mt1">
                  <span style={ Typography.time }>
                    <IconAlarm color={ DbkColors.timeColor } style={ {height: '17px'} }/>
                    <span> { order.get('placedAt', '') }</span>
                  </span>
                </div>
              </div>
            </ListItem>
          </Link>
          { order.get('assigned', false) ? this.renderStatusBar(order.get('assignee', ''), order.get('placedAt', '')) : <Divider /> }
        </div>
      );
    });
  }

  handleTabChange(value) {
    if (value !== this.state.tabIndex) {
      if (value === 0) {
        this.props.orderUnassignedListRequest();
      } else {
        this.props.orderAssignedListRequest();
      }

      this.setState({
        tabIndex: value,
      });
    }
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
