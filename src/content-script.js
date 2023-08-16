chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "index") {
    sendResponse({ innerText: document.body.innerText });
  }
});
