
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dataTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let isButtonDisabled = false;

const flatpickrInstance = flatpickr(dataTimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    onClose: function(selectedDates) {
        const selectedDate = selectedDates[0];

        if (timer) {
            timer.stop();
        }
        
        if (selectedDate > new Date()) {
            startBtn.disabled = false;
            isButtonDisabled = false;
        } else {
            startBtn.disabled = true;
            isButtonDisabled = true;
            showError('Please choose a date in the future');
        }
    },
});

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

function tick({ days, hours, minutes, seconds }) {
    daysTimer.textContent = `${addLeadingZero(days)}`;
    hoursTimer.textContent = `${addLeadingZero(hours)}`;
    minutesTimer.textContent = `${addLeadingZero(minutes)}`;
    secondsTimer.textContent = `${addLeadingZero(seconds)}`;
}

function showError(msg) {
    iziToast.show({
        message: msg,
        messageColor: '#fff',
        position: 'topRight',
        backgroundColor: '#ef4040',
        animateInside: false,
        color: '#fff'
    });
}


class Timer {
    constructor(tick) {
        this.tick = tick;
        this.isActive = false;
        this.intervalId = null;
    }

    onInterval() {
        const current = Date.now();
        const diff = this.targetDate - current;
        const timeObj = this.convertMs(diff);
        this.tick(timeObj);
        if (timeObj.days === 0 && timeObj.hours === 0 && timeObj.minutes === 0 && timeObj.seconds === 0) {
            this.stop();
        }
    }

    start(targetDate) {
        if (!targetDate) {
            showError('Please select a valid date before starting the timer');
            return false;
        }

        if (targetDate <= new Date()) {
            showError('Please choose a date in the future');
            return false;
        }

        if (this.isActive) return true;
        this.isActive = true;
        this.targetDate = targetDate;
        this.onInterval();
        this.intervalId = setInterval(() => {
            this.onInterval();
        }, 1000);
        
        return true;
    }

    stop() {
        if (!this.isActive) return;
        this.isActive = false;
        clearInterval(this.intervalId);
        startBtn.disabled = false;
        isButtonDisabled = false;
        flatpickrInstance.input.disabled = false;
        tick({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }

    convertMs(ms) {
        // Number of milliseconds per unit of time
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Remaining days
        const days = Math.floor(ms / day);
        // Remaining hours
        const hours = Math.floor((ms % day) / hour);
        // Remaining minutes
        const minutes = Math.floor(((ms % day) % hour) / minute);
        // Remaining seconds
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);

        return { days, hours, minutes, seconds };
    }
}

const timer = new Timer(tick);

startBtn.addEventListener('click', () => {
    if (isButtonDisabled) {
        showError('Button is disabled');
        startBtn.disabled = true;
        return;
    }
    const targetDate = flatpickrInstance.selectedDates[0];
    const isStarted = timer.start(targetDate);

    if (isStarted) {
        startBtn.disabled = true;
        isButtonDisabled = true;
        flatpickrInstance.input.disabled = true;
    }
});
