import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Container extends Component {
  static propTypes = {
    children: PropTypes.node,
    size: PropTypes.oneOf([1, 2, 3, 4]),
    center: PropTypes.bool,
    testid: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, size, center, testid } = this.props;

    const containerClasses = classNames('clearfix', {
      'max-width-1': size === 1,
      'max-width-2': size === 2,
      'max-width-3': size === 3,
      'max-width-4': size === 4,
      'mx-auto': center,
    });

    return (
      <div data-testid={ testid } className={ containerClasses }>
        { children }
      </div>
    );
  }
}

export default Container;
