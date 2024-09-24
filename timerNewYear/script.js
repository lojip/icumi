const newYearDate = new Date('Jan 1, 2025 00:00:00').getTime();
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

const countdown = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = newYearDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    daysElement.textContent = days;
    hoursElement.textContent = hours;
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;

    if (timeLeft < 0) {
        clearInterval(countdown);
        document.querySelector('.countdown-container').innerHTML = "<h1>С Новым годом!</h1>";
    }
}, 1000);