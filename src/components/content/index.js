import React, { Component, PropTypes} from 'react';

class Content extends Component {

  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, isVisible } = this.props;

    return (
      <main>
        { isVisible ? children : null }
      </main>
    );
  }
}

export default Content;
