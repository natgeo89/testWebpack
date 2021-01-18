/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
import { getExpenses, getIntervalData } from './getData';
import addZeroes from './utils/addZeroes';

const intervalReport = document.querySelector('#interval-select');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default class Report {
  constructor() {
    this.createReport();
  }

  get interval() {
    return intervalReport.value;
  }

  groupExpenses() {
    const expensesArray = getIntervalData(this.interval);
    console.log('interval', expensesArray)
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
    const expensesCopy = [...getIntervalData(this.interval)];
    const deleteDate = target.dataset.date;
    if (target.classList.contains('delete-record')) {
      const deleteRecordIndex = expensesCopy.findIndex(({ date }) => date === +deleteDate);

      expensesCopy.splice(deleteRecordIndex, 1);
      localStorage.setItem('expenses', JSON.stringify(expensesCopy));

      this.updateReport();
    }
  }

  createReport() {
    console.log('create')
    this.report = document.createElement('ul');

    this.report.addEventListener('click', ({ target }) => {
      this.deleteRecord(target);
    });

    const fragment = new DocumentFragment();
    const horisontalLine = document.createElement('hr');
    // here should get interval data. not all data
    const reportArray = this.groupExpenses();
    console.log(reportArray)

    const reportCatetegories = Object.keys(reportArray).sort();

    reportCatetegories.forEach((category) => {
      const categoryReport = document.createElement('li');
      const dataByCategory = reportArray[category];
      const totalExpenseByCategory = dataByCategory.reduce((accum, { value }) => accum + value, 0);
      categoryReport.textContent = `${category}: -${totalExpenseByCategory} BYN`;

      const sortedExpensesByCategories = dataByCategory.sort((a, b) => b.date - a.date);

      const expenseUl = document.createElement('ul');

      sortedExpensesByCategories.forEach((expense, index) => {
        const recordContainer = document.createElement('div');
        recordContainer.classList.add('record-container');

        const dateExpense = new Date(sortedExpensesByCategories[index].date);
        const day = dateExpense.getDate();
        const monthIndex = dateExpense.getMonth();

        const expenseLi = document.createElement('li');
        expenseLi.dataset.date = sortedExpensesByCategories[index].date;

        const expenseDate = `${addZeroes(day)} ${monthNames[monthIndex]}`;
        expenseLi.textContent = `
          -${sortedExpensesByCategories[index].value} BYN;
          ${expenseDate}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-record');
        deleteBtn.dataset.date = sortedExpensesByCategories[index].date;
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
