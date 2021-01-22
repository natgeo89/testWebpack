import '../styles/style.css';

// import createElement from './utils/createElement';
import Report from './Report';
import { saveExpenseToLocalStorage, setDefaultExpense, isInputValid } from './expense';
import { getIntervalText, setIntervalDate, getPreviousDatestampForInterval, getNextDatestampForInterval } from './interval';

const reportContainer = document.querySelector('#report');
const save = document.querySelector('#save');
const intervalSelect = document.querySelector('#interval-select');
const intervalReport = document.querySelector('#interval');
const navigateInterval = document.querySelector('.navigate-interval');
const audio = document.querySelector('#audio');

document.addEventListener('DOMContentLoaded', () => {
  const currentDatestamp = new Date().getTime();
  intervalReport.textContent = getIntervalText(currentDatestamp);
  setIntervalDate(currentDatestamp);

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
    const intervalDatestamp = +intervalReport.dataset.date;

    intervalReport.textContent = getIntervalText(intervalDatestamp);
    report.updateReport();
  });

  navigateInterval.addEventListener('click', ({ target }) => {
    const intervalDatestamp = +intervalReport.dataset.date;
    const interval = intervalSelect.value;

    let updatedStamp;

    switch (target.id) {
      case 'prev':
        updatedStamp = getPreviousDatestampForInterval(interval, intervalDatestamp);
        break;
      case 'next':
        updatedStamp = getNextDatestampForInterval(interval, intervalDatestamp);
        break;
      default:
        break;
    }
    setIntervalDate(updatedStamp);

    intervalReport.textContent = getIntervalText(updatedStamp);

    report.updateReport();
  });
});
