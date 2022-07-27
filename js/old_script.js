// Timer fields
const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const secondElement = document.querySelector('.second');

// Buttons
const startButton = document.querySelector('.start');
const pauseButton = document.querySelector('.pause');
const stopButton = document.querySelector('.stop');

// Listeners
startButton.addEventListener('click', () => {
  clearInterval(interval);
  interval = setInterval(startTimer, 10);
  
  console.log("work");
});

pauseButton.addEventListener('click', () => {
  clearInterval(interval);
});

stopButton.addEventListener('click', () => {
  clearInterval(interval);
  clearFields();
});

// Variables
let hour = 00,
    minute = 00,
    second = 00,
    millisecond = 00,
    interval;

// Main Function

function startTimer() {
  // Millisecond
  millisecond++;
  if(millisecond > 59) {
    second++;
    secondElement.innerText = "0" + second;
    millisecond = 0;
  }

  // Seconds
  if(second < 9) {
    secondElement.innerText = "0" + second;
  }
  if(second > 9) {
    secondElement.innerText = second;
  }
  if(second > 59) {
    minute++;
    minuteElement.innerText = "0" + minute;
    second = 0;
    secondElement.innerText = "0" + second;
  }

  // Minutes
  if(minute > 9) {
    minuteElement.innerText = minute;
  }
  if(minute> 59) {
    hour++;
    hourElement.innerText = "0" + hour;
    minute = 0;
    minuteElement.innerText = "0" + minute;
  }

  // Hours
  if(hour > 9) {
    minuteElement.innerText = hour;
  }
}

//Reset timer

function clearFields() {
  hour = 00;
  minute = 00;
  second = 00;
  millisecond = 00;
  hourElement.textContent = "00";
  minuteElement.textContent = "00";
  secondElement.textContent = "00";
}
