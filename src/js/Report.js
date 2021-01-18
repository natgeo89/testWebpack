/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import { getExpenses } from './getData';

export default class Report {
  constructor() {
    this.createReport();
  }

  groupExpenses() {
    const expensesArray = getExpenses();
    return expensesArray.reduce((accum, { date }, ind, arr) => {
      const key = new Date(date).getMinutes();
      if (!accum.hasOwnProperty(key)) {
        accum[key] = arr.filter(({ date }) => new Date(date).getMinutes() === key);
        return accum;
      }
      return accum;
    }, {});
  }

  deleteRecord(target) {
    const expensesCopy = [...getExpenses()];
    const deleteDate = target.dataset.date;
    if (target.classList.contains('delete-record')) {
      const deleteRecordIndex = expensesCopy.findIndex(({ date }) => date === +deleteDate);

      expensesCopy.splice(deleteRecordIndex, 1);
      localStorage.setItem('expenses', JSON.stringify(expensesCopy));

      this.updateReport();
    }
  }

  createReport() {
    console.log(getExpenses());
    console.log(this.groupExpenses());

    this.report = document.createElement('ul');

    this.report.addEventListener('click', ({ target }) => {
      this.deleteRecord(target);
    });

    const datefragment = new DocumentFragment();
    const horisontalLine = document.createElement('hr');
    const reportArray = this.groupExpenses();

    const reportMinutes = Object.keys(reportArray).sort((a, b) => b - a);

    reportMinutes.forEach((min) => {
      const minute = document.createElement('li');
      minute.textContent = `${min} minutes:`;

      const expensesByMinutes = Object.values(reportArray[min].sort((a, b) => b.date - a.date));

      const expenseUl = document.createElement('ul');

      expensesByMinutes.forEach((expense, index) => {
        const recordContainer = document.createElement('div');
        recordContainer.classList.add('record-container');

        const hours = new Date(expensesByMinutes[index].date).getHours();
        const minutes = new Date(expensesByMinutes[index].date).getMinutes();
        const seconds = new Date(expensesByMinutes[index].date).getSeconds();
        const expenseLi = document.createElement('li');
        expenseLi.dataset.date = expensesByMinutes[index].date;
        expenseLi.textContent = `
          ${expensesByMinutes[index].category} --- ${expensesByMinutes[index].value} BYN;
          date(${hours}:${minutes}:${seconds})`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-record');
        deleteBtn.dataset.date = expensesByMinutes[index].date;
        deleteBtn.textContent = '✖';

        recordContainer.append(deleteBtn);
        recordContainer.append(expenseLi);

        expenseUl.append(recordContainer);
      });

      minute.append(expenseUl);
      minute.append(horisontalLine.cloneNode());
      datefragment.append(minute);
    });

    this.report.append(datefragment);

    return this.report;
  }

  updateReport() {
    const reportEl = document.querySelector('#report>ul');
    reportEl.replaceWith(this.createReport());
  }

  renderIn(element) {
    element.append(this.report);
  }
}

// @example
//  *   group([
//  *      { country: 'Belarus', city: 'Brest' },
//  *      { country: 'Russia', city: 'Omsk' },
//  *      { country: 'Russia', city: 'Samara' },
//  *      { country: 'Belarus', city: 'Grodno' },
//  *      { country: 'Belarus', city: 'Minsk' },
//  *      { country: 'Poland', city: 'Lodz' }
//  *     ],
//  *     item => item.country,
//  *     item => item.city
//  *   )
//  *            =>
//  *   Map {
//  *    "Belarus" => ["Brest", "Grodno", "Minsk"],
//  *    "Russia" => ["Omsk", "Samara"],
//  *    "Poland" => ["Lodz"]
//  *   }
//  */
// function group(array, keySelector, valueSelector) {
//   return array.reduce((accum, item, index, array1) => {
//     const key = keySelector(item);
//     if (!accum.has(key)) {
//       const objectsWithKeySelector = array1.filter((el) => key === keySelector(el));
//       const arrayOfValues = objectsWithKeySelector.map(valueSelector);
//       return accum.set(key, arrayOfValues);
//     }
//     return accum;
//   }, new Map());
// }
