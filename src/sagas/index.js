import { initAuthSagas, watchInit, watchTogglePush } from './session';
import { watchOrder } from './order';
import { watchOrderList } from './order-list';

// single entry point to start all Sagas at once
export default function* initSagas() {
  yield [
    initAuthSagas(),
    watchInit(),
    watchTogglePush(),
    watchOrder(),
    watchOrderList(),
  ];
}
