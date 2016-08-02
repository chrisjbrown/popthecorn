import React, { Component, PropTypes } from 'react';

class Modal extends Component {

  static propTypes = {
    isVisible: PropTypes.bool,
    children: PropTypes.node,
    testid: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { isVisible, children, testid } = this.props;

    const styles = {
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? 1 : 0,
    };

    return (
      <div data-testid={ testid } style={ styles }
        className="fixed top-0 bottom-0 left-0 right-0 z1 bg-darken-3">
        { children }
      </div>
    );
  }
}

export default Modal;
