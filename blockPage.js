function countdown (t){
  let ms = t * 1000
  const x = setInterval(()=>{
    t--;
    document.querySelector("#timer").innerHTML = t 
    if( t === 0){
      window.history.back()
    }
    },1000)
  setTimeout(()=>{clearInterval(x)}, ms)
}

chrome.storage.sync.get(['countdownTime', 'message'], (result)=>{
    let time = result.countdownTime;
    document.querySelector("#timer").innerHTML = time;
    countdown(time);
    document.querySelector(".message").innerHTML = result.message;
});


function visitClick(){
  const visitBt = document.querySelector("#visit")
  visitBt.addEventListener("click", ()=>{
    chrome.runtime.sendMessage({decision:"visit"})
  })
}
visitClick()

function leaveClick(){
  const leaveBt = document.querySelector("#leave")
  leaveBt.addEventListener("click", ()=>{
    window.history.back()
  })
}
leaveClick()


