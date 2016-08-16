import {
  ITEM_LIST_REQUEST,
  ITEM_LIST_SUCCESS,
  ITEM_LIST_ERROR,
  ITEM_RESERVE_REQUEST,
  ITEM_RESERVE_SUCCESS,
  ITEM_RESERVE_ERROR,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  items: [],
  dataError: '',
  isLoading: false,
});

function itemListReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ITEM_LIST_REQUEST:
      return state.merge(fromJS({
        items: [],
        dataError: '',
        isLoading: true,
      }));
    case ITEM_LIST_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case ITEM_LIST_SUCCESS:
      return state.merge(fromJS({
        items: action.payload.data.items,
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
      return state.merge(fromJS({
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default itemListReducer;
