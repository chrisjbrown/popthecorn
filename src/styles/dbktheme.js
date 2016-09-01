import DbkColors from './colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default getMuiTheme({
  palette: DbkColors,
  fontFamily: 'Proxima\ Nova',
  appBar: {
    color: DbkColors.alternateTextColor,
    textColor: DbkColors.textColor,
  },
  raisedButton: {
    color: DbkColors.primary3Color,
    textColor: DbkColors.alternateTextColor,
    primaryColor: DbkColors.accent1Color,
    secondaryColor: DbkColors.primary3Color,
  },
  floatingActionButton: {
    color: DbkColors.primary3Color,
    iconColor: DbkColors.alternateTextColor,
  },
  tabs: {
    textColor: DbkColors.primary2Color,
    selectedTextColor: DbkColors.textColor,
  },
  badge: {
    primaryColor: DbkColors.primary3Color,
    color: DbkColors.primary2Color,
    textColor: DbkColors.alternateTextColor,
  },
});
