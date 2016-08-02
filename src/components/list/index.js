import React, { Component, PropTypes } from 'react';

class List extends Component {

  static propTypes = {
    children: PropTypes.node,
    testid: PropTypes.string,
  };

  render() {
    const { children, testid } = this.props;

    return (
      <ul data-testid={testid} className="list-reset fit">
        { children }
      </ul>
    );
  }
}

export default List;
