import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconAdd from 'material-ui/svg-icons/content/add';
import IconCheck from 'material-ui/svg-icons/navigation/check';
import {Tabs, Tab} from 'material-ui/Tabs';
import Badge from 'material-ui/Badge';

import Container from 'app/components/container';
import { delay } from 'app/utils/delay';
import * as ItemListActions from 'app/actions/item-list';
import * as ItemActions from 'app/actions/item';

class ItemListPage extends Component {

  static propTypes = {
    items: PropTypes.object,
    item: PropTypes.object,
    requestItemList: PropTypes.func,
    itemReserveRequest: PropTypes.func,
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      confirmItem: null,
    };
  }

  componentDidMount() {
    this.props.requestItemList();
  }

  componentWillUnmount() {
    if (this.confirmableDelay) {
      this.confirmableDelay.cancel();
    }
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
      <strong> Error requesting item list </strong>
    );
  }

  renderActionButton(status, itemId) {
    if (this.state.confirmItem === itemId) {
      return (
        <RaisedButton
          onTouchTap={ this.updateItem.bind(this, itemId) }
          className="clearfix"
          style={ {top: 'inherit'} }
          backgroundColor="#b0b0b0">
          Confirm
        </RaisedButton>
      );
    }

    switch (status) {
      case 'RESERVED':
        return (
          <FloatingActionButton
            className="clearfix"
            mini={true}
            style={ {top: 'inherit'} }>
            <IconCheck />
          </FloatingActionButton>
        );
      default:
        return (
          <FloatingActionButton
            onTouchTap={ this.setConfirm.bind(this, itemId) }
            className="clearfix"
            mini={true}
            style={ {top: 'inherit'} }>
              <IconAdd />
          </FloatingActionButton>
        );
    }
  }

  renderItemList() {
    const items = this.props.items;

    const itemListItems = items.map((item, i) => {
      const detail = item.get('order');
      const customer = item.get('customer');
      const product = item.get('product');

      return (
        <div key={ i }>
          <Link to={ '/orders/' + detail.get('id') }>
            <ListItem
              leftAvatar={<Avatar src={product.get('imageUrl')} />}
              rightIconButton={
                this.renderActionButton(item.get('status'), item.get('id'))
              }
              primaryText={ product.get('name') }
              secondaryText={
                <p className="clearfix">
                  { customer.get('name') }
                  <br/>
                  { item.get('status') }
                </p>
              }
              secondaryTextLines={2}
            />
          </Link>
          <Divider />
        </div>
      );
    });

    return itemListItems;
  }

  render() {
    const { isLoading, dataError, items, item } = this.props;
    const { confirmItem } = this.state;

    if (confirmItem) {
      if (this.confirmableDelay) {
        this.confirmableDelay.cancel();
      }

      this.confirmableDelay = delay(3000);

      this.confirmableDelay.then( () => {
        this.setState({
          confirmItem: null,
        });
      });
    }

    return (
      <Tabs>
        <Tab
          label={
            <span>
              Openstaand
              <Badge
                badgeContent={ items.size }
                primary={ true }
                style={ {padding: '16px 24px 0px 12px'} }
              />
            </span>
          }>
          <Container size={4} center>
            { (isLoading || item.get('isLoading')) ? this.renderLoading() : [] }
            { dataError ? this.renderError() : [] }
            <List>
              { (!isLoading && !item.get('isLoading')) && !dataError ? this.renderItemList() : [] }
            </List>
          </Container>
        </Tab>
        <Tab
          label={
            <span>
              In Behandeling
              <Badge
                badgeContent={ 0 }
                primary={ true }
                style={ {padding: '16px 24px 0px 12px'} }
              />
            </span>
          }>
          <div>
            <h2>Tab Two</h2>
          </div>
        </Tab>
      </Tabs>
    );
  }

  setConfirm(itemId, event) {
    event.preventDefault();

    this.setState({
      confirmItem: itemId,
    });
  }

  updateItem(itemId, event) {
    event.preventDefault();

    if (this.state.confirmItem === itemId) {
      this.props.itemReserveRequest(itemId);
    }
  }
}

export default connect(
  state => ({
    item: state.item,
    items: state.itemList.get('items'),
    dataError: state.itemList.get('dataError'),
    isLoading: state.itemList.get('isLoading'),
  }),
  dispatch => bindActionCreators(Object.assign({}, ItemListActions, ItemActions), dispatch)
)(ItemListPage);
