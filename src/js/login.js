const loginBtn = document.querySelector('#login-btn');
const logoutBtn = document.querySelector('#logout-btn');
const modalLogin = document.querySelector('.modal-login');
const close = document.querySelector('#modal-close');
const submitLoginBtn = document.querySelector('#submit-login');
const form = modalLogin.children[0];
const { username, password } = form;

function onLogin() {
  modalLogin.classList.remove('is-hidden');
}

function onClose() {
  modalLogin.classList.add('is-hidden');
}

function onLogout() {
  loginBtn.classList.remove('is-hidden');
  logoutBtn.classList.add('is-hidden');
  localStorage.removeItem('USERNAME');
  localStorage.removeItem('PASSWORD');
  alert(`Successfully log out, good luck!`);
}

function onSubmit(e) {
  e.preventDefault();
  console.log(username.value, password.value);
  localStorage.setItem('USERNAME', username.value);
  localStorage.setItem('PASSWORD', password.value);
  username.value = '';
  password.value = '';
  modalLogin.classList.add('is-hidden');
  loginBtn.classList.add('is-hidden');
  logoutBtn.classList.remove('is-hidden');
  // loginBtn.removeEventListener(onLogin);
  // loginBtn.addEventListener('click',
  alert(`Successfully logged in, thanks!`);
}

form.addEventListener('submit', onSubmit);
loginBtn.addEventListener('click', onLogin);
close.addEventListener('click', onClose);
logoutBtn.addEventListener('click', onLogout);

if (localStorage.getItem('USERNAME') !== '') {
  console.log(localStorage.getItem('USERNAME'));
  loginBtn.classList.add('is-hidden');
  logoutBtn.classList.remove('is-hidden');
}
