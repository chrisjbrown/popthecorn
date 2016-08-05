import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import { List, ListItem } from 'material-ui/List';

import Container from 'base/components/container';

// import StarIcon from 'material-ui/svg-icons/action/stars';
// import Divider from 'material-ui/Divider';

class OrderPage extends Component {

  static propTypes = {
    params: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container testid="order" size={4} center>
        <h2 data-testid="order-heading" className="caps">
          Order Page
        </h2>

        <span>{this.props.params.id}</span>
      </Container>
    );
  }
}

export default connect()(OrderPage);
