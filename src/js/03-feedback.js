import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('input[name="email"]');
const textareaEl = document.querySelector('textarea[name="message"]');

document.addEventListener('DOMContentLoaded', fillFormFromStorage);
formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput(event) {
  try {
    addToLocalStorageObject(STORAGE_KEY, event.target.name, event.target.value);
  } catch ({ name, message }) {
    console.error(name);
    console.error(message);
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch ({ name, message }) {
    console.error(name);
    console.error(message);
  }

    const formData = new FormData(event.target);
    console.log(Object.fromEntries(formData));

  event.currentTarget.reset();
}

function fillFormFromStorage() {
  let savedData, parseData;

  try {
    savedData = localStorage.getItem(STORAGE_KEY);
    parseData = JSON.parse(savedData);

    if (parseData) {
      if (parseData.hasOwnProperty('email')) {
        inputEl.value = parseData.email;
      }
      if (parseData.hasOwnProperty('message')) {
        textareaEl.value = parseData.message;
      }
    }
  } catch ({ name, message }) {
    console.error(name);
    console.error(message);
  }
}

function addToLocalStorageObject(name, key, value) {
  // Get the existing data
  let existing = localStorage.getItem(name);

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? JSON.parse(existing) : {};

  // Add new data to localStorage Array
  existing[key] = value;

  // Save back to localStorage
  localStorage.setItem(name, JSON.stringify(existing));
}
