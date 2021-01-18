export function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

function getIntervalData(interval = 'day') {
  console.log(interval);
}
