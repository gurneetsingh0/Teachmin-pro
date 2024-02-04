document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');

  darkModeToggle.addEventListener('change', function() {
      const isChecked = darkModeToggle.checked;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleDarkMode', darkModeEnabled: isChecked });
      });
  });

  document.getElementById('downloadBtn').addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'downloadVideo' });
      });
  });
});
