import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { countries } from './country-array';
// Замовлення турів:
// Пишемо реєстрацію користувача за допомогою prompt.  Окремо логін та пароль.
// Валідацію не потрібно робити.
// Аналогічно пишемо логінізацію: запитуємо логін та пароль, порівнюємо їх з даними,
// які були введені при авторизації.Якщо все вірно - виводимо в консоль, що логін успішний.
// Якщо ні - знову запитуємо логін та пароль.
// Запитуємо максимальну суму, яку готовий витратити користувач на тур.
// Виводимо список усіх країн в alert, які доступні по сумі для користувача.
// Вказуємо країну через prompt  і купляємо тур.
// Виводимо повідомлення, що тур оплачений і залишок на рахунку користувача.

// const form = document.querySelector('#form');
const countryList = document.querySelector('#country-list');
const startOrderBtn = document.querySelector('#start-btn');
const formOrder = document.querySelector('#form-order');
const textToUserMoney = document.querySelector(
  '#text-with-current-money-input'
);
const textToUserLocation = document.querySelector('#text-location-label');
// text-location-label
const inputMoney = formOrder.children[1];
const inputCurrentLocation = formOrder.children[3];
const inputTime = document.querySelector('#datetime-picker');
const formOrderConfirmation = document.querySelector(
  '#order-form-confirmation'
);

let userName;
let userLocation;
let userCredits;
let markup;
let availableCountries;

function onStartOrder() {
  userName = localStorage.getItem('USERNAME');
  if (userName === '' || userName === undefined || userName === null) {
    return alert('Please login!');
  }
  startOrderBtn.classList.add('is-hidden');
  startOrderBtn.classList.add('make-absolute');
  formOrder.classList.remove('is-hidden');
  formOrder.classList.remove('make-absolute');
  if (
    localStorage.getItem('USERMONEY') !== '' &&
    localStorage.getItem('USERMONEY') !== null
  ) {
    textToUserMoney.innerHTML = `${userName}, please enter your current money, if you want to update information`;
  } else {
    textToUserMoney.innerHTML = `${userName}, please enter your current money`;
  }
  if (
    localStorage.getItem('USERLOCATION') !== '' &&
    localStorage.getItem('USERLOCATION') !== null
  ) {
    textToUserLocation.innerHTML = `And you can enter your current location, if you want to update information`;
  }
}

function filterByMoney(input) {
  if (
    localStorage.getItem('USERMONEY') !== '' &&
    localStorage.getItem('USERMONEY') !== null &&
    input === ''
  ) {
    console.log(localStorage.getItem('USERMONEY'));
    const storageMoney = localStorage.getItem('USERMONEY');
    availableCountries = countries.filter(value => value.price <= storageMoney);
  } else {
    userCredits = input;
    localStorage.setItem('USERMONEY', userCredits);
    availableCountries = countries.filter(value => value.price <= userCredits);
  }
}

function manageUserLocation(input) {
  userLocation = input;
  if (
    localStorage.getItem('USERLOCATION') === '' ||
    localStorage.getItem('USERLOCATION') === null
  ) {
    localStorage.setItem('USERLOCATION', userLocation);
  }
}

function createCountryCardsMarkup(array) {
  markup = array
    .map(country => {
      if (country.name === localStorage.getItem('USERLOCATION')) {
        return '';
      }
      return `<li class = "country-list__item">
                <h2>${country.name}</h2>
                <p>${country.price}</p>
                <button class = "country-list__btn" id = "choose-country-btn" data-id = "${country.id}">Choose</button>
              </li>`;
    })
    .join('');
}

function submitMoney(e) {
  e.preventDefault();
  if (inputMoney.value === '') {
    return alert('Please enter a valid amount');
  }
  filterByMoney(inputMoney.value);
  manageUserLocation(inputCurrentLocation.value);
  createCountryCardsMarkup(availableCountries);
  formOrder.classList.add('is-hidden');
  formOrder.classList.add('make-absolute');
  countryList.innerHTML = markup;
}

function pickCountry(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  console.log(e.target.nodeName);
  const { target: buttonCountry } = e;
  const countryID = buttonCountry.dataset.id;
  formOrderConfirmation.classList.remove('is-hidden');
  formOrderConfirmation.classList.remove('make-absolute');
  countryList.innerHTML = '';
  countryList.classList.add('make-absolute');
  formOrderConfirmation.children[0].innerHTML = countries[countryID - 1].name;
  formOrderConfirmation.children[1].innerHTML = countries[countryID - 1].price;
}

flatpickr(inputTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let currentDate = new Date();
  },
});

countryList.addEventListener('click', pickCountry);
startOrderBtn.addEventListener('click', onStartOrder);
formOrder.addEventListener('submit', submitMoney);
