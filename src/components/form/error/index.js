import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class FormError extends Component {

  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
    testid: PropTypes.string,
  };

  render() {
    const { children, isVisible, testid, ...extraProps } = this.props;

    const formErrorClasses = classNames('bold', 'black', { 'hide': !isVisible });

    return (
      <div data-testid={testid} className={ formErrorClasses } {...extraProps}>
        { children }
      </div>
    );
  }
}

export default FormError;
