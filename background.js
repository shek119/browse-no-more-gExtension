chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
  chrome.storage.sync.set({message: "Achieve Your goal"})
  chrome.storage.sync.set({countdownTime: 20})
  chrome.storage.sync.set({urls: []})
});

chrome.browserAction.onClicked.addListener(function(tab) { chrome.runtime.openOptionsPage()});

let urlsList 
const getUrls = () =>{
  chrome.storage.sync.get(["urls"], (result)=>{
    urlsList = result.urls
  })
}
getUrls()

chrome.storage.onChanged.addListener(() => {
  getUrls()
})

let banToggle = true
chrome.runtime.onMessage.addListener((request)=>{
  if (request.decision === "visit"){
      banToggle = false;
      chrome.tabs.update(null,{url:requestedUrl})
  }
})

let requestedUrl 
let lastVisit
chrome.webRequest.onHeadersReceived.addListener((details)=>{
  let redirectUrl 
  urlsList.forEach(i => {
    if(details.url.includes(i) && banToggle){
      redirectUrl = chrome.extension.getURL("blockPage.html")
      requestedUrl = details.url
    } else{
      redirectUrl = null;
      }
  })
  return {redirectUrl}
},
  {urls: ["<all_urls>"]}, 
  ['blocking']
)

chrome.webNavigation.onCompleted.addListener(()=>{
  banToggle = true
})
