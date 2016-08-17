export const SEARCH_ITEM_REQUEST = 'App/SEARCH_ITEM_REQUEST';
export function searchItemRequest(criteria) {
  return {
    type: SEARCH_ITEM_REQUEST,
    payload: {
      criteria: criteria,
    },
  };
}

export const SEARCH_ITEM_SUCCESS = 'App/SEARCH_ITEM_SUCCESS';
export function searchItemSuccess(searchResults) {
  return {
    type: SEARCH_ITEM_SUCCESS,
    payload: {
      searchResults,
    },
  };
}

export const SEARCH_ITEM_ERROR = 'App/SEARCH_ITEM_ERROR';
export function searchItemError(error) {
  return {
    type: SEARCH_ITEM_ERROR,
    payload: {
      error: error,
    },
  };
}

export const SEARCH_ITEM_RESET = 'App/SEARCH_ITEM_RESET';
export function searchItemReset() {
  return {
    type: SEARCH_ITEM_RESET,
  };
}
