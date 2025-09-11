// Cross-browser compatibility
const browserAPI = typeof browser !== 'undefined' ? browser : chrome;

document.addEventListener('DOMContentLoaded', function() {
  const statusDiv = document.getElementById('status');
  
  browserAPI.storage.sync.get(['mode'], function(result) {
    const mode = result.mode || 'default';
    document.getElementById(mode).checked = true;
  });
  
  document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const selectedMode = this.value;
      
      browserAPI.storage.sync.set({ mode: selectedMode }, function() {
        statusDiv.textContent = 'Settings saved!';
        statusDiv.className = 'status show';
        
        browserAPI.tabs.query({ url: '*://news.ycombinator.com/*' }, function(tabs) {
          tabs.forEach(tab => {
            browserAPI.tabs.reload(tab.id);
          });
        });
        
        setTimeout(() => {
          statusDiv.className = 'status';
        }, 2000);
      });
    });
  });
});