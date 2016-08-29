export const ITEM_RESERVE_REQUEST = 'App/ITEM_RESERVE_REQUEST';
export function itemReserveRequest(itemId) {
  return {
    type: ITEM_RESERVE_REQUEST,
    payload: {
      itemId: itemId,
    },
  };
}

export const ITEM_RESERVE_SUCCESS = 'App/ITEM_RESERVE_SUCCESS';
export function itemReserveSuccess(itemId) {
  return {
    type: ITEM_RESERVE_SUCCESS,
    payload: {
      itemId: itemId,
    },
  };
}

export const ITEM_RESERVE_ERROR = 'App/ITEM_RESERVE_ERROR';
export function itemReserveError(error) {
  return {
    type: ITEM_RESERVE_ERROR,
    payload: {
      error: error,
    },
  };
}
