import React, { Component, PropTypes } from 'react';

class Form extends Component {

  static propTypes = {
    children: PropTypes.node,
    handleSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children, handleSubmit } = this.props;

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (document.activeElement) {
            document.activeElement.blur();
          }
          handleSubmit();
        }}>
        { children }
      </form>
    );
  }
}

export default Form;
