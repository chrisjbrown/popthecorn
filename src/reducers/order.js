import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_ERROR,
  ORDER_ASSIGN_REQUEST,
  ORDER_ASSIGN_SUCCESS,
  ORDER_ASSIGN_ERROR,
  ORDER_COMPLETE_REQUEST,
  ORDER_COMPLETE_SUCCESS,
  ORDER_COMPLETE_ERROR,
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
      return state.merge(fromJS({
        dataError: '',
        isLoading: true,
      }));
    case ITEM_RESERVE_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case ITEM_RESERVE_SUCCESS:
      const itemIndex = state.get('order').get('items').findIndex((item) => {
        return item.get('id') === action.payload.itemId;
      });

      return state
        .setIn(['order', 'items', itemIndex, 'status'], 'RESERVED')
        .merge(fromJS({
          dataError: '',
          isLoading: false,
        }));
    case ORDER_COMPLETE_REQUEST:
      return state.merge(fromJS({
        dataError: '',
        isLoading: true,
      }));
    case ORDER_COMPLETE_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case ORDER_COMPLETE_SUCCESS:
      return state.merge(fromJS({
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default orderReducer;
