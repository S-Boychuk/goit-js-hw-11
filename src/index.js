// import './css/styles.css';
// import debounce from 'lodash.debounce';
// import fetchCountries from './fetchCountries';
// import { Notify } from 'notiflix';

// const DEBOUNCE_DELAY = 300;

// const elements = {
//   inputEl: document.querySelector('#search-box'),
//   countryListEl: document.querySelector('.country-list'),
//   countryInfoEl: document.querySelector('.country-info'),
// };

// elements.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// function onInput() {
//   const countryName = elements.inputEl.value.trim();

//   elements.countryListEl.innerHTML = '';
//   elements.countryInfoEl.innerHTML = '';

//   if (countryName.length != 0) {
//     fetchCountries(countryName)
//       .then(data => {
//         console.log(data);
//         if (data.length > 10) {
//           Notify.info(
//             `Too many matches found. Please enter a more specific name.`
//           );
//         } else if (data.length >= 2 && data.length <= 10) {
//           console.log('many countries');
//           let markUpHtmlData = data.reduce(
//             (accumulator, currentCountry) =>
//               createCountryMarkup(
//                 currentCountry.flags.png,
//                 currentCountry.name.official
//               ) + accumulator,
//             ''
//           );
//           updateMarkUp(markUpHtmlData);
//         } else {
//           console.log('one country');
//           let cardHtmlData = createCountryCard(
//             data[0].flags.png,
//             data[0].name.official,
//             data[0].capital[0],
//             data[0].population,
//             Object.values(data[0].languages)[0]
//           );
//           updateCard(cardHtmlData);
//         }
//       })
//       .catch(onError);
//   }
// }

// function createCountryMarkup(flag, name) {
//   return `<li><img src=${flag}  class="country-flag" width="30" height="30"/>
//     <p class="country-name">${name}</p></li>`;
// }

// function createCountryCard(flag, name, capital, population, languages) {
//   return `
//   <div class="wrap">
//     <img src=${flag} class="country-flag"  width="30" height="30"/>
//     <h2 class="country-name">${name}</h2>
//   </div>
//     <p class="country-capital">Capital: ${capital}</p>
//     <p class="country-population">Population: ${population}</p>
//     <p class="country-languages">Languages: ${languages}</p>
//   `;
// }

// function updateCard(cardData) {
//   elements.countryInfoEl.innerHTML = cardData;
// }

// function updateMarkUp(markUpData) {
//   elements.countryListEl.innerHTML = markUpData;
// }

// function onError() {
//   Notify.failure('Oops, there is no country with that name');
// }
