import DbkColors from './colors';

export default {
  arrowUp: {
    width: 0,
    height: 0,
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '10px solid' + DbkColors.accent2Color,
  },
  indicator: {
    borderRadius: '50%',
    width: '8px',
    height: '8px',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '5px',
  },
  indicatorReady: {
    backgroundColor: DbkColors.readyColor,
  },
  indicatorOpen: {
    backgroundColor: DbkColors.openColor,
  },
  indicatorInProgress: {
    backgroundColor: DbkColors.inProgressColor,
  },
  multiEllipsis: {
    display: '-webkit-box',
    maxWidth: '400px',
    margin: '0 auto',
    fontSize: '15px',
    lineHeight: 1.2,
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  secondary: {
    color: DbkColors.primary2Color,
  },
  time: {
    color: DbkColors.timeColor,
  },
};
