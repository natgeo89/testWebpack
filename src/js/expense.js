import { getExpenses } from './getData';

const category = document.querySelector('#category-select');
const input = document.querySelector('.input-expense');
const save = document.querySelector('#save');

function disableInput() {
  input.setAttribute('disabled', true);
  save.setAttribute('disabled', true);
}

function enableInput() {
  if (category.value !== 'none') {
    input.removeAttribute('disabled');
    save.removeAttribute('disabled');
  } else {
    disableInput();
  }
}

export function saveExpenseToLocalStorage() {
  const expenseArray = getExpenses();

  expenseArray.push({
    value: +input.value,
    category: category.value,
    date: new Date().getTime(),
  });

  localStorage.setItem('expenses', JSON.stringify(expenseArray));
}

export function setDefaultExpense() {
  category.selectedIndex = 0;
  input.value = '';
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

function opacityAnimation() {
  //todo need to add opacity +scale when saving
}

category.addEventListener('change', enableInput);
input.addEventListener('input', validateInput);
