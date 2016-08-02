import React, { Component, PropTypes } from 'react';
import Button from '../button';

class Counter extends Component {

  static propTypes = {
    counter: PropTypes.number,
    increment: PropTypes.func,
    decrement: PropTypes.func,
    testid: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { counter, increment, decrement, testid } = this.props;

    return (
      <div className="flex" data-testid={ testid }>
        <Button data-ref="decrementButton" className="bg-black col-2"
          onClick={ decrement }>
          -
        </Button>

        <div data-ref="result" className="flex-auto center h1">
          { counter }
        </div>

        <Button data-ref="incrementButton" className="col-2"
          onClick={ increment }>
          +
        </Button>
      </div>
    );
  }
}

export default Counter;
