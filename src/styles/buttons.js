import DbkColors from './colors';

export default {
  orderAction: {
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    color: '#fff',
    backgroundColor: '#000',
    height: '38px',
    borderRadius: '2em',
  },
  orderActionSuccess: {
    backgroundColor: DbkColors.pickedUpColor,
  },
  orderActionFail: {
    backgroundColor: DbkColors.notPickedUp,
  },
};
