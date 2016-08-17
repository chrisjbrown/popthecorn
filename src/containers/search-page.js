import React, { Component, PropTypes } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

import Container from 'app/components/container';

class SearchPage extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    dataError: PropTypes.string,
  };

  constructor(props) {
    super(props);
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
      <strong> { this.props.dataError } </strong>
    );
  }

  renderSearch() {
    return (
      <TextField
        hintText="Search"
        floatingLabelText="Search"
        fullWidth={ true }
        onChange={ this.handleChange.bind(this)}
      />
    );
  }

  render() {
    const { isLoading, dataError } = this.props;

    return (
      <Container size={4} center>

        { isLoading ? this.renderLoading() : [] }
        { dataError ? this.renderError() : [] }
        { !isLoading && !dataError ? this.renderSearch() : [] }

      </Container>
    );
  }

  handleChange(event) {
    if (event.currentTarget.value !== '') {
      console.log(event.currentTarget.value);
    }
  }
}

export default connect(
  () => { return {}; },
)(SearchPage);
