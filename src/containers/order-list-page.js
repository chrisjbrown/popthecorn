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
import orderListStyle from 'app/styles/order-list';
import dbkColors from 'app/styles/colors';
import tabStyle from 'app/styles/tabs';

@Radium
class OrderListPage extends Component {

  static propTypes = {
    assignedOrders: PropTypes.object,
    unassignedOrders: PropTypes.object,
    orderListRequest: PropTypes.func,
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
    };
  }

  componentDidMount() {
    this.props.orderListRequest();
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
    const orderListItems = orders.map((item, i) => {
      const detail = item.get('order');
      const customer = item.get('customer');

      return (
        <div key={ i }>
          <Link to={ '/pickingorders/' + detail.get('id') + '/items' }>
            <ListItem
              rightIcon={
                <IconChevronRight style={ orderListStyle.itemArrow }/>
              }>
              <div>
                <div className="clearfix">
                  { customer.get('name') }
                </div>
                <div className="clearfix mt1">
                  { detail.get('id') }
                </div>
                <div className="clearfix mt1">
                  { item.get('quantity') } artikelen
                </div>
                <div className="clearfix mt1">
                  <span>
                    <IconAlarm style={ {height: '17px'} }/>
                    { detail.get('placedAt') }
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
    const { isLoading, dataError, assignedOrders, unassignedOrders } = this.props;

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
                  badgeContent={ unassignedOrders.size }
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
                  badgeContent={ assignedOrders.size }
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
            { isLoading ? this.renderLoading() : [] }
            { dataError ? this.renderError() : [] }
            <List>
              { !isLoading && !dataError ? this.renderOrderList(unassignedOrders) : [] }
              { (!isLoading && !dataError && unassignedOrders.size === 0) ? <div>No orders found</div> : [] }
            </List>
          </Container>

          <Container size={4} center>
            { isLoading ? this.renderLoading() : [] }
            { dataError ? this.renderError() : [] }
            <List>
              { !isLoading && !dataError ? this.renderOrderList(assignedOrders) : [] }
              { (!isLoading && !dataError && assignedOrders.size === 0) ? <div>No orders found</div> : [] }
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
    dataError: state.orderList.get('dataError'),
    isLoading: state.orderList.get('isLoading'),
  }),
  dispatch => bindActionCreators(Object.assign({}, OrderListActions), dispatch)
)(OrderListPage);
