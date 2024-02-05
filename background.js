chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'openNewTab') {
        
        chrome.tabs.create({ url: request.videoSrc, active: false }, (tab) => {
            console.log('Video download tab opened in background:', request.videoSrc);
        });
    }
});
