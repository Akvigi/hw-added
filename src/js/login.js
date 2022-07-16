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
  loginBtn.classList.remove('is-hidden');
  loginBtn.classList.remove('make-absolute');
  logoutBtn.classList.add('make-absolute');
  logoutBtn.classList.add('is-hidden');
  localStorage.removeItem('USERNAME');
  localStorage.removeItem('PASSWORD');
  alert(`Successfully log out, good luck!`);
}

function onSubmit(e) {
  e.preventDefault();
  if (username.value === ``) {
    return alert('Please enter username');
  }
  localStorage.setItem('USERNAME', username.value);
  localStorage.setItem('PASSWORD', password.value);
  username.value = '';
  password.value = '';
  modalLogin.classList.add('is-hidden');
  loginBtn.classList.add('is-hidden');
  logoutBtn.classList.remove('is-hidden');
  loginBtn.classList.add('make-absolute');
  logoutBtn.classList.remove('make-absolute');
  alert(`Successfully logged in, thanks!`);
}

formLogin.addEventListener('submit', onSubmit);
loginBtn.addEventListener('click', onLogin);
close.addEventListener('click', onClose);
logoutBtn.addEventListener('click', onLogout);

if (
  localStorage.getItem('USERNAME') !== '' ||
  localStorage.getItem('USERNAME') !== null ||
  localStorage.getItem('USERNAME') !== undefined
) {
  console.log(localStorage.getItem('USERNAME'));
  loginBtn.classList.add('is-hidden');
  logoutBtn.classList.remove('is-hidden');
}
