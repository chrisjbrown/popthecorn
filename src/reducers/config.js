import {
  CONFIG_REQUEST,
  CONFIG_SUCCESS,
  CONFIG_ERROR,
} from 'app/actions';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  changeKeys: null,
  images: null,
  dataError: '',
  isLoading: false,
});

function configReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case CONFIG_REQUEST:
      return state.merge(fromJS({
        changeKeys: null,
        images: null,
        dataError: '',
        isLoading: true,
      }));
    case CONFIG_ERROR:
      return state.merge(fromJS({
        isLoading: false,
        dataError: action.payload.error.message,
      }));
    case CONFIG_SUCCESS:
      return state.merge(fromJS({
        changeKeys: action.payload.config.change_keys,
        images: action.payload.config.images,
        dataError: '',
        isLoading: false,
      }));
    default:
      return state;
  }
}

export default configReducer;
