import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(
    [...formData].map(element => [element[0], Number(element[1])])
  );

  event.currentTarget.reset();

  for (let i = 1; i <= formObject.amount; i += 1) {
    createPromise(i, formObject.delay).then(onSuccess).catch(onError);
    formObject.delay += formObject.step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.failure(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
}
