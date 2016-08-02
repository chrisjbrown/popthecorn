import React, { Component, PropTypes } from 'react';

class FormGroup extends Component {
  static propTypes = {
    children: PropTypes.node,
    testid: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, testid, ...extraProps } = this.props;
    return (
      <div data-testid={testid} className="py2" {...extraProps}>
        {children}
      </div>
    );
  }
}

export default FormGroup;
