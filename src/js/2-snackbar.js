
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function createPromise(delay, value, isActive) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
        if (isActive) {
            resolve(value);
        } else {
            reject(value);
        }
        }, delay);
    });

    return promise;
}

iziToast.show({
    title: 'Hey',
    message: 'What would you like to add?'
});

//`✅ Fulfilled promise in ${delay}ms`;
//`❌ Rejected promise in ${delay}ms`; 