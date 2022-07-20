import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { countries } from './country-array';
import { changeSliderMarkup, changeActiveButton } from './slider';
import { replaceBlock, visibilityChange } from './common';

// Виводимо повідомлення, що тур оплачений і залишок на рахунку користувача.

const countryList = document.querySelector('#country-list');
const startOrderBtn = document.querySelector('#start-btn');

const formOrder = document.querySelector('#form-order');
const textToUserMoney = document.querySelector(
  '#text-with-current-money-input'
);
const textToUserLocation = document.querySelector('#text-location-label');
const inputMoney = formOrder.children[1];
const inputCurrentLocation = formOrder.children[3];

const inputTime = document.querySelector('#datetime-picker');
const formOrderConfirmation = document.querySelector(
  '#order-form-confirmation'
);
const confirmationCountryName = formOrderConfirmation.children[0];
const confirmationCountryPrice = formOrderConfirmation.children[1];
const confirmationCountryID = formOrderConfirmation.children[2];

const finalContainer = document.querySelector('#final-container');
const finalTitle = document.querySelector('#final-title');
const finalText = document.querySelector('#final-text');

let userName;
let userLocation;
let userCredits;
let markup;
let availableCountries;
let pickedTime;
function onStartOrder() {
  userName = localStorage.getItem('USERNAME');
  if (userName === '' || userName === null) {
    return alert('Please login!');
  }
  replaceBlock(startOrderBtn, formOrder);
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
    const storageMoney = localStorage.getItem('USERMONEY');
    availableCountries = countries.filter(value => value.price <= storageMoney);
  } else {
    userCredits = input;
    localStorage.setItem('USERMONEY', userCredits);
    availableCountries = countries.filter(value => value.price <= userCredits);
  }
  if (input < 100 && localStorage.getItem('USERMONEY') < 100) {
    visibilityChange('show', startOrderBtn);
    return alert('Not enough money to buy tour!');
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
  if (
    (localStorage.getItem('USERMONEY') === '' ||
      localStorage.getItem('USERMONEY') === null) &&
    inputMoney.value === ''
  ) {
    return alert('Please enter a valid amount');
  }
  filterByMoney(inputMoney.value);
  manageUserLocation(inputCurrentLocation.value);
  createCountryCardsMarkup(availableCountries);
  visibilityChange('hide', formOrder);
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
  visibilityChange('show', formOrderConfirmation);
  countryList.innerHTML = '';
  countryList.classList.add('make-absolute');
  confirmationCountryName.innerHTML = countries[countryID - 1].name;
  confirmationCountryPrice.innerHTML = countries[countryID - 1].price;
  confirmationCountryID.innerHTML = countries[countryID - 1].id;
  changeSliderMarkup(countryID - 1);
  changeActiveButton(countryID - 1);
}

flatpickr(inputTime, {
  enableTime: false,
  time_24hr: true,
  defaultDate: new Date(),
  dateFormat: 'Y.m.d',
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] < currentDate) {
      return alert('Please pick a valid date');
    }
    let changedDate = selectedDates[0].toString().split(' ');
    let fixDate = changedDate.slice(0, 4).join(' ');
    pickedTime = fixDate;
  },
});

function confirmationFormSubmit(e) {
  e.preventDefault();
  const countryObject = {
    name: confirmationCountryName.textContent,
    price: confirmationCountryPrice.textContent,
    id: confirmationCountryID.textContent,
    date: pickedTime,
  };
  if (pickedTime === undefined) {
    return alert('Please select date');
  }
  localStorage.setItem('TOUR', JSON.stringify(countryObject));
  replaceBlock(formOrderConfirmation, finalContainer);
  userCredits =
    Number(localStorage.getItem('USERMONEY')) - Number(countryObject.price);
  localStorage.setItem('USERMONEY', userCredits);
  finalTitle.innerHTML = `${userName}, your tour to ${countryObject.name} cost ${countryObject.price}. It starting on ${countryObject.date}.`;
  finalText.innerHTML = `You can check your ordered tours in personal cabinet. Your balance - ${userCredits}.`;
}

countryList.addEventListener('click', pickCountry);
startOrderBtn.addEventListener('click', onStartOrder);
formOrder.addEventListener('submit', submitMoney);
formOrderConfirmation.addEventListener('submit', confirmationFormSubmit);
