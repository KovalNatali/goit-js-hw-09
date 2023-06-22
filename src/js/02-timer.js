import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
    datetime: document.getElementById('datetime-picker'),
    startBtn: document.querySelector('button[data-start]')
}

refs.startBtn.setAttribute('disabled', true);

let timeDifference = 0;
let selectedDateInput = 0;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedDateInput = selectedDates[0].getTime();
  
      if ((selectedDateInput < Date.now())){
        Notiflix.Notify.warning('Please choose a date in the future');
      } else{
        refs.startBtn.removeAttribute('disabled');
      }
    },
  };

  flatpickr(refs.datetime, options);
  
  refs.startBtn.addEventListener('click', onClikTamerStart);
  function onClikTamerStart () {  
      const timer = setInterval(handelTime, 1000);
  }
  function handelTime() {
    timeDifference = selectedDateInput - Date.now();
    timeText();
  }
  
  function timeText () {
  const { days, hours, minutes, seconds } = convertMs(`${timeDifference}`);
  console.log(`${days}:${hours}:${minutes}:${seconds}`);
  refs.daysEl.textContent = `${days}`;
  refs.hoursEl.textContent = `${hours}`;
  refs.minutesEl.textContent = `${minutes}`;
  refs.secondsEl.textContent = `${seconds}`;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  

    const days = addLeadingZero(Math.floor(ms / day));

    const hours = addLeadingZero(Math.floor((ms % day) / hour));

    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));

    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  const addLeadingZero = value => {
    return value.toString().padStart(2, '0');
  };
  
 