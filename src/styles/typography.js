import DbkColors from './colors';

export default {
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
