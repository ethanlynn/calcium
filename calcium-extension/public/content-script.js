const getText = () => {
  return document.body.innerText;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_TEXT") {
    sendResponse(getText());
  }
});
