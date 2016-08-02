import React, { Component, PropTypes } from 'react';

class Input extends Component {

  static propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    fieldDefinition: PropTypes.object,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { type, placeholder, fieldDefinition, id } = this.props;

    const {
      value,
      onBlur,
      onChange,
      onFocus,
    } = fieldDefinition;

    return (
      <input
        id={ id }
        className="block col-12 mb1 input"
        type={ type }
        placeholder={ placeholder }
        value={ value }
        onBlur={ onBlur }
        onChange={ onChange }
        onFocus={ onFocus } />
    );
  }
}

export default Input;
