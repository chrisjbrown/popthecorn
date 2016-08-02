import React, { Component, PropTypes } from 'react';

class FormLabel extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <label>
        { children }
      </label>
    );
  }
}

export default FormLabel;
