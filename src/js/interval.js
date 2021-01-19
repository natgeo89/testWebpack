/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import addZeroes from './utils/addZeroes';

const intervalSelect = document.querySelector('#interval-select');

export function getIntervalDate() {
  const date = new Date();
  const day = addZeroes(date.getDate());
  const month = addZeroes(date.getMonth() + 1);

  switch (intervalSelect.value) {
    case 'day':
      return `${day}.${month}.${date.getFullYear()}`;
    case 'month':
      return `${month}.${date.getFullYear()}`;
    case 'year':
      return `${date.getFullYear()}`;
    case 'all':
      return 'all expenses';
    default:
      break;
  }
}