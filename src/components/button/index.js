import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Button extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, type, onClick, children, ...extraProps } = this.props;

    const buttonClasses = classNames('btn', 'btn-primary', className);

    return (
      <button
        type={ type }
        className={ buttonClasses }
        onClick={ onClick }
        {...extraProps}>
        { children }
      </button>
    );
  }
}

export default Button;
