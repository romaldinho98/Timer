const SVG_BTN_START = `<svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.3806 20.3576L12.6069 4.47295C12.3114 4.2471 11.9349 4.09331 11.5251 4.03101C11.1153 3.96872 10.6906 4.00072 10.3046 4.12296C9.91855 4.24521 9.58858 4.45221 9.35638 4.71781C9.12418 4.98342 9.00016 5.29569 9 5.61518V37.3836C8.99962 37.7033 9.12333 38.0158 9.35544 38.2817C9.58755 38.5476 9.91763 38.7548 10.3039 38.8771C10.6901 38.9994 11.1151 39.0313 11.5251 38.9688C11.9351 38.9063 12.3116 38.7521 12.6069 38.5258L33.3806 22.6421C33.5769 22.4921 33.7327 22.3141 33.839 22.1181C33.9453 21.9221 34 21.712 34 21.4998C34 21.2876 33.9453 21.0775 33.839 20.8815C33.839 20.8815 33.5769 20.5075 33.3806 20.3576Z" fill="white"/></svg>`;

const SVG_BTN_PAUSE = `<svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.9375 34.898V6.09395C17.9375 5.55742 17.5051 5.125 16.9605 5.125H11.227C10.6824 5.125 10.25 5.55742 10.25 6.09395V34.898C10.25 35.4346 10.6824 35.875 11.227 35.875H16.9605C17.5051 35.875 17.9375 35.4426 17.9375 34.898Z" fill="white"/><path d="M29.773 5.125H24.0395C23.5029 5.125 23.0625 5.55742 23.0625 6.09395V34.898C23.0625 35.4346 23.4949 35.875 24.0395 35.875H29.773C30.3096 35.875 30.75 35.4426 30.75 34.898V6.09395C30.75 5.55742 30.3176 5.125 29.773 5.125Z" fill="white"/></svg>`;

// States
const STOPPED = "STOPPED";
const STARTED = "STARTED";
const PAUSED = "PAUSED";

// Buttons
const startOrPauseButton = document.querySelector('.startOrPause');
const stopButton = document.querySelector('.stop');

let handler, accumulator = 0;
let startTimestamp;

// Initial state
let state = STOPPED;

function updateButtons() {
  if (state === STARTED) {
    startOrPauseButton.innerHTML = SVG_BTN_PAUSE;
  } else {
    startOrPauseButton.innerHTML = SVG_BTN_START;
  }
}

function tick() {
  const milliseconds = accumulator + Date.now() - startTimestamp;
  const secondsTotal = Math.floor(milliseconds / 1000);
  const minutesTotal = Math.floor(secondsTotal / 60);
  const hours = Math.floor(minutesTotal / 60);

  const seconds = secondsTotal % 60;
  const minutes = minutesTotal % 60;
    
  updateDisplayTime(hours, minutes, seconds);
}

function updateDisplayTime(hours, minutes, seconds) {
  const padZero = num => num.toString().padStart(2, '0');
  const result = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
  document.querySelector('.timer').innerText = result;
}

// function startOrResume() {
//   startTimestamp = Date.now();
//   handler = setInterval(tick);
//   console.log(handler);
//   startButton.value = "Start";
// }

// function pause() {
//   accumulator += Date.now() - startTimestamp;
//   clearInterval(handler);
// }

function startOrPause() {
  if (state === STARTED) {
    // pause
    state = PAUSED;
    accumulator += Date.now() - startTimestamp;
    clearInterval(handler);
  } else {
    // start or resume
    state = STARTED;
    startTimestamp = Date.now();
    handler = setInterval(tick);
  }
  updateButtons();
}

function stop() {
  state = STOPPED;
  accumulator = 0;
  startTimestamp = 0;
  clearInterval(handler);
  updateDisplayTime(0, 0, 0);
  updateButtons();
}

startOrPauseButton.addEventListener('click', startOrPause);
stopButton.addEventListener('click', stop);