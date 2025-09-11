// Cross-browser compatibility wrapper
const browserAPI = (function() {
  // If browser API exists (Firefox), return it
  if (typeof browser !== 'undefined') {
    return browser;
  }
  
  // Otherwise, create a wrapper for Chrome that converts callbacks to promises
  return {
    storage: {
      sync: {
        get: (keys) => {
          return new Promise((resolve) => {
            chrome.storage.sync.get(keys, resolve);
          });
        },
        set: (items) => {
          return new Promise((resolve) => {
            chrome.storage.sync.set(items, resolve);
          });
        }
      }
    },
    tabs: {
      query: (queryInfo) => {
        return new Promise((resolve) => {
          chrome.tabs.query(queryInfo, resolve);
        });
      },
      reload: (tabId) => {
        return new Promise((resolve) => {
          chrome.tabs.reload(tabId, resolve);
        });
      }
    }
  };
})();

document.addEventListener('DOMContentLoaded', async function() {
  const statusDiv = document.getElementById('status');
  
  try {
    const result = await browserAPI.storage.sync.get(['mode']);
    const mode = result.mode || 'default';
    document.getElementById(mode).checked = true;
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  
  document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', async function() {
      const selectedMode = this.value;
      
      try {
        await browserAPI.storage.sync.set({ mode: selectedMode });
        
        statusDiv.textContent = 'Settings saved!';
        statusDiv.className = 'status show';
        
        const tabs = await browserAPI.tabs.query({ url: '*://news.ycombinator.com/*' });
        for (const tab of tabs) {
          await browserAPI.tabs.reload(tab.id);
        }
        
        setTimeout(() => {
          statusDiv.className = 'status';
        }, 2000);
      } catch (error) {
        console.error('Error saving settings:', error);
        statusDiv.textContent = 'Error saving settings';
        statusDiv.className = 'status show';
      }
    });
  });
});