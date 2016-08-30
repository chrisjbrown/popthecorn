import DbkColors from './colors';

export default {
  orderList: {
  },
  orderItem: {
  },
  orderItemAssignedStatus: {
    height: '30px',
    paddingLeft: '10px',
    color: DbkColors.alternateTextColor,
    backgroundColor: DbkColors.disabledColor,
  },
  statusAssignedToYou: {
    backgroundColor: DbkColors.accent2Color,
  },
  itemList: {
    paddingRight: '5px',
    paddingLeft: '5px',
  },
  item: {
  },
  itemActionContainer: {
    width: '60px',
    height: '60px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemAction: {
    width: '36px',
    height: '36px',
    backgroundColor: '#fff',
    border: '3px solid ' + DbkColors.accent1Color,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActionActive: {
    backgroundColor: DbkColors.accent1Color,
  },
  itemAvatar: {
    margin: '0 5px',
  },
  itemPrimaryText: {
    textTransform: 'uppercase',
    marginBottom: '0.5em',
    marginTop: 0,
  },
  itemSecondaryText: {
  },
  itemArrow: {
    top: '26px',
    width: '36px',
    height: '36px',
  },
};
