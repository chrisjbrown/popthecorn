import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const statusClasses = {
  info: 'bg-blue white',
  warning: 'bg-yellow black',
  success: 'bg-green black',
  error: 'bg-red white',
};

class Alert extends Component {

  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
    status: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
    testid: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { testid, isVisible, status, children, ...extraProps } = this.props;

    const alertClasses = classNames(['p2', 'bold'], {
      block: isVisible,
      hide: !isVisible,
      [statusClasses[status]]: true,
    });

    return (
      <div
        data-testid={ testid }
        className={ alertClasses }
        { ...extraProps }>
        { children }
      </div>
    );
  }
}

export default Alert;
