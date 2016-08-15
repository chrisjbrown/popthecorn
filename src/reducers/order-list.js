import { ORDER_LIST_SUCCESS, ORDER_LIST_ERROR, ORDER_LIST_REQUEST } from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  orders: [],
  dataError: '',
  isLoading: false,
});

function orderListReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return state.merge(fromJS({
        orders: [],
        dataError: '',
        isLoading: true,
      }));
    case ORDER_LIST_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case ORDER_LIST_SUCCESS:
      return state.merge(fromJS({
        orders: action.payload.data.items,
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderListReducer;
