import './styles/style.css';
import gettersDataObj from './gettersDataObj';

// table
const timeToggle = document.querySelector('.time-toggle--elem');
const timeToggleText = document.querySelector('.time-toggle--text');
const countToggle = document.querySelector('.count-toggle--elem');
const countToggleText = document.querySelector('.count-toggle--text');

// every block data
const toggleBtns = document.querySelector('.buttons');
const info = document.querySelector('.info');

function fillTableData(dataDay, data100Count, country) {
  const countryName = document.querySelector('.table-info--country');
  countryName.textContent = country;

  const count = document.querySelector('.table-info-count--value');
  const death = document.querySelector('.table-info-death--value');
  const recovery = document.querySelector('.table-info-recovery--value');

  if (dataDay === false && data100Count === false) {
    count.textContent = gettersDataObj.getDiseaseCount(country);
    death.textContent = gettersDataObj.getDeathCount(country);
    recovery.textContent = gettersDataObj.getRecoveryCount(country);
  }

  if (dataDay === true && data100Count === true) {
    count.textContent = gettersDataObj.getDiseaseCount100LastDay(country);
    death.textContent = gettersDataObj.getDeathCount100LastDay(country);
    recovery.textContent = gettersDataObj.getRecoveryCount100LastDay(country);
  }

  if (dataDay === true && data100Count === false) {
    count.textContent = gettersDataObj.getDiseaseCountLastDay(country);
    death.textContent = gettersDataObj.getDeathCountLastDay(country);
    recovery.textContent = gettersDataObj.getRecoveryCountLastDay(country);
  }

  if (dataDay === false && data100Count === true) {
    count.textContent = gettersDataObj.getDiseaseCount100(country);
    death.textContent = gettersDataObj.getDeathCount100(country);
    recovery.textContent = gettersDataObj.getRecoveryCount100(country);
  }
}

// show info when choose indicator
function setSelectInfo(button) {
  const isDisease = button.classList.contains('buttons--disease');
  const isDeath = button.classList.contains('buttons--death');
  const isRecovery = button.classList.contains('buttons--recovery');
  let content = '';
  switch (true) {
    case isDisease:
      content = document.querySelector('.table-info-count--value').textContent;
      break;
    case isDeath:
      content = document.querySelector('.table-info-death--value').textContent;
      break;
    case isRecovery:
      content = document.querySelector('.table-info-recovery--value').textContent;
      break;
    default:
      break;
  }
  info.textContent = content;
}

// function findLostCountries() {
//   const countriesCovid = dataObj.Countries.map((country) => country.Country);
//   const countriesPopulation = populationCountry.map((country) => country.name);

//   const withDiffName = countriesCovid.filter((countryCovid) => !countriesPopulation.includes(countryCovid));
// }

// functions for table
function changeToggleText() {
  const lastDayData = timeToggle.hasAttribute('data-day');
  const data100Count = countToggle.hasAttribute('data-100');
  timeToggleText.textContent = (lastDayData) ? 'за последний день' : 'за весь период пандемии';
  countToggleText.textContent = (data100Count) ? 'на 100 тыс. населения' : 'всего';
  fillTableData(lastDayData, data100Count, 'Belarus');
  setSelectInfo(document.querySelector('.active'));
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
    setSelectInfo(target);
  }
}
fillTableData(false, false, 'Belarus');
console.log(gettersDataObj.getCountryPopulation('Belarus'));

timeToggle.addEventListener('click', toggleElement);
countToggle.addEventListener('click', toggleElement);

toggleBtns.addEventListener('click', toggleButton);
