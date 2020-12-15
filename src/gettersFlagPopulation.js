import flagsPopulation from './populationDataMock';

// function getCountryCount() {
//   return flagsPopulation.length;
// }

function getWorldPopulation() {
  return flagsPopulation.reduce((accum, country) => accum + country.population, 0);
}

function getCountryPopulation(country) {
  // eslint-disable-next-line arrow-body-style
  const indexOfCountry = flagsPopulation.findIndex((countryElem) => {
    return countryElem.name === country;
  });
  return flagsPopulation[indexOfCountry].population;
}

export default {
  // getCountryCount,
  getWorldPopulation,
  getCountryPopulation,
};
