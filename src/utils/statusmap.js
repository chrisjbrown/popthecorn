import Typography from 'app/styles/typography';

export function getIndicatorStyle(status) {
  switch (status) {
    case 'INPROGRESS':
      return Typography.indicatorInProgress;
    case 'COMPLETED':
      return Typography.indicatorReady;
    case 'DELIVERED':
      return Typography.indicatorDelivered;
    case 'EXPIRED':
      return Typography.indicatorExpired;
    default:
      return Typography.indicatorOpen;
  }
}

export function mapStatusText(status) {
  switch (status) {
    case 'NEW':
      return 'Open';
    case 'INPROGRESS':
      return 'In behandeling';
    case 'COMPLETED':
      return 'Gereed';
    case 'DELIVERED':
      return 'Opgehaald';
    case 'EXPIRED':
      return 'Niet Opgehaald';
    default:
      return 'Open';
  }
}
