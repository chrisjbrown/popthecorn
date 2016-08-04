import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';


import Counter from '../components/counter';
import Container from '../components/container';

function mapStateToProps(state) {
  return {
    counter: state.counter.get('count'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    increaseCounter: () => dispatch(increment()),
    decreaseCounter: () => dispatch(decrement()),
  };
}

class CounterPage extends Component {

  static propTypes = {
    counter: PropTypes.number,
    increaseCounter: PropTypes.func,
    decreaseCounter: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { counter, increaseCounter, decreaseCounter } = this.props;

    return (
      <Container testid="counter" size={2} center>
        <h2 data-testid="counter-heading" className="center caps" id="qa-counter-heading">Counter</h2>

        <Counter
          counter={ counter }
          increment={ increaseCounter }
          decrement={ decreaseCounter } />
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CounterPage);
