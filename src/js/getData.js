/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
export function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

export function getIntervalData(interval = 'all') {
  const expensesArray = getExpenses();
  let intervalArray;

  switch (interval) {
    case 'day':
      intervalArray = expensesArray.filter(({ date }) => new Date(date).getDate() === new Date().getDate());
      return intervalArray;
    case 'month':
      intervalArray = expensesArray.filter(({ date }) => new Date(date).getMonth() === new Date().getMonth());
      return intervalArray;
    case 'year':
      intervalArray = expensesArray.filter(({ date }) => new Date(date).getFullYear() === new Date().getFullYear());
      return intervalArray;
    case 'all':
      return expensesArray;
    default:
      return expensesArray;
  }
}

function getNextIntervalData(selectDate) {
  // parse select date + 1 interval.
  // disable next if it is last interval  === new Date();
}

function getPreviousIntervalData(selectDate) {
  // parse select date - 1 interval

  
}
