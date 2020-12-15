import covidData from './covidDataMock';
import gettersPopulation from './gettersFlagPopulation';

// function createCountryList() {
//todo общий объект с  планетой как страна и полями населения и флаг
// }

// function-helper
function addSpaceDelimiter(num) {
  // eslint-disable-next-line prefer-const
  let [integerStr, numRestStr] = `${num}`.split('.');

  if (integerStr.length <= 3) return `${num}`;

  for (let i = integerStr.length - 3; i >= 0; i -= 3) {
    integerStr = `${integerStr.slice(0, i)} ${integerStr.slice(i)}`;
  }

  integerStr += (numRestStr) ? `.${numRestStr}` : '';
  return integerStr;
}

// getters covidData
function getCountryIndex(country) {
  // eslint-disable-next-line arrow-body-style
  const indexOfCountry = covidData.Countries.findIndex((countryElem) => {
    console.log(countryElem.Country, country);
    return countryElem.Country === country;
  });
  return indexOfCountry;
}

function getDiseaseCount(country) {
  if (country === 'Planet') {
    const result = covidData.Global.TotalConfirmed;
    return addSpaceDelimiter(result);
  }
  const countryIndex = getCountryIndex(country);
  console.log(covidData.Countries[countryIndex], countryIndex);
  const result = covidData.Countries[countryIndex].TotalConfirmed;
  return addSpaceDelimiter(result);
}

function getDeathCount(country) {
  if (country === 'Planet') {
    const result = covidData.Global.TotalDeaths;
    return addSpaceDelimiter(result);
  }
  const countryIndex = getCountryIndex(country);
  const result = covidData.Countries[countryIndex].TotalDeaths;
  return addSpaceDelimiter(result);
}

function getRecoveryCount(country) {
  if (country === 'Planet') {
    const result = covidData.Global.TotalRecovered;
    return addSpaceDelimiter(result);
  }
  const countryIndex = getCountryIndex(country);
  const result = covidData.Countries[countryIndex].TotalRecovered;
  return addSpaceDelimiter(result);
}

function getDiseaseCountLastDay(country) {
  if (country === 'Planet') {
    const result = covidData.Global.NewConfirmed;
    return addSpaceDelimiter(result);
  }
  const countryIndex = getCountryIndex(country);
  const result = covidData.Countries[countryIndex].NewConfirmed;
  return addSpaceDelimiter(result);
}

function getDeathCountLastDay(country) {
  if (country === 'Planet') {
    const result = covidData.Global.NewDeaths;
    return addSpaceDelimiter(result);
  }
  const countryIndex = getCountryIndex(country);
  const result = covidData.Countries[countryIndex].NewDeaths;
  return addSpaceDelimiter(result);
}

function getRecoveryCountLastDay(country) {
  if (country === 'Planet') {
    const result = covidData.Global.NewRecovered;
    return addSpaceDelimiter(result);
  }
  const countryIndex = getCountryIndex(country);
  const result = covidData.Countries[countryIndex].NewRecovered;
  return addSpaceDelimiter(result);
}

function getDiseaseCount100(country) {
  if (country === 'Planet') {
    const worldPopulation = gettersPopulation.getWorldPopulation();
    const result = (covidData.Global.TotalConfirmed * 100000) / worldPopulation;
    return addSpaceDelimiter(+result.toFixed(2));
  }
  const countryIndex = getCountryIndex(country);
  const countryPopulation = gettersPopulation.getCountryPopulation(country);
  const result = (covidData.Countries[countryIndex].TotalConfirmed * 100000) / countryPopulation;
  return addSpaceDelimiter(+result.toFixed(2));
}

function getDeathCount100(country) {
  if (country === 'Planet') {
    const worldPopulation = gettersPopulation.getWorldPopulation();
    const result = (covidData.Global.TotalDeaths * 100000) / worldPopulation;
    return addSpaceDelimiter(+result.toFixed(2));
  }
  const countryIndex = getCountryIndex(country);
  const countryPopulation = gettersPopulation.getCountryPopulation(country);
  const result = (covidData.Countries[countryIndex].TotalDeaths * 100000) / countryPopulation;
  return addSpaceDelimiter(+result.toFixed(2));
}

function getRecoveryCount100(country) {
  if (country === 'Planet') {
    const worldPopulation = gettersPopulation.getWorldPopulation();
    const result = (covidData.Global.TotalRecovered * 100000) / worldPopulation;
    return addSpaceDelimiter(+result.toFixed(2));
  }
  const countryIndex = getCountryIndex(country);
  const countryPopulation = gettersPopulation.getCountryPopulation(country);
  const result = (covidData.Countries[countryIndex].TotalRecovered * 100000) / countryPopulation;
  return addSpaceDelimiter(+result.toFixed(2));
}

function getDiseaseCount100LastDay(country) {
  if (country === 'Planet') {
    const worldPopulation = gettersPopulation.getWorldPopulation();
    const result = (covidData.Global.NewConfirmed * 100000) / worldPopulation;
    return addSpaceDelimiter(+result.toFixed(2));
  }
  const countryIndex = getCountryIndex(country);
  const countryPopulation = gettersPopulation.getCountryPopulation(country);
  const result = (covidData.Countries[countryIndex].NewConfirmed * 100000) / countryPopulation;
  return addSpaceDelimiter(+result.toFixed(2));
}

function getDeathCount100LastDay(country) {
  if (country === 'Planet') {
    const worldPopulation = gettersPopulation.getWorldPopulation();
    const result = (covidData.Global.NewDeaths * 100000) / worldPopulation;
    return addSpaceDelimiter(+result.toFixed(2));
  }
  const countryIndex = getCountryIndex(country);
  const countryPopulation = gettersPopulation.getCountryPopulation(country);
  const result = (covidData.Countries[countryIndex].NewDeaths * 100000) / countryPopulation;
  return addSpaceDelimiter(+result.toFixed(2));
}

function getRecoveryCount100LastDay(country) {
  if (country === 'Planet') {
    const worldPopulation = gettersPopulation.getWorldPopulation();
    const result = (covidData.Global.NewRecovered * 100000) / worldPopulation;
    return addSpaceDelimiter(+result.toFixed(2));
  }
  const countryIndex = getCountryIndex(country);
  const countryPopulation = gettersPopulation.getCountryPopulation(country);
  const result = (covidData.Countries[countryIndex].NewRecovered * 100000) / countryPopulation;
  return addSpaceDelimiter(+result.toFixed(2));
}

// function getCountrycount() {
//   return covidData.Countries.length;
// }

export default {
  getDiseaseCount,
  getDeathCount,
  getRecoveryCount,
  getDiseaseCountLastDay,
  getDeathCountLastDay,
  getRecoveryCountLastDay,
  getDiseaseCount100,
  getDeathCount100,
  getRecoveryCount100,
  getDiseaseCount100LastDay,
  getDeathCount100LastDay,
  getRecoveryCount100LastDay,
  // getCountrycount,
};
