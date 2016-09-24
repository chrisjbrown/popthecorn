export const DISCOVER_MOVIE_REQUEST = 'App/DISCOVER_MOVIE_REQUEST';
export function discoverMovieRequest(criteria) {
  return {
    type: DISCOVER_MOVIE_REQUEST,
    payload: {
      criteria: criteria,
    },
  };
}

export const DISCOVER_MOVIE_SUCCESS = 'App/DISCOVER_MOVIE_SUCCESS';
export function discoverMovieSuccess(discoverResults) {
  return {
    type: DISCOVER_MOVIE_SUCCESS,
    payload: {
      discoverResults,
    },
  };
}

export const DISCOVER_MOVIE_ERROR = 'App/DISCOVER_MOVIE_ERROR';
export function discoverMovieError(error) {
  return {
    type: DISCOVER_MOVIE_ERROR,
    payload: {
      error: error,
    },
  };
}

export const DISCOVER_MOVIE_RESET = 'App/DISCOVER_MOVIE_RESET';
export function discoverMovieReset() {
  return {
    type: DISCOVER_MOVIE_RESET,
  };
}
