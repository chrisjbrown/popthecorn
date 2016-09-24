export const GENRES_REQUEST = 'App/GENRES_REQUEST';
export function genresRequest() {
  return {
    type: GENRES_REQUEST,
  };
}

export const GENRES_SUCCESS = 'App/GENRES_SUCCESS';
export function genresSuccess(genres) {
  return {
    type: GENRES_SUCCESS,
    payload: {
      genres,
    },
  };
}

export const GENRES_ERROR = 'App/GENRES_ERROR';
export function genresError(error) {
  return {
    type: GENRES_ERROR,
    payload: {
      error: error,
    },
  };
}
