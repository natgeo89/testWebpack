import '../styles/style.css';

// import createElement from './utils/createElement';
import Report from './Report';
import { saveExpenseToLocalStorage, setDefaultExpense, isInputValid } from './expense';

const reportContainer = document.querySelector('#report');
const save = document.querySelector('#save');
const intervalReport = document.querySelector('#interval-select');
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

intervalReport.addEventListener('change', () => {
  report.updateReport();
});
