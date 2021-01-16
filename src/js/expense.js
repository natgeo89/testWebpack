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

export function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

function saveExpenseToLocalStorage() {
  const expenseArray = getExpenses();

  expenseArray.push({
    value: input.value,
    category: category.value,
    date: new Date().getTime(),
  });

  localStorage.setItem('expenses', JSON.stringify(expenseArray));
}

// function defaultLocalStorage() {
//   Array.from(category.options).forEach(({ value }) => {
//     if (value !== 'none') {
//       localStorage.setItem(value, 0);
//     }
//   });
// }

function setDefaultExpense() {
  category.selectedIndex = 0;
  input.value = '';
  disableInput();
}

function validateInput() {
  //todo need to validate is number && > 0
}

function audioExpense() {
  //todo need to add audio when saving expense
}

function opacityAnimation() {
  //todo need to add opacity +scale when saving
}

category.addEventListener('change', enableInput);

export default save.addEventListener('click', () => {
  saveExpenseToLocalStorage();
  setDefaultExpense();
});
