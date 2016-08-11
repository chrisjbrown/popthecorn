import { ORDER_SUCCESS, ORDER_ERROR, ORDER_REQUEST } from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  orderData: null,
  hasError: false,
  isLoading: false,
});

function orderReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_REQUEST:
      return state.merge(fromJS({
        orderData: null,
        hasError: false,
        isLoading: true,
      }));
    case ORDER_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        hasError: true,
      }));
    case ORDER_SUCCESS:
      return state.merge(fromJS({
        orderData: action.payload.orderData,
        hasError: false,
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderReducer;
