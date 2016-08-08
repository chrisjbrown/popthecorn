import { ORDER_SUCCESS, ORDER_ERROR, ORDER_REQUEST } from 'base/constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  id: 0,
  name: '',
  customer: '',
  products: [],
  hasError: false,
  isLoading: false,
});

function orderReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_REQUEST:
      return state.merge(fromJS({
        id: 0,
        name: '',
        customer: '',
        products: [],
        hasError: false,
        isLoading: true,
      }));
    case ORDER_ERROR:
      return state.merge(fromJS({
        hasError: true,
      }));
    case ORDER_SUCCESS:
      return state.merge(fromJS({
        id: action.payload.id,
        name: action.payload.name,
        customer: action.payload.customer,
        products: action.payload.products,
        hasError: false,
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderReducer;
