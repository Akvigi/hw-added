import { replaceBlock, ifLocalStorageIsNull } from './common';
import { countries } from './country-array';

const cabinetName = document.querySelector('#cab-name');
const changeNameBtn = document.querySelector('#change-name');
const changeNameForm = document.querySelector('#form-change-name');

const cabinetLocation = document.querySelector('#cab-location');
const changeLocationBtn = document.querySelector('#change-location');
const changeLocationForm = document.querySelector('#form-change-location');

const cabinetMoney = document.querySelector('#cab-money');
const changeMoneyBtn = document.querySelector('#change-money');
const changeMoneyForm = document.querySelector('#form-change-money');

const orderedList = document.querySelector('#ordered-tours-list');

function openUpdateNameForm(e) {
  e.preventDefault();
  replaceBlock(changeNameBtn, changeNameForm);
  cabinetName.innerHTML = '';
}

function updateName(e) {
  e.preventDefault();
  const inputValue = changeNameForm.children[0].value;
  if (inputValue === '') {
    return alert('Please input valid name');
  }
  localStorage.setItem('USERNAME', inputValue);
  cabinetName.innerHTML = inputValue;
  replaceBlock(changeNameForm, changeNameBtn);
  changeNameForm.children[0].value = '';
}

function openUpdateLocationForm(e) {
  e.preventDefault();
  replaceBlock(changeLocationBtn, changeLocationForm);
  cabinetLocation.innerHTML = '';
}

function updateLocation(e) {
  e.preventDefault();
  const inputValue = changeLocationForm.children[0].value;
  localStorage.setItem('USERLOCATION', inputValue);
  cabinetLocation.innerHTML = inputValue;
  if (cabinetLocation.classList.contains('make-absolute')) {
    cabinetLocation.classList.remove('make-absolute');
    changeLocationBtn.innerHTML = 'Change location';
  }
  replaceBlock(changeLocationForm, changeLocationBtn);
  if (inputValue === '') {
    cabinetLocation.classList.add('make-absolute');
    changeLocationBtn.innerHTML = `Set current country`;
  }
  changeLocationForm.children[0].value = '';
}

function openUpdateMoneyForm(e) {
  e.preventDefault();
  replaceBlock(changeMoneyBtn, changeMoneyForm);
  cabinetMoney.innerHTML = '';
}

function updateMoney(e) {
  e.preventDefault();
  const inputValue = changeMoneyForm.children[0].value;
  if (inputValue < 0) {
    return alert('Please enter a valid amount');
  }
  if (inputValue === '') {
    cabinetMoney.innerHTML = '0';
    localStorage.setItem('USERMONEY', 0);
  } else {
    cabinetMoney.innerHTML = inputValue;
    localStorage.setItem('USERMONEY', inputValue);
  }
  if (cabinetMoney.classList.contains('make-absolute')) {
    cabinetMoney.classList.remove('make-absolute');
    changeMoneyBtn.innerHTML = 'Change money';
  }
  replaceBlock(changeMoneyForm, changeMoneyBtn);
  changeMoneyForm.children[0].value = '';
}

ifLocalStorageIsNull(
  'USERLOCATION',
  cabinetLocation,
  changeLocationBtn,
  'location'
);
ifLocalStorageIsNull('USERMONEY', cabinetMoney, changeMoneyBtn, 'money');

if (
  localStorage.getItem('TOUR') !== null &&
  localStorage.getItem('TOUR') !== ''
) {
  const storageInfo = localStorage.getItem('TOUR');
  const tourObject = JSON.parse(storageInfo);
  const { name, price, id, date } = tourObject;

  orderedList.innerHTML = `<li class="ordered__tour">
      <img src = ${countries[id].src} alt = '${countries[id].name}' width = 100%>
      <p class = 'ordered__text' >Your ordered tour to ${name} planned on ${date}. Tour price = ${price}</p>
    </li>`;
}

changeNameBtn.addEventListener('click', openUpdateNameForm);
changeNameForm.addEventListener('submit', updateName);

changeLocationBtn.addEventListener('click', openUpdateLocationForm);
changeLocationForm.addEventListener('submit', updateLocation);

changeMoneyBtn.addEventListener('click', openUpdateMoneyForm);
changeMoneyForm.addEventListener('submit', updateMoney);

export function changeProfileInfo() {
  cabinetName.innerHTML = localStorage.getItem('USERNAME');
  cabinetLocation.innerHTML = localStorage.getItem('USERLOCATION');
  cabinetMoney.innerHTML = localStorage.getItem('USERMONEY');
}
