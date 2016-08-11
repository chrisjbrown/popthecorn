import React, { Component } from 'react';
import { connect } from 'react-redux';

import Container from 'app/components/container';

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

class AboutPage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container size={4} center>
        <h2 className="caps">About Us</h2>
        <p>
          Rangl e.io is a next-generation HTML5 design and development firm
          dedicated to modern, responsive web and mobile applications.
        </p>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AboutPage);
