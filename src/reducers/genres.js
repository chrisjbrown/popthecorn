import {
  GENRES_REQUEST,
  GENRES_SUCCESS,
  GENRES_ERROR,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  items: [],
  dataError: '',
  isLoading: false,
});

function genreReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case GENRES_REQUEST:
      return state.merge(fromJS({
        items: [],
        dataError: '',
        isLoading: true,
      }));
    case GENRES_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error,
      }));
    case GENRES_SUCCESS:
      return state.merge(fromJS({
        items: action.payload.genres || [],
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default genreReducer;
