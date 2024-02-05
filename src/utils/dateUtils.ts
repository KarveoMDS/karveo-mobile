import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import {capitalize} from 'lodash';
import type {IEvent} from '../interfaces/Events';

dayjs.locale('fr');

export const formatDate = (date: Date | string) =>
  dayjs(new Date(date)).format('DD/MM/YYYY');

const getMainTimeUnit = (
  week: Date[],
  unitGetter: (date: Date) => number,
): number => {
  const mainUnit = unitGetter(week[0]);
  let count = 1;

  for (let i = 1; i < 7; i++) {
    if (unitGetter(week[i]) === mainUnit) {
      count++;
    }
  }

  if (count >= 4) return mainUnit;

  // If we reach here, it means the majority is not the mainUnit
  for (let i = 1; i < 7; i++) {
    if (unitGetter(week[i]) !== mainUnit) {
      return unitGetter(week[i]);
    }
  }

  return mainUnit;
};

export const getMainMonth = (week: Date[]): number =>
  getMainTimeUnit(week, date => date.getMonth());
export const getMainYear = (week: Date[]) =>
  getMainTimeUnit(week, date => date.getFullYear());

export const monthsString = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

export const smallWeekDaysString = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export const formatFullDay = (date: Date | string): string =>
  capitalize(dayjs(new Date(date)).format('DD MMMM YYYY'));

export const formatFullHour = (date: Date | string): string =>
  dayjs(new Date(date)).format('HH:mm');

export const formatSmallMonth = (date: Date | string): string =>
  capitalize(dayjs(new Date(date)).format('MMM'));

export const formatSmallDate = (date: Date | string): string =>
  dayjs(new Date(date)).format('DD');

export const formatDuration = (event: IEvent): string => {
  const start = dayjs(new Date(event.start));
  const end = dayjs(new Date(event.end));

  const duration = end.diff(start, 'minute');

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours === 0) return `${minutes} ${pluralize(minutes, 'minute')}`;

  if (minutes === 0) return `${hours} ${pluralize(hours, 'heure')}`;

  if (minutes < 10) return `${hours}h0${minutes}`.replace('h00', 'h');

  if (minutes > 10) return `${hours}h${minutes}`.replace('h00', 'h');

  return `${hours}h${minutes}`;
};
