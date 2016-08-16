import { initAuthSagas, watchInit, watchTogglePush } from './session';
import { watchOrder } from './order';
import { watchItemList } from './item-list';
import { watchItemReserve } from './item';

// single entry point to start all Sagas at once
export default function* initSagas() {
  yield [
    initAuthSagas(),
    watchInit(),
    watchTogglePush(),
    watchOrder(),
    watchItemList(),
    watchItemReserve(),
  ];
}
