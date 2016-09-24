import {
  DISCOVER_MOVIE_REQUEST,
  DISCOVER_MOVIE_SUCCESS,
  DISCOVER_MOVIE_ERROR,
  DISCOVER_MOVIE_RESET,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  items: [],
  discoverCriteria: {},
  dataError: '',
  isLoading: false,
});

function discoverMovieReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case DISCOVER_MOVIE_REQUEST:
      return state.merge(fromJS({
        items: [],
        discoverCriteria: action.payload.criteria,
        dataError: '',
        isLoading: true,
      }));
    case DISCOVER_MOVIE_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case DISCOVER_MOVIE_SUCCESS:
      return state.merge(fromJS({
        items: action.payload.discoverResults.results || [],
        dataError: '',
        isLoading: false,
      }));
    case DISCOVER_MOVIE_RESET:
      return state.merge(INITIAL_STATE);
    default:
      return state;
  }
}

export default discoverMovieReducer;
