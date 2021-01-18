export function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

export function getIntervalData(interval = 'all') {
  console.log(interval);
  switch (interval) {
    case 'day':
      
      break;
    case 'month':
      
      break;
    // case 'week':
    
    //   break;
    // case 'year':
  
    //   break;
    case 'all':
      return getExpenses();
    default:
      break;
  }
}
