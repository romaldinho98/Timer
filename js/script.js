const time = document.querySelector('.timer');

// Buttons
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const stopButton = document.querySelector('.stop');

const padZero = num => num.toString().padStart(2, '0');

let handler, accumulator = 0, 
    startTimestamp;

function tick() {
  const milliseconds = accumulator + Date.now() - startTimestamp;
  const secondsTotal = Math.floor(milliseconds / 1000);
  const minutesTotal = Math.floor(secondsTotal / 60);
  const hours = Math.floor(minutesTotal / 60);

  const seconds = secondsTotal % 60;
  const minutes = minutesTotal % 60;

  const result = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

  console.log(result);
  time.innerText = result;
}

function startOrResume() {
  startTimestamp = Date.now();
  handler = setInterval(tick);
}

function pause() {
  accumulator += Date.now() - startTimestamp;
  clearInterval(handler);
}

function stop() {
  accumulator = 0;
  startTimestamp = 0;
  clearInterval(handler);
  time.textContent = "00:00:00";
}

startButton.addEventListener('click', () => {
  startOrResume();
});

pauseButton.addEventListener('click', () => {
  pause();
});

stopButton.addEventListener('click', () => {
  stop();
});