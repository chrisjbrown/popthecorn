import { watchLogin, watchInit, watchTogglePush } from './session';

// single entry point to start all Sagas at once
export default function* initSagas() {
  yield [
    watchLogin(),
    watchInit(),
    watchTogglePush(),
  ];
}
