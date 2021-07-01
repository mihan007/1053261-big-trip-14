import dayjs from 'dayjs';
import { DateTimeFormat } from '../constants/date-time-format';

export const createInfoTemplate = (points) => {
  const path = [];
  let lastAddedTitle = '';
  for (const point of points) {
    const pointTitle = point.destination.title;
    if (pointTitle !== lastAddedTitle) {
      path.push(pointTitle);
      lastAddedTitle = pointTitle;
    }
  }

  points.sort((a, b) => {
    const dayDiff = b.startDate - a.startDate;
    return dayDiff === 0 ? b.endDate - a.endDate : dayDiff;
  });

  const startDate = points.length ? dayjs(points[0].startDate) : '';
  const startDateTemplate = startDate ? startDate.format(DateTimeFormat.infoFullDate) : '';

  const endDate = points.length ? dayjs(points[points.length - 1].endDate) : '';
  const endDateTemplate = endDate ? endDate.format(DateTimeFormat.infoFullDate) : '';

  let datesTemplate = `${startDateTemplate}&nbsp;&mdash;&nbsp;${endDateTemplate}`;
  if (!points) {
    datesTemplate = '';
  } else if (startDate.isSame(endDate, 'day')) {
    datesTemplate = `${startDateTemplate}`;
  } else {
    datesTemplate = `${startDateTemplate}&nbsp;&mdash;&nbsp;${endDate.format(DateTimeFormat.infoShortDate)}`;
  }

  return path ? `<div class="trip-info__main">
              <h1 class="trip-info__title">${path.join(' &mdash; ')}</h1>
              <p class="trip-info__dates">${datesTemplate}</p>
        </div>` : '';
};

