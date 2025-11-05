function addFestiveGif() {
  // Remove existing GIF if present
  removeFestiveGif();

  // Wait a bit for page to load if needed
  setTimeout(() => {
    // Find the first story item
    const firstStory = document.querySelector('.athing');
    if (!firstStory) {
      console.log('HN Christmas Colors: No stories found for GIF placement');
      return;
    }

    // Create a new row for the festive element
    const gifRow = document.createElement('tr');
    gifRow.id = 'hn-festive-gif';

    // Use inline SVG Christmas tree with animation to avoid CSP issues
    gifRow.innerHTML = `
      <td colspan="3" style="text-align: center; padding: 20px 0; background: #f6f6ef;">
        <svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
          <!-- Tree layers -->
          <polygon points="40,10 20,35 60,35" fill="#0f7938">
            <animate attributeName="fill" values="#0f7938;#1a9c4a;#0f7938" dur="2s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="40,20 15,50 65,50" fill="#0f7938">
            <animate attributeName="fill" values="#0f7938;#1a9c4a;#0f7938" dur="2s" begin="0.5s" repeatCount="indefinite"/>
          </polygon>
          <polygon points="40,35 10,70 70,70" fill="#0f7938">
            <animate attributeName="fill" values="#0f7938;#1a9c4a;#0f7938" dur="2s" begin="1s" repeatCount="indefinite"/>
          </polygon>

          <!-- Trunk -->
          <rect x="35" y="70" width="10" height="15" fill="#8B4513"/>

          <!-- Star on top -->
          <polygon points="40,5 42,12 48,12 43,16 45,23 40,19 35,23 37,16 32,12 38,12" fill="#FFD700">
            <animate attributeName="fill" values="#FFD700;#FFF700;#FFD700" dur="1s" repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" from="0 40 14" to="360 40 14" dur="4s" repeatCount="indefinite"/>
          </polygon>

          <!-- Ornaments -->
          <circle cx="30" cy="32" r="3" fill="#ff0000">
            <animate attributeName="r" values="3;4;3" dur="1.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="50" cy="32" r="3" fill="#ff0000">
            <animate attributeName="r" values="3;4;3" dur="1.5s" begin="0.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="25" cy="48" r="3" fill="#ffd700">
            <animate attributeName="r" values="3;4;3" dur="1.5s" begin="0.25s" repeatCount="indefinite"/>
          </circle>
          <circle cx="55" cy="48" r="3" fill="#ffd700">
            <animate attributeName="r" values="3;4;3" dur="1.5s" begin="0.75s" repeatCount="indefinite"/>
          </circle>
          <circle cx="20" cy="65" r="3" fill="#ff0000">
            <animate attributeName="r" values="3;4;3" dur="1.5s" begin="1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="40" cy="60" r="3" fill="#ffd700">
            <animate attributeName="r" values="3;4;3" dur="1.5s" begin="0.1s" repeatCount="indefinite"/>
          </circle>
          <circle cx="60" cy="65" r="3" fill="#ff0000">
            <animate attributeName="r" values="3;4;3" dur="1.5s" begin="1.25s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <div style="margin-top: 5px; color: #005a00; font-weight: bold; font-size: 14px;">
          🎄 Happy Holidays! 🎄
        </div>
      </td>
    `;

    // Insert before the first story
    firstStory.parentNode.insertBefore(gifRow, firstStory);
    console.log('HN Christmas Colors: Festive decoration added');
  }, 100);
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
        // Re-add GIF if it gets removed
        if (!document.getElementById('hn-festive-gif')) {
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
