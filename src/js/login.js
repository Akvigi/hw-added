import { cabinetBtn } from './header';
import { replaceBlock } from './common';
const loginBtn = document.querySelector('#login-btn');
const logoutBtn = document.querySelector('#logout-btn');
const modalLogin = document.querySelector('.modal-login');
const close = document.querySelector('#modal-close');
const submitLoginBtn = document.querySelector('#submit-login');
const formLogin = modalLogin.children[0];
const { username, password } = formLogin;

function onLogin() {
  modalLogin.classList.remove('is-hidden');
}

function onClose() {
  modalLogin.classList.add('is-hidden');
}

function onLogout() {
  replaceBlock(logoutBtn, loginBtn);
  cabinetBtn.classList.add('is-hidden');
  cabinetBtn.classList.add('make-absolute');
  localStorage.removeItem('USERNAME');
  localStorage.removeItem('PASSWORD');
  localStorage.removeItem('USERMONEY');
  localStorage.removeItem('USERLOCATION');
  alert(`Successfully log out, good luck!`);
}

function onSubmitLogin(e) {
  e.preventDefault();
  if (username.value === ``) {
    return alert('Please enter username');
  }
  localStorage.setItem('USERNAME', username.value);
  localStorage.setItem('PASSWORD', password.value);
  username.value = '';
  password.value = '';
  replaceBlock(loginBtn, logoutBtn);
  modalLogin.classList.add('is-hidden');
  cabinetBtn.classList.remove('make-absolute');
  cabinetBtn.classList.remove('is-hidden');
  alert(`Successfully logged in, thanks!`);
}

formLogin.addEventListener('submit', onSubmitLogin);
loginBtn.addEventListener('click', onLogin);
close.addEventListener('click', onClose);
logoutBtn.addEventListener('click', onLogout);

if (
  localStorage.getItem('USERNAME') !== '' &&
  localStorage.getItem('USERNAME') !== null
) {
  replaceBlock(loginBtn, logoutBtn);
}
