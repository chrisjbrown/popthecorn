import React, { Component, PropTypes} from 'react';

class Navigator extends Component {
  static propTypes = {
    children: PropTypes.node,
    testid: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const  { children, testid } = this.props;

    return (
      <nav data-testid={ testid } className="flex items-center p1 bg-white border-bottom">
        { children }
      </nav>
    );
  }
}

export default Navigator;
