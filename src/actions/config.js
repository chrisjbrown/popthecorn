export const CONFIG_REQUEST = 'App/CONFIG_REQUEST';
export function configRequest() {
  return {
    type: CONFIG_REQUEST,
  };
}

export const CONFIG_SUCCESS = 'App/CONFIG_SUCCESS';
export function configSuccess(config) {
  return {
    type: CONFIG_SUCCESS,
    payload: {
      config,
    },
  };
}

export const CONFIG_ERROR = 'App/CONFIG_ERROR';
export function configError(error) {
  return {
    type: CONFIG_ERROR,
    payload: {
      error: error,
    },
  };
}
