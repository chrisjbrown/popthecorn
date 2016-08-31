import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
// import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';

import Container from 'app/components/container';

import dbkColors from 'app/styles/colors';

import {
  itemRequest,
} from 'app/actions/';

class ItemPage extends Component {

  static propTypes = {
    itemData: PropTypes.object,
    params: PropTypes.object,
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
    itemRequest: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const item = this.props.itemData.get('item');

    if (!item || this.props.params.itemId !== item.get('id')) {
      this.props.itemRequest(this.props.params.orderId, this.props.params.itemId);
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
      <strong> { this.props.dataError } </strong>
    );
  }

  render() {
    const { isLoading, dataError, itemData } = this.props;
    const product = itemData.getIn(['item', 'product']);

    if (isLoading) {
      return ( this.renderLoading() );
    } else if (dataError) {
      return ( this.renderError() );
    } else if (!itemData.get('item', false)) {
      return (
        <Container center>
          <span> Item not found </span>
        </Container>
      );
    }

    return (
      <Container center>
        <div className="mx3 my2 center">
          <Avatar src={ product.get('imageUrl') } size={ 250 }/>
          <div>
            { product.get('description') }
            <Divider/>
          </div>
          <div>
            <strong>Artikelnummer: </strong>
            { product.get('code') }
            <Divider/>
          </div>
        </div>
      </Container>
    );
  }
}

export default connect(
  state => ({
    itemData: state.item,
    dataError: state.item.get('dataError'),
    isLoading: state.item.get('isLoading'),
  }),
  dispatch => bindActionCreators({ itemRequest }, dispatch)
)(ItemPage);
