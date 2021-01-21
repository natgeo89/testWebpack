/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import addZeroes from './utils/addZeroes';

const intervalSelect = document.querySelector('#interval-select');
const currentInterval = document.querySelector('#interval');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');

export function setIntervalDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  currentInterval.dataset.date = `${new Date(year, month, day).getTime()}`;
}

export function getIntervalText() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const intervalValue = intervalSelect.value;

  switch (intervalValue) {
    case 'day':
      return `${addZeroes(day)}.${addZeroes(month + 1)}.${year}`;
    case 'month':
      return `${addZeroes(month + 1)}.${year}`;
    case 'year':
      return `${year}`;
    case 'all':
      return 'all expenses';
    default:
      break;
  }
}



function getNextIntervalDate(selectDate) {
  
  // parse select date + 1 interval.
  // disable next if it is last interval  === new Date();
}

function getPreviousIntervalDate(selectDate) {
  // parse select date - 1 interval

  
}
