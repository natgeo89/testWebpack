/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import { getIntervalData } from './getData';
import addZeroes from './utils/addZeroes';

const intervalReport = document.querySelector('#interval-select');
// const interval = document.querySelector('#interval');
// console.log(interval.dataset.date)

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default class Report {
  constructor() {
    this.createReport();
  }

  // get interval() {
  //   return intervalReport.value;
  // }

  groupExpenses() {
    const interval = document.querySelector('#interval');
    
    const currentDatestamp = +interval.dataset.date;
    console.log(interval, currentDatestamp)

    const expensesArray = getIntervalData(intervalReport.value, currentDatestamp);
    console.log(intervalReport.value, currentDatestamp, expensesArray)

    return expensesArray.reduce((accum, { category }, ind, arr) => {
      const key = category;
      if (!accum.hasOwnProperty(key)) {
        accum[key] = arr.filter(({ category }) => category === key);
        return accum;
      }
      return accum;
    }, {});
  }

  deleteRecord(target) {
    const interval = document.querySelector('#interval');

    const currentDatestamp = +interval.dataset.date;

    const expensesCopy = [...getIntervalData(intervalReport.value, currentDatestamp)];
    const deleteId = target.dataset.id;
    if (target.classList.contains('delete-record')) {
      const deleteRecordIndex = expensesCopy.findIndex(({ id }) => id === deleteId);
      expensesCopy.splice(deleteRecordIndex, 1);

      localStorage.setItem('expenses', JSON.stringify(expensesCopy));

      this.updateReport();
    }
  }

  createReport() {
    this.report = document.createElement('ul');

    this.report.addEventListener('click', ({ target }) => {
      this.deleteRecord(target);
    });

    const fragment = new DocumentFragment();
    const horisontalLine = document.createElement('hr');

    const reportArray = this.groupExpenses();

    const reportCatetegories = Object.keys(reportArray).sort();

    reportCatetegories.forEach((category) => {
      const categoryReport = document.createElement('li');
      const dataByCategory = reportArray[category];
      const totalExpenseByCategory = dataByCategory.reduce((accum, { value }) => accum + value, 0);
      categoryReport.textContent = `${category}: -${totalExpenseByCategory} BYN`;

      const sortedExpensesByCategories = dataByCategory.sort((a, b) => new Date(b.date) - new Date(a.date));

      const expenseUl = document.createElement('ul');

      sortedExpensesByCategories.forEach((expense, index) => {
        const recordContainer = document.createElement('div');
        recordContainer.classList.add('record-container');

        const dateExpense = new Date(sortedExpensesByCategories[index].date);
        const day = dateExpense.getDate();
        const monthIndex = dateExpense.getMonth();
        const year = dateExpense.getFullYear();

        const expenseLi = document.createElement('li');

        const expenseDate = `${addZeroes(day)} ${monthNames[monthIndex]} ${year}`;
        expenseLi.textContent = `
          -${sortedExpensesByCategories[index].value} BYN;
          ${expenseDate}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-record');
        deleteBtn.dataset.id = sortedExpensesByCategories[index].id;
        deleteBtn.textContent = '✖';

        recordContainer.append(deleteBtn);
        recordContainer.append(expenseLi);

        expenseUl.append(recordContainer);
      });

      categoryReport.append(expenseUl);
      categoryReport.append(horisontalLine.cloneNode());
      fragment.append(categoryReport);
    });

    this.report.append(fragment);

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
