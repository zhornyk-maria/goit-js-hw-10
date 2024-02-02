
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const delay = parseInt(formData.get('delay'));
    const state = formData.get('state');

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then(
        (delay) => {
            iziToast.success({
                iconUrl: '../img/success-icon.png',
                messageColor: '#fff',
                position: 'topRight',
                titleColor: '#fff',
                message: `✅ Fulfilled promise in ${delay}ms`,
                animateInside: false,
            });
        },
        (delay) => {
            iziToast.error({
                iconUrl: '../img/close-octagon.png',
                messageColor: '#fff',
                position: 'topRight',
                animateInside: false,
                titleColor: '#fff',
                message: `❌ Rejected promise in ${delay}ms`,
            });
        }
    );

    this.reset();
});
