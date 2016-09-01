import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import CircularProgress from 'material-ui/CircularProgress';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import IconSearch from 'material-ui/svg-icons/action/search';
import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

import Container from 'app/components/container';
import * as SearchActions from 'app/actions/search';

import DbkColors from 'app/styles/colors';
import OrderListStyles from 'app/styles/order-list';
import Typography from 'app/styles/typography';

class SearchPage extends Component {

  static propTypes = {
    searchItemRequest: PropTypes.func,
    searchItemReset: PropTypes.func,
    searchCriteria: PropTypes.object,
    foundItems: PropTypes.object,
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
  };

  constructor(props) {
    super(props);
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

  renderLoading() {
    return (
      <div className="center">
        <CircularProgress color={ DbkColors.accent1Color } size={ 1.5 }  />
      </div>
    );
  }

  renderError() {
    return (
      <strong> { this.props.dataError } </strong>
    );
  }

  renderNoResults() {
    const searchString = this.props.searchCriteria.get('customer', false);

    if (searchString && searchString !== '') {
      return (<span>No results found</span>);
    }

    return (<span className="mt3">Enter a customer name to search</span>);
  }

  renderSearchResults() {
    const { foundItems } = this.props;

    const searchResults = foundItems.map((item, i) => {
      const customer = item.get('customer');

      return (
        <div key={ i }>
          <Link to={ '/pickingorders/' + item.get('id') }>
            <ListItem
              rightIcon={
                <IconChevronRight style={ OrderListStyles.itemArrow }/>
              }>
              <div>
                <div className="clearfix">
                  <strong>{ customer.get('name') }</strong>
                </div>
                <div className="clearfix mt1">
                  <span style={ Typography.secondary }>{ item.get('orderId') }</span>
                  <span
                    className="ml1"
                    style={ Object.assign({}, Typography.indicator, this.getIndicatorClass(item.get('status', ''))) }/>
                </div>
                <div className="clearfix mt1">
                  { item.get('numberOfItems') } artikelen
                </div>
              </div>
            </ListItem>
          </Link>
          <Divider />
        </div>
      );
    });

    return (
      searchResults.size > 0 ? searchResults : this.renderNoResults()
    );
  }

  render() {
    const { isLoading, dataError, searchCriteria } = this.props;

    return (
      <div>
        <div
          className="flex"
          style={ {backgroundColor: '#e8e8e8'} }>
          <input
            value={ searchCriteria.get('customer', '') }
            placeholder="Zoeken"
            className="flex-auto pt2 pb2 pl1 pr1"
            onChange={ this.handleChange.bind(this)}
            style={ {backgroundColor: '#e8e8e8'} }
          />
          <div style={ {width: '45px', height: '45px'} }>
            <IconSearch className="relative" style={ {top: '10px', left: '10px'} } />
          </div>
        </div>
        <Container size={4} center>
          { isLoading ? this.renderLoading() : [] }
          { dataError ? this.renderError() : [] }

          <List>
            { !isLoading && !dataError ? this.renderSearchResults() : [] }
          </List>
        </Container>
      </div>
    );
  }

  handleChange(event) {
    if (event.currentTarget.value !== '') {
      this.props.searchItemRequest({customer: event.currentTarget.value});
    } else {
      this.props.searchItemReset();
    }
  }
}

export default connect(
  state => ({
    searchCriteria: state.search.get('searchCriteria'),
    foundItems: state.search.get('items'),
    dataError: state.search.get('dataError'),
    isLoading: state.search.get('isLoading'),
  }),
  dispatch => bindActionCreators(SearchActions, dispatch)
)(SearchPage);
