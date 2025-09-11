document.addEventListener('DOMContentLoaded', function() {
  const statusDiv = document.getElementById('status');
  
  chrome.storage.sync.get(['mode'], function(result) {
    const mode = result.mode || 'default';
    document.getElementById(mode).checked = true;
  });
  
  document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const selectedMode = this.value;
      
      chrome.storage.sync.set({ mode: selectedMode }, function() {
        statusDiv.textContent = 'Settings saved!';
        statusDiv.className = 'status show';
        
        chrome.tabs.query({ url: '*://news.ycombinator.com/*' }, function(tabs) {
          tabs.forEach(tab => {
            chrome.tabs.reload(tab.id);
          });
        });
        
        setTimeout(() => {
          statusDiv.className = 'status';
        }, 2000);
      });
    });
  });
});