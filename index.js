// Default values
const TWENTYFIVE = 25 * 60;
const FIVE = 5 * 60;

let breakTimeSeconds = 5 * 60;
let workTimeSeconds = 25 * 60;
let isWorking = true;
let isPaused = true;
let workCountdown;
let breakCountdown;

// Break Elements
const breakReduceBtn = document.getElementById("break-reduce");
const breakIncreaseBtn = document.getElementById("break-increase");
const breakTime = document.getElementById("break-time");

// Work Elements
const workReduceBtn = document.getElementById("work-reduce");
const workIncreaseBtn = document.getElementById("work-increase");
const workTime = document.getElementById("work-time");

// Timer Elements
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const timerName = document.getElementById("timer-name");

// Timer Button Elements
const timerToggle = document.getElementById("timer-toggle");
const resetBtn = document.getElementById("timer-reset");
const skipBtn = document.getElementById("timer-skip");

// Update Timer Function
function updateTimer(seconds) {
  timerMinutes.textContent = parseInt(seconds / 60);
  timerSeconds.textContent = parseInt(seconds % 60);
  if (timerMinutes.textContent.length == 1) {
    timerMinutes.textContent = "0" + timerMinutes.textContent;
  }
  if (timerSeconds.textContent.length == 1) {
    timerSeconds.textContent = "0" + timerSeconds.textContent;
  }
}

// Reset Timer Fucntion
function reset() {
  isWorking = true;
  isPaused = true;
  breakTimeSeconds = FIVE;
  workTimeSeconds = TWENTYFIVE;

  breakTime.textContent = breakTimeSeconds / 60;
  workTime.textContent = workTimeSeconds / 60;

  updateTimer(workTimeSeconds);
  timerName.textContent = "WORK";

  clearInterval(workCountdown);
  clearInterval(breakCountdown);
}

// Play Sound Function
function playSound() {
  let a = new Audio("audio/ding.wav");
  a.play();
}

// Break Button Event Listeners
// Reduces and Increases break time by 1 minute intervals
breakReduceBtn.addEventListener("click", () => {
  if (isPaused == false) {
    return;
  }

  if (breakTimeSeconds <= 60) {
    return;
  }

  if (breakTimeSeconds != 5 * 60) {
    breakTimeSeconds = Math.ceil(breakTimeSeconds / 60) * 60;
  }

  breakTimeSeconds -= 60;
  breakTime.textContent = breakTimeSeconds / 60;

  if (isWorking == false) {
    updateTimer(breakTimeSeconds);
  }
});

breakIncreaseBtn.addEventListener("click", () => {
  if (isPaused == false) {
    return;
  }

  if (breakTimeSeconds >= 3600) {
    return;
  }

  if (breakTimeSeconds != 5 * 60) {
    breakTimeSeconds = Math.ceil(breakTimeSeconds / 60) * 60;
  }

  breakTimeSeconds += 60;
  breakTime.textContent = breakTimeSeconds / 60;

  if (isWorking == false) {
    updateTimer(breakTimeSeconds);
  }
});

// Work Button Event Listeners
// Reduces and Increases work time by 1 minute intervals
workReduceBtn.addEventListener("click", () => {
  if (isPaused == false) {
    return;
  }

  if (workTimeSeconds <= 60) {
    return;
  }

  if (workTimeSeconds != 25 * 60) {
    workTimeSeconds = Math.ceil(workTimeSeconds / 60) * 60;
  }

  workTimeSeconds -= 60;
  workTime.textContent = workTimeSeconds / 60;

  if (isWorking) {
    updateTimer(workTimeSeconds);
  }
});

workIncreaseBtn.addEventListener("click", () => {
  if (isPaused == false) {
    return;
  }

  if (workTimeSeconds >= 3600) {
    return;
  }

  if (workTimeSeconds != 25 * 60) {
    workTimeSeconds = Math.ceil(workTimeSeconds / 60) * 60;
  }

  workTimeSeconds += 60;
  workTime.textContent = workTimeSeconds / 60;

  if (isWorking) {
    updateTimer(workTimeSeconds);
  }
});

// Timer Button Event Listeners and countdown loop
timerToggle.addEventListener("click", () => {
  // Work Session Timer
  if (isWorking == true && isPaused == true) {
    isPaused = false;
    workCountdown = setInterval(() => {
      workTimeSeconds -= 1;
      updateTimer(workTimeSeconds);

      if (workTimeSeconds === 0) {
        playSound();
        clearInterval(workCountdown);
        isWorking = false;
        isPaused = true;
        timerName.textContent = "BREAK";
        workTimeSeconds = parseInt(workTime.textContent * 60);

        updateTimer(breakTimeSeconds);
      }
    }, 1000);
  } else if (isWorking && isPaused == false) {
    isPaused = true;
    clearInterval(workCountdown);
  }

  // Break Session Timer
  if (isWorking == false && isPaused == true) {
    isPaused = false;
    breakCountdown = setInterval(() => {
      breakTimeSeconds -= 1;
      updateTimer(breakTimeSeconds);

      if (breakTimeSeconds === 0) {
        playSound();
        clearInterval(breakCountdown);
        isWorking = true;
        isPaused = true;
        timerName.textContent = "WORK";
        breakTimeSeconds = parseInt(breakTime.textContent * 60);

        updateTimer(workTimeSeconds);
      }
    }, 1000);
  } else if (isWorking == false && isPaused == false) {
    isPaused = true;
    clearInterval(breakCountdown);
  }
});

//Add event listener to reset button to reset timer.
resetBtn.addEventListener("click", () => {
  reset();
});

//
skipBtn.addEventListener("click", () => {
  // if is working
  // skip to break
  // else skip to work
  if (isWorking == true) {
    isPaused = true;
    isWorking = false;
    timerName.textContent = "BREAK";
    breakTimeSeconds = parseInt(breakTime.textContent * 60);

    updateTimer(breakTimeSeconds);
    clearInterval(workCountdown);
  } else if (isWorking == false) {
    isPaused = true;
    isWorking = true;
    timerName.textContent = "WORK";
    workTimeSeconds = parseInt(workTime.textContent * 60);

    updateTimer(workTimeSeconds);
    clearInterval(breakCountdown);
  }
});
