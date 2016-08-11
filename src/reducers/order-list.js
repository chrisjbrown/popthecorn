import { ORDER_LIST_SUCCESS, ORDER_LIST_ERROR, ORDER_LIST_REQUEST } from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  orders: [],
  hasError: false,
  isLoading: false,
});

function orderListReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return state.merge(fromJS({
        orders: [],
        hasError: false,
        isLoading: true,
      }));
    case ORDER_LIST_ERROR:
      return state.merge(fromJS({
        hasError: true,
      }));
    case ORDER_LIST_SUCCESS:
      return state.merge(fromJS({
        orders: action.payload.items,
        hasError: false,
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderListReducer;
