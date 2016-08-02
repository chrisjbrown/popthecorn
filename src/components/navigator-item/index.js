import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class NavigatorItem extends Component {

  static propTypes = {
    children: PropTypes.node,
    isVisible: PropTypes.bool,
    mr: PropTypes.bool,
    ml: PropTypes.bool,
    testid: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, isVisible, mr, ml, testid } = this.props;

    const navItemClasses = classNames('truncate', {
      hide: !isVisible,
      mr2: mr,
      ml2: ml,
    });

    return (
      <div data-testid={ testid } className={ navItemClasses }>
        { children }
      </div>
    );
  }
}

export default NavigatorItem;
