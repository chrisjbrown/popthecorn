export const ITEM_LIST_REQUEST = 'App/ITEM_LIST_REQUEST';
export function requestItemList() {
  return {
    type: ITEM_LIST_REQUEST,
  };
}

export const ITEM_LIST_SUCCESS = 'App/ITEM_LIST_SUCCESS';
export function itemListSuccess(orders) {
  return {
    type: ITEM_LIST_SUCCESS,
    payload: orders,
  };
}

export const ITEM_LIST_ERROR = 'App/ITEM_LIST_ERROR';
export function itemListError(error) {
  return {
    type: ITEM_LIST_ERROR,
    payload: {
      error: error,
    },
  };
}
