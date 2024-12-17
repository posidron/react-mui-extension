chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openTab",
    title: "Open in New Tab",
    contexts: ["action"], // This makes it appear only in extension icon context menu
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "openTab") {
    chrome.tabs.create({ url: "tab.html" });
  }
});
