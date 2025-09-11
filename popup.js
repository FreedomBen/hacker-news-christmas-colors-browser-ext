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
    },
    permissions: {
      contains: (permissions) => {
        return new Promise((resolve) => {
          chrome.permissions.contains(permissions, resolve);
        });
      },
      request: (permissions) => {
        return new Promise((resolve) => {
          chrome.permissions.request(permissions, resolve);
        });
      }
    }
  };
})();

async function checkStoragePermission() {
  try {
    const hasPermission = await browserAPI.permissions.contains({ permissions: ['storage'] });
    return hasPermission;
  } catch (error) {
    console.error('Error checking storage permission:', error);
    return false;
  }
}

async function requestStoragePermission() {
  try {
    const granted = await browserAPI.permissions.request({ permissions: ['storage'] });
    return granted;
  } catch (error) {
    console.error('Error requesting storage permission:', error);
    return false;
  }
}

document.addEventListener('DOMContentLoaded', async function() {
  const statusDiv = document.getElementById('status');
  const settingsDiv = document.querySelector('.settings');
  const permissionDiv = document.getElementById('permission-request');
  const grantButton = document.getElementById('grant-permission');
  
  const hasStorage = await checkStoragePermission();
  
  if (!hasStorage) {
    // Show permission request UI
    settingsDiv.style.display = 'none';
    permissionDiv.style.display = 'block';
    
    grantButton.addEventListener('click', async function() {
      const granted = await requestStoragePermission();
      if (granted) {
        // Reload popup to show settings
        window.location.reload();
      } else {
        statusDiv.textContent = 'Permission denied. Using default behavior.';
        statusDiv.className = 'status show error';
      }
    });
    return;
  }
  
  // Storage permission is available, show settings
  permissionDiv.style.display = 'none';
  settingsDiv.style.display = 'flex';
  
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
        statusDiv.className = 'status show error';
      }
    });
  });
});