let videoSrcToDownload = null;
let darkModeEnabled = true;

function injectStylesheet() {
    const currentUrl = window.location.href;

    if (darkModeEnabled) {
        if (currentUrl.includes("accounts.teachmint.com")) {
            // For accounts.teachmint.com
            injectStylesheetLink("https://cdn.glitch.global/1d691b76-1866-4866-857e-5927236b6a86/accounts.css?v=1707053923690");
        } else if (currentUrl.includes("teachmint.com")) {
            // For teachmint.com and its subdomains except accounts.teachmint.com
            injectStylesheetLink("https://cdn.glitch.global/1d691b76-1866-4866-857e-5927236b6a86/main.css?v=1707055973604");
        }
    }
}

function injectStylesheetLink(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.body.appendChild(link);
}

function removeStylesheet() {
    const stylesheets = document.querySelectorAll('link[href*="cdn.glitch.global"]');
    stylesheets.forEach((stylesheet) => {
        stylesheet.remove();
    });
}

function storeVideoSrc() {
    const modalContainers = document.querySelectorAll('.ReactModalPortal .ReactModal__Content video');

    modalContainers.forEach(video => {
        const src = video.getAttribute('src');
        if (src && src.startsWith('https://storage.googleapis.com/teachstack/video_lectures/')) {
            videoSrcToDownload = src;
            console.log('Video src stored:', src);
        }
    });
}

function downloadVideo() {
    if (videoSrcToDownload) {
        chrome.runtime.sendMessage({ action: 'openNewTab', videoSrc: videoSrcToDownload });
    } else {
        console.error('No video src available to download.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    injectStylesheet();

    setInterval(() => {
        storeVideoSrc();
    }, 2000);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'downloadVideo') {
        downloadVideo();
    } else if (request.action === 'toggleDarkMode') {
        darkModeEnabled = request.darkModeEnabled;

        if (darkModeEnabled) {
            injectStylesheet();
        } else {
            removeStylesheet();
        }
    }
});
