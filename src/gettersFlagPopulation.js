/* eslint-disable arrow-body-style */
import flagsPopulation from './populationDataMock';

function getWorldPopulation() {
  return flagsPopulation.reduce((accum, country) => accum + country.population, 0);
}

function getCountryIndex(country) {
  return flagsPopulation.findIndex((countryObj) => {
    switch (country) {
      case 'Cape Verde':
        return countryObj.name.includes('Cabo Verde');
      case 'Lao PDR':
        return countryObj.name.includes('Lao People');
      case 'Palestinian Territory':
        return countryObj.name.includes('Palestine');
      case 'Saint Vincent and Grenadines':
        return countryObj.name.includes('Saint Vincent and the Grenadines');
      case 'Congo (Brazzaville)':
        return countryObj.name === 'Congo';
      case 'Congo (Kinshasa)':
        return countryObj.name.includes('Congo (Democr');
      default:
        break;
    }
    return countryObj.name.includes(country);
  });
}

function getCountryFlag(country) {
  if (country === 'Planet') return 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg';

  const indexOfCountry = getCountryIndex(country);

  return flagsPopulation[indexOfCountry].flag;
}

function getCountryPopulation(country) {
  if (country === 'Planet') return getWorldPopulation();

  const indexOfCountry = getCountryIndex(country);

  return flagsPopulation[indexOfCountry].population;
}

export default {
  getWorldPopulation,
  getCountryFlag,
  getCountryPopulation,
};
