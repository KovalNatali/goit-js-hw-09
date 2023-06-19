const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

  let timerId = null;

// refs.startBtn.addEventListener('click', onClickStart);
refs.stopBtn.addEventListener('click', onClickStop);



  refs.startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
   refs.body.style.background = getRandomHexColor()
    }, 1000);
   refs.startBtn.setAttribute("disabled", true);
  });
  
  
 function onClickStop() {
    clearInterval(timerId);
    refs.startBtn.removeAttribute("disabled")
  }

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

