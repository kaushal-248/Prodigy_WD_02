// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let timeElapsed = 0;
let lapCount = 1;

const timeDisplay = document.getElementById('time');
const lapList = document.getElementById('lap-list');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime + timeElapsed;
    
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    timeDisplay.innerHTML = formattedTime;
}

function pad(value) {
    return value < 10 ? '0' + value : value;
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        timeElapsed += new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    timeElapsed = 0;
    running = false;
    timeDisplay.innerHTML = '00:00:00';
    lapList.innerHTML = '';
    lapCount = 1;
}

function recordLap() {
    if (running) {
        const lapTime = timeDisplay.innerHTML;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCount}: ${lapTime}`;
        lapList.appendChild(li);
        lapCount++;
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
