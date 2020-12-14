import './styles/style.css';

const timeToggle = document.querySelector('.time-toggle--elem');
const timeToggleText = document.querySelector('.time-toggle--text');
const countToggle = document.querySelector('.count-toggle--elem');
const countToggleText = document.querySelector('.count-toggle--text');

function changeToggleText() {
  timeToggleText.textContent = (timeToggle.hasAttribute('data-day')) ? 'за последний день' : 'за весь период пандемии';
  countToggleText.textContent = (countToggle.hasAttribute('data-100')) ? 'на 100 тыс. населения' : 'всего';
}

function toggleElement({ target }) {
  const isTimeToggleElement = target.classList.contains('time-toggle--elem');
  if (isTimeToggleElement) {
    target.toggleAttribute('data-day');
  } else {
    target.toggleAttribute('data-100');
  }
  changeToggleText();
}

timeToggle.addEventListener('click', toggleElement);
countToggle.addEventListener('click', toggleElement);
