import './styles/style.css';
import populationCountry from './populationDataMock';
import gettersCovid from './gettersCovidData';
import covidData from './covidDataMock';

// table
const timeToggle = document.querySelector('.time-toggle--elem');
const timeToggleText = document.querySelector('.time-toggle--text');
const countToggle = document.querySelector('.count-toggle--elem');
const countToggleText = document.querySelector('.count-toggle--text');

// every block data
const toggleBtns = document.querySelector('.buttons');
const info = document.querySelector('.info');
// const diseaseBtn = document.querySelector('.buttons--disease');
// const deathBtn = document.querySelector('.buttons--death');
// const recoveryBtn = document.querySelector('.buttons--recovery');
// const recoveryBtn = document.querySelector('.buttons--recovery');

// const dataObj = {
//   diseaseCount: gettersCovid.getDiseaseCount,
//   deathCount: gettersCovid.getDeathCount,
//   recoveryCount: gettersCovid.getRecoveryCount,
//   diseaseCount100: gettersCovid.getDiseaseCount100,
//   deathCount100: gettersCovid.getDeathCount100,
//   recoveryCount100: gettersCovid.getRecoveryCount100,
//   diseaseCountLastDay: gettersCovid.getDiseaseCountLastDay,
//   deathCountLastDay: gettersCovid.getDeathCountLastDay,
//   recoveryCountLastDay: gettersCovid.getRecoveryCountLastDay,
//   diseaseCount100LastDay: gettersCovid.getDiseaseCount100LastDay,
//   deathCount100LastDay: gettersCovid.getDeathCount100LastDay,
//   recoveryCount100LastDay: gettersCovid.getRecoveryCount100LastDay,
// };

function fillTableData(dataDay, data100Count, country) {
  const countryName = document.querySelector('.table-info--country');
  countryName.textContent = country;

  const count = document.querySelector('.table-info-count--value');
  const death = document.querySelector('.table-info-death--value');
  const recovery = document.querySelector('.table-info-recovery--value');

  if (dataDay === false && data100Count === false) {
    count.textContent = gettersCovid.getDiseaseCount(country);
    death.textContent = gettersCovid.getDeathCount(country);
    recovery.textContent = gettersCovid.getRecoveryCount(country);
  }

  if (dataDay === true && data100Count === true) {
    count.textContent = gettersCovid.getDiseaseCount100LastDay(country);
    death.textContent = gettersCovid.getDeathCount100LastDay(country);
    recovery.textContent = gettersCovid.getRecoveryCount100LastDay(country);
  }

  if (dataDay === true && data100Count === false) {
    count.textContent = gettersCovid.getDiseaseCountLastDay(country);
    death.textContent = gettersCovid.getDeathCountLastDay(country);
    recovery.textContent = gettersCovid.getRecoveryCountLastDay(country);
  }

  if (dataDay === false && data100Count === true) {
    count.textContent = gettersCovid.getDiseaseCount100(country);
    death.textContent = gettersCovid.getDeathCount100(country);
    recovery.textContent = gettersCovid.getRecoveryCount100(country);
  }
}

function findLostCountries() {
  const countriesCovid = covidData.Countries.map((country) => country.Country);
  const countriesPopulation = populationCountry.map((country) => country.name);
  console.log(countriesCovid, countriesPopulation);

  return countriesPopulation.filter((country) => !countriesCovid.includes(country));
}

// functions for table
function changeToggleText() {
  const lastDayData = timeToggle.hasAttribute('data-day');
  const data100Count = countToggle.hasAttribute('data-100');
  timeToggleText.textContent = (lastDayData) ? 'за последний день' : 'за весь период пандемии';
  countToggleText.textContent = (data100Count) ? 'на 100 тыс. населения' : 'всего';
  fillTableData(lastDayData, data100Count, 'Planet');
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

// function setTextContentForElem(elem, textCont) {
//   const element = elem;
//   element.textContent = textCont;
// }

function toggleButton({ target }) {
  const isTargetActive = target.classList.contains('active');
  if (isTargetActive) return;
  if (target !== this) {
    const activeBtn = toggleBtns.querySelector('.active');
    deleteElementClass(activeBtn, 'active');
    target.classList.add('active');
  }
  // const currentInfo = getters.getDiseaseCountInWorld();
  // setTextContentForElem(info, currentInfo);
}

fillTableData(false, false, 'Planet');
// todo после каждого изменения кнопки обновлять объект (вызывать его методы)

timeToggle.addEventListener('click', toggleElement);
countToggle.addEventListener('click', toggleElement);

toggleBtns.addEventListener('click', toggleButton);
