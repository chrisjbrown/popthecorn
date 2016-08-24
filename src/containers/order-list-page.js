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
import * as OrderListActions from 'app/actions/order-list';

import headings from 'app/styles/headings';
import orderListStyles from 'app/styles/order-list';
import dbkColors from 'app/styles/colors';
import tabStyle from 'app/styles/tabs';

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

  renderLoading() {
    return (
      <div className="center">
        <CircularProgress color={ dbkColors.accent1Color } size={ 1.5 }  />
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
                <IconChevronRight style={ orderListStyles.itemArrow }/>
              }>
              <div>
                <div className="clearfix">
                  { customer.get('name') }
                </div>
                <div className="clearfix mt1">
                  { order.get('orderId') }
                </div>
                <div className="clearfix mt1">
                  { order.get('quantity') } artikelen
                </div>
                <div className="clearfix mt1">
                  <span>
                    <IconAlarm style={ {height: '17px'} }/>
                    { order.get('placedAt') }
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
            style={ Object.assign({}, headings.dbkHeading, headings.dbkHeadingH2) }
            label={
              <span>
                Openstaand
                <Badge
                  badgeContent={ orderListData.get('numberOfUnassigned') }
                  primary={ this.state.tabIndex === 0 ? true : false }
                  style={ tabStyle.tabBadge }
                />
              </span>
            }
          />
          <Tab
            value={1}
            style={ Object.assign({}, headings.dbkHeading, headings.dbkHeadingH2) }
            label={
              <span>
                In Behandeling
                <Badge
                  badgeContent={ orderListData.get('numberOfAssigned') }
                  primary={ this.state.tabIndex === 1 ? true : false }
                  style={ tabStyle.tabBadge }
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
  dispatch => bindActionCreators(Object.assign({}, OrderListActions), dispatch)
)(OrderListPage);
