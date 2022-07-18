const cabinetName = document.querySelector('#cab-name');
const changeNameBtn = document.querySelector('#change-name');
const changeNameForm = document.querySelector('#form-change-name');

const cabinetLocation = document.querySelector('#cab-location');
const changeLocationBtn = document.querySelector('#change-location');
const changeLocationForm = document.querySelector('#form-change-location');

const cabinetMoney = document.querySelector('#cab-money');
const changeMoneyBtn = document.querySelector('#change-money');
const changeMoneyForm = document.querySelector('#form-change-money');

cabinetName.innerHTML = localStorage.getItem('USERNAME');
cabinetLocation.innerHTML = localStorage.getItem('USERLOCATION');
cabinetMoney.innerHTML = localStorage.getItem('USERMONEY');

function openUpdateNameForm(e) {
  e.preventDefault();
  changeNameBtn.classList.add('is-hidden');
  changeNameBtn.classList.add('make-absolute');
  changeNameForm.classList.remove('is-hidden');
  changeNameForm.classList.remove('make-absolute');
  cabinetName.innerHTML = '';
}

function updateName(e) {
  e.preventDefault();
  const inputValue = changeNameForm.children[0].value;
  localStorage.setItem('USERNAME', inputValue);
  cabinetName.innerHTML = inputValue;
  changeNameForm.classList.add('is-hidden');
  changeNameForm.classList.add('make-absolute');
  changeNameBtn.classList.remove('is-hidden');
  changeNameBtn.classList.remove('make-absolute');
  changeNameForm.children[0].value = '';
}

function openUpdateLocationForm(e) {
  e.preventDefault();
  changeLocationBtn.classList.add('is-hidden');
  changeLocationBtn.classList.add('make-absolute');
  changeLocationForm.classList.remove('is-hidden');
  changeLocationForm.classList.remove('make-absolute');
  cabinetLocation.innerHTML = '';
}

function updateLocation(e) {
  e.preventDefault();
  const inputValue = changeLocationForm.children[0].value;
  localStorage.setItem('USERLOCATION', inputValue);
  cabinetLocation.innerHTML = inputValue;
  changeLocationForm.classList.add('is-hidden');
  changeLocationForm.classList.add('make-absolute');
  changeLocationBtn.classList.remove('is-hidden');
  changeLocationBtn.classList.remove('make-absolute');
  changeLocationForm.children[0].value = '';
}

function openUpdateMoneyForm(e) {
  e.preventDefault();
  changeMoneyBtn.classList.add('is-hidden');
  changeMoneyBtn.classList.add('make-absolute');
  changeMoneyForm.classList.remove('is-hidden');
  changeMoneyForm.classList.remove('make-absolute');
  cabinetMoney.innerHTML = '';
}

function updateMoney(e) {
  e.preventDefault();
  const inputValue = changeMoneyForm.children[0].value;
  localStorage.setItem('USERLOCATION', inputValue);
  cabinetMoney.innerHTML = inputValue;
  changeMoneyForm.classList.add('is-hidden');
  changeMoneyForm.classList.add('make-absolute');
  changeMoneyBtn.classList.remove('is-hidden');
  changeMoneyBtn.classList.remove('make-absolute');
  changeMoneyForm.children[0].value = '';
}

if (
  localStorage.getItem('USERLOCATION') === '' ||
  localStorage.getItem('USERLOCATION') === null
) {
  cabinetLocation.classList.add('make-absolute');
  changeLocationBtn.innerHTML = 'Set current location';
}

if (
  localStorage.getItem('USERMONEY') === '' ||
  localStorage.getItem('USERMONEY') === null
) {
  cabinetMoney.classList.add('make-absolute');
  changeMoneyBtn.innerHTML = 'Set current money';
}

changeNameBtn.addEventListener('click', openUpdateNameForm);
changeNameForm.addEventListener('submit', updateName);

changeLocationBtn.addEventListener('click', openUpdateLocationForm);
changeLocationForm.addEventListener('submit', updateLocation);

changeMoneyBtn.addEventListener('click', openUpdateMoneyForm);
changeMoneyForm.addEventListener('submit', updateMoney);
