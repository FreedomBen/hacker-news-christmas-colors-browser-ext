let cachedFestiveTreeUrl = null;

async function getFestiveTreeUrl() {
  if (cachedFestiveTreeUrl) {
    return cachedFestiveTreeUrl;
  }

  if (typeof HN_FESTIVE_TREE_DATA_URI === 'string') {
    cachedFestiveTreeUrl = HN_FESTIVE_TREE_DATA_URI;
    return cachedFestiveTreeUrl;
  }

  try {
    const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
    const response = await fetch(browserAPI.runtime.getURL('xmas_tree_animated.gif'));
    const blob = await response.blob();
    cachedFestiveTreeUrl = URL.createObjectURL(blob);
    return cachedFestiveTreeUrl;
  } catch (error) {
    console.error('HN Christmas Colors: Unable to load festive GIF', error);
    return null;
  }
}

function addFestiveGif() {
  // Skip festive GIF on comment threads
  if (isCommentsPage()) {
    removeFestiveGif();
    return;
  }

  // Remove existing GIF if present
  removeFestiveGif();

  // Wait a bit for page to load if needed
  setTimeout(async () => {
    const treeUrl = await getFestiveTreeUrl();
    if (!treeUrl) {
      return;
    }

    // Find the first story item
    const firstStory = document.querySelector('.athing');
    if (!firstStory) {
      console.log('HN Christmas Colors: No stories found for GIF placement');
      return;
    }

    // Create a new row for the festive element
    const gifRow = document.createElement('tr');
    gifRow.id = 'hn-festive-gif';

    // Display the Wikimedia animated tree while keeping layout consistent
    gifRow.innerHTML = `
      <td colspan="3" style="text-align: center; padding: 20px 0; background: #f6f6ef;">
        <img src="${treeUrl}" alt="Animated Christmas tree" style="width: 120px; height: auto;">
        <div style="margin-top: 5px; color: #005a00; font-weight: bold; font-size: 14px;">
          🎄 Merry Christmas and Happy Holidays! 🎄
        </div>
      </td>
    `;

    // Insert before the first story
    firstStory.parentNode.insertBefore(gifRow, firstStory);
    console.log('HN Christmas Colors: Festive decoration added');
  }, 100);
}

function isCommentsPage() {
  return window.location.pathname === '/item' || !!document.querySelector('.comment-tree');
}

function removeFestiveGif() {
  const existingGif = document.getElementById('hn-festive-gif');
  if (existingGif) {
    existingGif.remove();
  }
}

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

async function applyChristmasColors() {
  try {
    // Cross-browser compatibility
    const browserAPI = typeof browser !== 'undefined' ? browser : chrome;
    
    // Get user settings
    let result;
    if (typeof browser !== 'undefined') {
      // Firefox uses promises
      result = await browserAPI.storage.sync.get(['mode']);
    } else {
      // Chrome uses callbacks, wrap in promise
      result = await new Promise((resolve) => {
        chrome.storage.sync.get(['mode'], resolve);
      });
    }
    
    const mode = result.mode || 'default';
    
    // Handle different modes
    if (mode === 'always-off') {
      // Remove Christmas colors if they're applied
      document.body.classList.remove('hn-christmas-colors');
      document.body.classList.remove('hn-extra-festive');
      removeFestiveGif();
      return;
    }
    
    if (mode === 'extra-festive') {
      // Extra Festive mode - animated colors and GIF
      document.body.classList.add('hn-christmas-colors');
      document.body.classList.add('hn-extra-festive');

      // Add festive GIF at the top of the story list
      addFestiveGif();

      // Handle dynamically loaded content
      const observer = new MutationObserver(() => {
        if (document.body && !document.body.classList.contains('hn-extra-festive')) {
          document.body.classList.add('hn-christmas-colors');
          document.body.classList.add('hn-extra-festive');
        }
        // Keep GIF off comment pages; otherwise ensure it's present
        if (isCommentsPage()) {
          removeFestiveGif();
        } else if (!document.getElementById('hn-festive-gif')) {
          addFestiveGif();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else if (mode === 'always-on' || (mode === 'default' && isHolidaySeason())) {
      // Add the christmas-colors class to body to activate our CSS
      document.body.classList.add('hn-christmas-colors');
      document.body.classList.remove('hn-extra-festive');
      removeFestiveGif();

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
    } else {
      // Remove Christmas colors if outside holiday season in default mode
      document.body.classList.remove('hn-christmas-colors');
      document.body.classList.remove('hn-extra-festive');
      removeFestiveGif();
    }
  } catch (error) {
    console.error('Error accessing storage:', error);
    // Fall back to default behavior if storage access fails
    if (isHolidaySeason()) {
      document.body.classList.add('hn-christmas-colors');
    }
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyChristmasColors);
} else {
  applyChristmasColors();
}
