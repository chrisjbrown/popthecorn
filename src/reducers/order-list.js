import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_ERROR,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  assignedOrders: [],
  unassignedOrders: [],
  dataError: '',
  isLoading: false,
});

function filterAssigned(order) {
  return order.pickingOrder.assigned;
}

function filterUnassigned(order) {
  return !order.pickingOrder.assigned;
}

function orderListReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return state.merge(fromJS({
        assignedOrders: [],
        unassignedOrders: [],
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
        assignedOrders: action.payload.orders.data.items.filter(filterAssigned),
        unassignedOrders: action.payload.orders.data.items.filter(filterUnassigned),
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderListReducer;
