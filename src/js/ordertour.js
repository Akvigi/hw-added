import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import ukraine from '../images/ukraine.jpg';
import poland from '../images/poland-photo.jpg';
import croatia from '../images/croatia.jpg';
import montenegro from '../images/montenegro.jpg';
import france from '../images/france.jpg';
import usa from '../images/usa.jpg';
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

export const countries = [
  {
    id: 1,
    name: 'Ukraine',
    price: 100,
    src: ukraine,
    description:
      "Ukraine is a country in Eastern Europe. It is the second-largest European country after Russia, covering approximately 600,000 square kilometres (230,000 sq mi), and has a population of around 40 million people. It is bordered by Russia to the east and northeast; by Belarus to the north; by Poland, Slovakia, and Hungary to the west; and by Romania and Moldova to the southwest; with a coastline along the Black Sea and the Sea of Azov to the south and southeast, respectively. Kyiv is Ukraine's capital and largest city. The country's language is Ukrainian, and many people are also fluent in Russian.",
  },
  {
    id: 2,
    name: 'Poland',
    price: 200,
    src: poland,
    description:
      'Poland, officially the Republic of Poland, is a country in Central Europe. It is divided into 16 administrative provinces called voivodeships, covering an area of 312,696 km2 (120,733 sq mi). Poland has a population of over 38 million and is the fifth-most populous member state of the European Union. Warsaw is the nations capital and largest metropolis. Other major cities include Kraków, Łódź, Wrocław, Poznań, Gdańsk, and Szczecin.Polands territory extends from the Baltic Sea in the north to the Sudeten and Carpathian Mountains in the south. The country is bordered by Lithuania and Russia to the northeast, Belarus and Ukraine to the east, Slovakia and the Czech Republic to the south, and Germany to the west. Poland also shares maritime boundaries with Denmark and Sweden.',
  },
  {
    id: 3,
    name: 'Croatia',
    price: 300,
    src: croatia,
    description:
      'Croatia, officially the Republic of Croatia is a country at the crossroads of Central and Southeast Europe. It shares a coastline along the Adriatic Sea. It borders Slovenia to the northwest, Hungary to the northeast, Serbia to the east, Bosnia and Herzegovina and Montenegro to the southeast, and shares a maritime border with Italy to the west and southwest. Croatias capital and largest city, Zagreb, forms one of the countrys primary subdivisions, with twenty counties. The country spans an area of 56,594 square kilometres (21,851 square miles), hosting a population of nearly 3.9 million.',
  },
  {
    id: 4,
    name: 'Montenegro',
    price: 400,
    src: montenegro,
    description:
      'Montenegro is a country in Southeastern Europe. It is located on the Adriatic Sea and is a part of the Balkans, sharing borders with Serbia to the northeast, Bosnia and Herzegovina to the north and west, Kosovo to the east, Albania to the southeast, the Adriatic Sea and Croatia to the northwest, and a maritime boundary with Italy. Podgorica, the capital and largest city, covers 10.4% of Montenegros territory of 13,812 square kilometres (5,333 sq mi), and is home to roughly 30% of its total population of 621,000.',
  },
  {
    id: 5,
    name: 'France',
    price: 500,
    src: france,
    description:
      'France, officially the French Republic, is a transcontinental country spanning Western Europe and overseas regions and territories in the Americas and the Atlantic, Pacific and Indian Oceans. Its metropolitan area extends from the Rhine to the Atlantic Ocean and from the Mediterranean Sea to the English Channel and the North Sea; overseas territories include French Guiana in South America, Saint Pierre and Miquelon in the North Atlantic, the French West Indies, and many islands in Oceania and the Indian Ocean. Due to its several coastal territories, France has the largest exclusive economic zone in the world. France borders Belgium, Luxembourg, Germany, Switzerland, Monaco, Italy, Andorra, and Spain in continental Europe, as well as the Netherlands, Suriname, and Brazil in the Americas via its overseas territories in French Guiana and Saint Martin. Its eighteen integral regions (five of which are overseas) span a combined area of 643,801 km2 (248,573 sq mi) and over 67 million people (as of May 2021). France is a unitary semi-presidential republic with its capital in Paris, the countrys largest city and main cultural and commercial centre; other major urban areas include Marseille, Lyon, Toulouse, Lille, Bordeaux, and Nice.',
  },
  {
    id: 6,
    name: 'USA',
    price: 600,
    src: usa,
    description:
      'The United States of America (U.S.A. or USA), commonly known as the United States (U.S. or US) or America, is a transcontinental country primarily located in North America. It consists of 50 states, a federal district, five major unincorporated territories, 326 Indian reservations, and nine minor outlying islands. It is the third-largest country by both land and total area. The United States shares land borders with Canada to the north and with Mexico to the south as well as maritime borders with the Bahamas, Cuba, and Russia, among others. With more than 331 million people, it is the third most populous country in the world. The national capital is Washington, D.C., and the most populous city and financial center is New York City.',
  },
];

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
    localStorage.getItem('USERLOCATION') === '' &&
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
  },
});

countryList.addEventListener('click', pickCountry);
startOrderBtn.addEventListener('click', onStartOrder);
formOrder.addEventListener('submit', submitMoney);
