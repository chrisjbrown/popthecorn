import { initAuthSagas, watchInit, watchTogglePush } from './session';
import { watchOrder, watchOrderComplete, watchOrderAssign } from './order';
import { watchItemList } from './item-list';
import { watchOrderAssignedList, watchOrderUnassignedList } from './order-list';
import { watchItem, watchItemReserve } from './item';
import { watchSearchItems } from './search';

// single entry point to start all Sagas at once
export default function* initSagas() {
  yield [
    initAuthSagas(),
    watchInit(),
    watchTogglePush(),
    watchOrder(),
    watchOrderAssign(),
    watchOrderComplete(),
    watchItemList(),
    watchItem(),
    watchItemReserve(),
    watchSearchItems(),
    watchOrderAssignedList(),
    watchOrderUnassignedList(),
  ];
}
