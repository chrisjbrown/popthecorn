import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_ASSIGN_REQUEST,
  ORDER_ASSIGN_SUCCESS,
  ORDER_ASSIGN_ERROR,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_ERROR,
  ITEM_RESERVE_REQUEST,
  ITEM_RESERVE_SUCCESS,
  ITEM_RESERVE_ERROR,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  order: {},
  dataError: '',
  isLoading: false,
});

function orderReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ORDER_REQUEST:
      return state.merge(fromJS({
        order: {},
        dataError: '',
        isLoading: true,
      }));
    case ORDER_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case ORDER_SUCCESS:
      return state.merge(fromJS({
        order: action.payload.items,
        dataError: '',
        isLoading: false,
      }));
    case ORDER_ASSIGN_REQUEST:
      return state.merge(fromJS({
        dataError: '',
        isLoading: true,
      }));
    case ORDER_ASSIGN_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case ORDER_ASSIGN_SUCCESS:
      return state.merge(fromJS({
        order: action.payload.order,
        dataError: '',
        isLoading: false,
      }));
    case ITEM_RESERVE_REQUEST:
      return state
        .setIn(['order', 'items', action.payload.itemIndex, 'isLoading'], true)
        .merge(fromJS({
          dataError: '',
        }));
    case ITEM_RESERVE_ERROR:
      return state
        .setIn(['order', 'items', action.payload.itemIndex, 'isLoading'], false)
        .merge(fromJS({
          dataError: action.payload.error.message,
        }));
    case ITEM_RESERVE_SUCCESS:
      return state
        .setIn(['order', 'items', action.payload.itemIndex, 'status'], 'RESERVED')
        .setIn(['order', 'items', action.payload.itemIndex, 'isLoading'], false)
        .merge(fromJS({
          dataError: '',
        }));
    case ORDER_UPDATE_REQUEST:
      return state.merge(fromJS({
        dataError: '',
        isLoading: true,
      }));
    case ORDER_UPDATE_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case ORDER_UPDATE_SUCCESS:
      return state.merge(fromJS({
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderReducer;
