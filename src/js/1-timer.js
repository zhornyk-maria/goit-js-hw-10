
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const dataTimePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("#start-btn");
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let userSelectedDate;

const flatpickrInstance = flatpickr(dataTimePicker, {
    enableTime: true,
    time_24hr: true,
    dateFormat: "Y-m-d H:i",
    defaultDate: new Date(),
    secondsIncrement: 1,
    onClose: function(selectedDates) {
        const selectedDate = selectedDates[0];
        userSelectedDate = selectedDate;
        if (selectedDate > new Date()) {
            startBtn.disabled = false;
            userSelectedDate = selectedDate;
        } else {
            userSelectedDate = null;
            startBtn.disabled = true;
            iziToast.show({
                message: 'Please choose a date in the future',
                messageColor: '#fff',
                position: 'topRight',
                backgroundColor: '#ef4040',
                animateInside: false,
                color: '#fff'
            });
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

class Timer {
    constructor(tick) {
        this.tick = tick;
        this.isActive = false;
    }

    start(targetDate) {
        if (this.isActive) return;
        this.isActive = true;
        this.targetDate = targetDate;
        
        setInterval(() => {
            const current = Date.now();
            const diff = this.targetDate - current;
            const timeObj = this.convertMs(diff);
            this.tick(timeObj);
        }, 500);
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
    startBtn.disabled = true;
    const targetDate = flatpickrInstance.selectedDates[0];
    timer.start(targetDate);
});





//console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

