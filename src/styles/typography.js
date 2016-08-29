import DbkColors from './colors';

export default {
  indicator: {
    borderRadius: '50%',
    width: '8px',
    height: '8px',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '5px',
  },
  indicatorOpen: {
    backgroundColor: DbkColors.openColor,
  },
  indicatorAssigned: {
    backgroundColor: DbkColors.assignedColor,
  },
  indicatorReady: {
    backgroundColor: DbkColors.readyColor,
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
