export const ITEM_REQUEST = 'App/ITEM_REQUEST';
export function itemRequest(orderId, itemId) {
  return {
    type: ITEM_REQUEST,
    payload: {
      orderId: orderId,
      itemId: itemId,
    },
  };
}

export const ITEM_SUCCESS = 'App/ITEM_SUCCESS';
export function itemSuccess(itemId) {
  return {
    type: ITEM_SUCCESS,
    payload: {
      itemId: itemId,
    },
  };
}

export const ITEM_ERROR = 'App/ITEM_ERROR';
export function itemError(error) {
  return {
    type: ITEM_ERROR,
    payload: {
      error: error,
    },
  };
}

export const ITEM_RESERVE_REQUEST = 'App/ITEM_RESERVE_REQUEST';
export function itemReserveRequest(orderId, itemId, itemIndex) {
  return {
    type: ITEM_RESERVE_REQUEST,
    payload: {
      orderId: orderId,
      itemId: itemId,
      itemIndex: itemIndex,
    },
  };
}

export const ITEM_RESERVE_SUCCESS = 'App/ITEM_RESERVE_SUCCESS';
export function itemReserveSuccess(itemId, itemIndex) {
  return {
    type: ITEM_RESERVE_SUCCESS,
    payload: {
      itemId: itemId,
      itemIndex: itemIndex,
    },
  };
}

export const ITEM_RESERVE_ERROR = 'App/ITEM_RESERVE_ERROR';
export function itemReserveError(error, itemIndex) {
  return {
    type: ITEM_RESERVE_ERROR,
    payload: {
      error: error,
      itemIndex: itemIndex,
    },
  };
}
