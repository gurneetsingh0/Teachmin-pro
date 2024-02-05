// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'openNewTab') {
      // Create a new tab with the video download link
      chrome.tabs.create({ url: request.videoSrc });
    }
  });
  
