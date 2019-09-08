
// create options for the duration
function optionCreate() {
  const select = document.querySelector('select');
  for (let i = 1; i <= 25; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    select.appendChild(option);
  }
};

const urlRemove = (event) => {
  const node = event.target.parentElement;
  const value = node.querySelector("span").innerHTML
  chrome.storage.sync.get(['urls'], function(result){
    const newList = result.urls.filter(url=> value!==url)
    chrome.storage.sync.set({urls:newList})
  })
  node.remove();
};

function urlDisplay(url) {
      const div = document.createElement("div")
      div.classList = "centering margin-bottom"
      const span = document.createElement('span');
      span.innerHTML = url;
      const icon = document.createElement('i')
      icon.classList = "material-icons"
      icon.innerHTML = "delete_outline"
      icon.addEventListener("click", function(event){urlRemove(event)})
      const list = document.querySelector('#urlList');
      div.appendChild(icon);
      div.appendChild(span);
      list.appendChild(div);
}

const urlAdd = () => {
  const url = document.querySelector('#url').value;          
  chrome.storage.sync.get(['urls'],(result)=>{
    let newList = result.urls
    newList.push(url)
    chrome.storage.sync.set({urls:newList})
  })
  document.querySelector('#url').value = ""
  urlDisplay(url)
};

function linkFuncToAdd () {
  const node = document.querySelector("#add");
  node.addEventListener("click", ()=>{urlAdd();})

  const inputNode = document.querySelector('#url');
  inputNode.addEventListener("keyup", (event)=> {
    if(event.key==="Enter"){
      urlAdd()
    }
  })
};


//submitting message
function msSub (){
  const node = document.querySelector('#saveBt');
  let msNode = document.querySelector("#message")
  chrome.storage.sync.get(['message'], (result)=>{
    msNode.setAttribute("value", result.message)
  })
  node.addEventListener("click", ()=>{
    chrome.storage.sync.set({message: msNode.value})
    })
};

//submitting count down time
function timerValue() {
  const node = document.querySelector('select')
  chrome.storage.sync.get(["countdownTime"], (result)=>{
    time = String(result.countdownTime)
    const node = document.querySelector(`option[value="${time}"]`)
    node.setAttribute("selected", "selected")
  })
  node.addEventListener('change', (event)=>{
    chrome.storage.sync.set({countdownTime: event.target.value})
  })
}


// lodash library
// let _;
function init() {
  optionCreate()
  linkFuncToAdd()
  msSub()
  timerValue()
  chrome.storage.sync.get(['urls'], (result) => {
    if(result.urls.length!==0){
      result.urls.forEach((url)=>{
        urlDisplay(url)
      })
    }
  })
}
init()
