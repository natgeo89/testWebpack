/* eslint-disable no-shadow */
/* eslint-disable no-prototype-builtins */
/* eslint-disable class-methods-use-this */
export default class Report {
  constructor() {
    this.createReport();
  }

  get expenses() {
    return JSON.parse(localStorage.getItem('expenses'));
  }

  groupExpenses() {
    // const minutes = this.expenses.map(({ date }) => new Date(date).getMinutes());
    // const sortUniqueMinutes = Array.from(new Set(minutes)).sort((a, b) => b - a);

    // return sortUniqueMinutes.map((minute) => ({
    //   [minute]: this.expenses.filter(({ date }) => new Date(date).getMinutes() === minute),
    // }));

    return this.expenses.reduce((accum, { date }, ind, arr) => {
      const key = new Date(date).getMinutes();
      if (!accum.hasOwnProperty(key)) {
        accum[key] = arr.filter(({ date }) => new Date(date).getMinutes() === key);
        return accum;
      }
      return accum;
    }, {});
  }

  createReport() {
    console.log(this.groupExpenses());
    this.report = document.createElement('ul');

    // separate for minutes for better understanding. then replace it to date
    // const minutes = this.expenses.map(({ date }) => new Date(date).getMinutes());
    // const seconds = this.expenses.map(({ date }) => new Date(date).getSeconds());
    // console.log(minutes);
    // console.log(seconds);
    // console.log(this.groupExpenses());

    // choose unique minutes to be <ul> element
    // const sortUniqueMinutes = Array.from(new Set(minutes)).sort((a, b) => b - a);

    const datefragment = new DocumentFragment();
    const horisontalLine = document.createElement('hr');
    const reportArray = this.groupExpenses();
    const reportMinutes = Object.keys(reportArray).sort((a, b) => b - a);
    reportMinutes.forEach((min) => {
      const minute = document.createElement('li');
      minute.textContent = min;

      const expensesFragment = new DocumentFragment();
      const expensesByMinutes = Object.values(reportArray[min]);

      const expenseUl = document.createElement('ul');
      expensesByMinutes.forEach((expense, index) => {
        const expenseLi = document.createElement('li');
        expenseLi.textContent = `${expensesByMinutes[index].category}, ${expensesByMinutes[index].value}`;
        expenseUl.append(expenseLi);
      });
      minute.append(expenseUl);
      minute.append(horisontalLine.cloneNode());
      datefragment.append(minute);
    });

    this.report.append(datefragment);

    // console.log(this.expenses);
    // this.expenses.forEach((item) => {
    //   const elem = document.createElement('li');
    //   elem.textContent = item;
    //   this.report.append(elem);
    // });

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