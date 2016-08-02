import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { modal } from './modal.css';

class ModalContent extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    const classDef = classNames('p2', 'z2', 'bg-white', 'relative', modal);

    return (
      <div className={ classDef }>
        { children }
      </div>
    );
  }
}

export default ModalContent;
