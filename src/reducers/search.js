import {
  SEARCH_ITEM_REQUEST,
  SEARCH_ITEM_SUCCESS,
  SEARCH_ITEM_ERROR,
  SEARCH_ITEM_RESET,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  items: [],
  searchCriteria: {},
  dataError: '',
  isLoading: false,
});

function searchItemReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SEARCH_ITEM_REQUEST:
      return state.merge(fromJS({
        items: [],
        searchCriteria: action.payload.criteria,
        dataError: '',
        isLoading: true,
      }));
    case SEARCH_ITEM_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case SEARCH_ITEM_SUCCESS:
      return state.merge(fromJS({
        items: action.payload.searchResults.data.items || [],
        dataError: '',
        isLoading: false,
      }));
    case SEARCH_ITEM_RESET:
      return state.merge(INITIAL_STATE);
    default:
      return state;
  }
}

export default searchItemReducer;
