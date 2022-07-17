import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
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
const textToUser = document.querySelector('#text-with-current-money-input');
const inputMoney = formOrder.children[1];
const inputCurrentLocation = formOrder.children[3];
const inputTime = document.querySelector('#datetime-picker');
const formOrderConfirmation = document.querySelector(
  '#order-form-confirmation'
);

export const countries = [
  {
    id: 1,
    name: 'Ukraine',
    price: 100,
    src: './images/ukraine.jpg',
    description:
      "Ukraine is a country in Eastern Europe. It is the second-largest European country after Russia, covering approximately 600,000 square kilometres (230,000 sq mi), and has a population of around 40 million people. It is bordered by Russia to the east and northeast; by Belarus to the north; by Poland, Slovakia, and Hungary to the west; and by Romania and Moldova to the southwest; with a coastline along the Black Sea and the Sea of Azov to the south and southeast, respectively. Kyiv is Ukraine's capital and largest city. The country's language is Ukrainian, and many people are also fluent in Russian.",
  },
  {
    id: 2,
    name: 'Poland',
    price: 200,
    src: './images/poland.jpg',
  },
  {
    id: 3,
    name: 'Croatia',
    price: 300,
    src: './images/croatia.jpg',
  },
  {
    id: 4,
    name: 'Montenegro',
    price: 400,
    src: './images/montenegro.jpg',
  },
  {
    id: 5,
    name: 'France',
    price: 500,
    src: './images/france.jpg',
  },
  {
    id: 6,
    name: 'USA',
    price: 600,
    src: './images/usa.jpg',
  },
];

let userName;
let userPass;
let userLocation;
let userCredits;
let userCountry;
let maxPrice;
let markup;

function onStartOrder() {
  userName = localStorage.getItem('USERNAME');
  if (userName === '' || userName === undefined || userName === null) {
    return alert('Please login!');
  }
  startOrderBtn.classList.add('is-hidden');
  startOrderBtn.classList.add('make-absolute');
  formOrder.classList.remove('is-hidden');
  formOrder.classList.remove('make-absolute');
  textToUser.innerHTML = `${userName}, please enter your current money`;
}

function submitMoney(e) {
  e.preventDefault();
  userCredits = inputMoney.value;
  localStorage.setItem('USERMONEY', userCredits);
  const availableCountries = countries.filter(
    value => value.price <= userCredits
  );
  userLocation = inputCurrentLocation.value;
  if (
    localStorage.getItem('USERLOCATION') === '' ||
    localStorage.getItem('USERLOCATION') === undefined ||
    localStorage.getItem('USERLOCATION') === null
  ) {
    localStorage.setItem('USERLOCATION', userLocation);
  }
  markup = availableCountries
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
  console.log(markup);
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
  console.log(countryID);
  formOrderConfirmation.classList.remove('is-hidden');
  formOrderConfirmation.classList.remove('make-absolute');
  countryList.innerHTML = '';
  countryList.classList.add('make-absolute');
  formOrderConfirmation.children[0].innerHTML = countries[countryID - 1].name;
  formOrderConfirmation.children[1].innerHTML = countries[countryID - 1].price;
  // if (e.target.nodeName !== 'BUTTON') {
  //   return;
  // }
}

flatpickr(inputTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    let currentDate = new Date();
    if (currentDate > selectedDates[0]) {
      startButton.setAttribute('disabled', true);
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    startButton.removeAttribute('disabled');
    startButton.addEventListener('click', () => {});
  },
});

countryList.addEventListener('click', pickCountry);
startOrderBtn.addEventListener('click', onStartOrder);
formOrder.addEventListener('submit', submitMoney);
