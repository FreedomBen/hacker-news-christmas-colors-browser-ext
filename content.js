function isHolidaySeason() {
  const today = new Date();
  const year = today.getFullYear();
  
  // Get Thanksgiving (fourth Thursday of November)
  const november = new Date(year, 10, 1); // Month is 0-indexed
  const firstThursday = november.getDay() <= 4 ? 
    new Date(year, 10, 1 + (4 - november.getDay())) : 
    new Date(year, 10, 1 + (11 - november.getDay()));
  const thanksgiving = new Date(firstThursday);
  thanksgiving.setDate(thanksgiving.getDate() + 21); // Add 3 weeks to get 4th Thursday
  
  // Day after Thanksgiving
  const startDate = new Date(thanksgiving);
  startDate.setDate(startDate.getDate() + 1);
  
  // First workday of new year (accounting for weekends)
  let endDate = new Date(year + 1, 0, 1); // January 1st of next year
  
  // If January 1st is Saturday, first workday is Monday the 3rd
  if (endDate.getDay() === 6) {
    endDate.setDate(3);
  }
  // If January 1st is Sunday, first workday is Monday the 2nd
  else if (endDate.getDay() === 0) {
    endDate.setDate(2);
  }
  // Otherwise, January 1st is a weekday and is the first workday
  
  // Check if today is within the holiday season
  return today >= startDate && today < endDate;
}

function applyChristmasColors() {
  // Only apply if we're in the holiday season
  if (!isHolidaySeason()) {
    return;
  }
  
  // Add the christmas-colors class to body to activate our CSS
  document.body.classList.add('hn-christmas-colors');
  
  // Also handle dynamically loaded content
  const observer = new MutationObserver(() => {
    if (document.body && !document.body.classList.contains('hn-christmas-colors')) {
      document.body.classList.add('hn-christmas-colors');
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyChristmasColors);
} else {
  applyChristmasColors();
}