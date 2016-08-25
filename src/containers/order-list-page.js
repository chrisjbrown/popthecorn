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
      tabIndex: 0,
    };
  }

  componentDidMount() {
    if (this.state.tabIndex === 0) {
      this.props.orderUnassignedListRequest();
    } else {
      this.props.orderAssignedListRequest();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.tabIndex !== this.state.tabIndex) {
      if (this.state.tabIndex === 0) {
        this.props.orderUnassignedListRequest();
      } else {
        this.props.orderAssignedListRequest();
      }
    }
  }

  renderLoading() {
    return (
      <div className="center">
        <CircularProgress color={ DbkColors.accent1Color } size={ 1.5 }  />
      </div>
    );
  }

  renderError() {
    return (
      <strong> Error requesting item list </strong>
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
          <Divider />
        </div>
      );
    });

    return orderListItems;
  }

  render() {
    const { assignedOrders, unassignedOrders, orderListData } = this.props;

    return (
      <div>
        <Tabs
          value={this.state.tabIndex}
          onChange={this.handleTabChange.bind(this)}>
          <Tab
            value={0}
            style={ Object.assign({}, Headings.dbkHeading, Headings.dbkHeadingH2) }
            label={
              <span>
                Openstaand
                <Badge
                  badgeContent={ orderListData.get('numberOfUnassigned') }
                  primary={ this.state.tabIndex === 0 ? true : false }
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
                  primary={ this.state.tabIndex === 1 ? true : false }
                  style={ TabStyle.tabBadge }
                />
              </span>
            }
          />
        </Tabs>
        <SwipeableViews
          index={this.state.tabIndex}
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
    this.setState({
      tabIndex: value,
    });
  }
}

export default connect(
  state => ({
    assignedOrders: state.orderList.get('assignedOrders'),
    unassignedOrders: state.orderList.get('unassignedOrders'),
    orderListData: state.orderList,
  }),
  dispatch => bindActionCreators({ orderAssignedListRequest, orderUnassignedListRequest }, dispatch)
)(OrderListPage);
