let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');

let startTime;
let updatedTime;
let difference;
let interval;
let isRunning = false;
let savedTime = 0;

function startTimer() {
    if (!isRunning) {
        startTime = new Date().getTime() - savedTime;
        interval = setInterval(updateTimer, 1000);
        isRunning = true;
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(interval);
        savedTime = new Date().getTime() - startTime;
        isRunning = false;
    }
}

function resetTimer() {
    clearInterval(interval);
    isRunning = false;
    savedTime = 0;
    timerDisplay.textContent = "00:00:00";
}

function updateTimer() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerDisplay.textContent = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);