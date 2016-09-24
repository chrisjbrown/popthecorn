import { watchDiscoverMovie } from './discover';
import { watchGetGenres } from './genres';
import { watchConfig } from './config';

// single entry point to start all Sagas at once
export default function* initSagas() {
  yield [
    watchConfig(),
    watchGetGenres(),
    watchDiscoverMovie(),
  ];
}
