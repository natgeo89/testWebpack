import { getExpenses } from './getData';
import addZeroes from './utils/addZeroes';

const category = document.querySelector('#category-select');
const input = document.querySelector('.input-expense');
const save = document.querySelector('#save');
const date = document.querySelector('#expense-date');

function generateId() {
  const str = '1234567890abcdefg';
  const maxNumber = str.length;
  let id = '';
  for (let i = 0; i < maxNumber; i += 1) {
    id += str[Math.trunc(Math.random() * maxNumber)];
  }
  return id;
}

function disableInput() {
  input.setAttribute('disabled', true);
  save.setAttribute('disabled', true);
  date.setAttribute('disabled', true);
}

function enableInput() {
  if (category.value !== 'none') {
    input.removeAttribute('disabled');
    save.removeAttribute('disabled');
    date.removeAttribute('disabled');
  } else {
    disableInput();
  }
}

function setCurrentDateByDefault() {
  const currendDate = new Date();
  const year = currendDate.getFullYear();
  const month = currendDate.getMonth();
  const day = currendDate.getDate();

  const currentDateStr = `${year}-${addZeroes(month + 1)}-${addZeroes(day)}`;
  date.value = currentDateStr;
  date.max = currentDateStr;
}

export function saveExpenseToLocalStorage() {
  const expenseArray = getExpenses();

  expenseArray.push({
    value: +input.value,
    category: category.value,
    date: date.value,
    id: generateId(),
  });

  localStorage.setItem('expenses', JSON.stringify(expenseArray));
}

export function setDefaultExpense() {
  category.selectedIndex = 0;
  input.value = '';
  date.value = '';
  disableInput();
}

export function isInputValid() {
  const val = +input.value;
  const isNumber = Number.isFinite(val);

  return (isNumber && val > 0);
}

function validateInput() {
  if (!isInputValid()) {
    input.style.color = 'red';
  } else {
    input.style.color = 'black';
  }
}

category.addEventListener('change', () => {
  enableInput();
  setCurrentDateByDefault();
});
input.addEventListener('input', validateInput);
