import {
  ORDER_ASSIGNED_LIST_REQUEST,
  ORDER_ASSIGNED_LIST_SUCCESS,
  ORDER_ASSIGNED_LIST_ERROR,
  ORDER_UNASSIGNED_LIST_REQUEST,
  ORDER_UNASSIGNED_LIST_SUCCESS,
  ORDER_UNASSIGNED_LIST_ERROR,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  assignedOrders: {
    items: null,
    dataError: '',
    isLoading: false,
  },
  unassignedOrders: {
    items: null,
    dataError: '',
    isLoading: false,
  },
  numberOfAssigned: 0,
  numberOfUnassigned: 0,
  listType: 0,
});

function orderListReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_ASSIGNED_LIST_REQUEST:
      return state.mergeDeep(fromJS({
        listType: 1,
        assignedOrders: {
          items: null,
          dataError: '',
          isLoading: true,
        },
      }));
    case ORDER_UNASSIGNED_LIST_REQUEST:
      return state.mergeDeep(fromJS({
        listType: 0,
        unassignedOrders: {
          items: null,
          dataError: '',
          isLoading: true,
        },
      }));
    case ORDER_ASSIGNED_LIST_ERROR:
      return state.mergeDeep(fromJS({
        assignedOrders: {
          isLoading: false,
          dataError: action.payload.error.message,
        },
      }));
    case ORDER_UNASSIGNED_LIST_ERROR:
      return state.mergeDeep(fromJS({
        unassignedOrders: {
          isLoading: false,
          dataError: action.payload.error.message,
        },
      }));
    case ORDER_ASSIGNED_LIST_SUCCESS:
      return state.mergeDeep(fromJS({
        numberOfAssigned: action.payload.orders.numberOfAssigned,
        numberOfUnassigned: action.payload.orders.numberOfUnassigned,
        assignedOrders: {
          items: action.payload.orders.items,
          dataError: '',
          isLoading: false,
        },
      }));
    case ORDER_UNASSIGNED_LIST_SUCCESS:
      return state.mergeDeep(fromJS({
        numberOfAssigned: action.payload.orders.numberOfAssigned,
        numberOfUnassigned: action.payload.orders.numberOfUnassigned,
        unassignedOrders: {
          items: action.payload.orders.items,
          dataError: '',
          isLoading: false,
        },
      }));
    default:
      return state;
  }
}

export default orderListReducer;
