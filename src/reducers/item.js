import {
  ITEM_RESERVE_REQUEST,
  ITEM_RESERVE_SUCCESS,
  ITEM_RESERVE_ERROR,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  dataError: '',
  isLoading: false,
});

function itemReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
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

export default itemReducer;
