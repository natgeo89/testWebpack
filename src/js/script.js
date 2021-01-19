import '../styles/style.css';

// import createElement from './utils/createElement';
import Report from './Report';
import { saveExpenseToLocalStorage, setDefaultExpense, isInputValid } from './expense';
import addZeroes from './utils/addZeroes';

const reportContainer = document.querySelector('#report');
const save = document.querySelector('#save');
const intervalSelect = document.querySelector('#interval-select');
const intervalReport = document.querySelector('#interval');
const audio = document.querySelector('#audio');

const report = new Report();

report.renderIn(reportContainer);

save.addEventListener('click', () => {
  if (isInputValid()) {
    audio.play();
    saveExpenseToLocalStorage();
    setDefaultExpense();
    report.updateReport();
  }
});

intervalSelect.addEventListener('change', () => {
  console.log(getIntervalDate());
  intervalReport.textContent = getIntervalDate();
  report.updateReport();
});

function getIntervalDate() {
  const date = new Date();
  const day = addZeroes(date.getDate());
  const month = addZeroes(date.getMonth() + 1);

  switch (intervalSelect.value) {
    case 'day':
      return `${day}.${month}.${date.getFullYear()}`;
    case 'month':
      return `${month}.${date.getFullYear()}`;
    case 'year':
      return `${date.getFullYear()}`;
    case 'all':
      return 'all expenses';
    default:
      break;
  }
}
