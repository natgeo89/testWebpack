import './styles/style.css';
import covidData from './mock';
// table
const timeToggle = document.querySelector('.time-toggle--elem');
const timeToggleText = document.querySelector('.time-toggle--text');
const countToggle = document.querySelector('.count-toggle--elem');
const countToggleText = document.querySelector('.count-toggle--text');

// every block data
const toggleBtns = document.querySelector('.buttons');
// const diseaseBtn = document.querySelector('.buttons--disease');
// const deathBtn = document.querySelector('.buttons--death');
// const recoveryBtn = document.querySelector('.buttons--recovery');
// const recoveryBtn = document.querySelector('.buttons--recovery');

// functions for table
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

// functions for buttons
function deleteElementClass(elem, className) {
  elem.classList.remove(className);
}

function toggleButton({ target }) {
  const isTargetActive = target.classList.contains('active');
  if (isTargetActive) return;
  if (target !== this) {
    const activeBtn = toggleBtns.querySelector('.active');
    deleteElementClass(activeBtn, 'active');
    target.classList.add('active');
  }
}

timeToggle.addEventListener('click', toggleElement);
countToggle.addEventListener('click', toggleElement);

toggleBtns.addEventListener('click', toggleButton);
