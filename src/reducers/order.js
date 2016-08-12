import { ORDER_SUCCESS, ORDER_ERROR, ORDER_REQUEST } from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  orderData: {},
  dataError: '',
  isLoading: false,
});

function orderReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_REQUEST:
      return state.merge(fromJS({
        orderData: {},
        dataError: '',
        isLoading: true,
      }));
    case ORDER_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.message,
      }));
    case ORDER_SUCCESS:
      return state.merge(fromJS({
        orderData: action.payload.order,
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderReducer;
