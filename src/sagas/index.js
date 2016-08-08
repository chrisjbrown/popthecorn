import { watchLogin, watchInit, watchTogglePush } from './session';
import { watchOrder } from './order';
import { watchOrderList } from './order-list';

// single entry point to start all Sagas at once
export default function* initSagas() {
  yield [
    watchLogin(),
    watchInit(),
    watchTogglePush(),
    watchOrder(),
    watchOrderList(),
  ];
}
