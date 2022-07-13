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

const form = document.querySelector('#form');
const container = document.querySelector('#country-list');

const countries = [
  {
    name: 'Ukraine',
    price: 100,
  },
  {
    name: 'Poland',
    price: 200,
  },
  {
    name: 'Croatia',
    price: 300,
  },
  {
    name: 'Montenegro',
    price: 400,
  },
  {
    name: 'France',
    price: 500,
  },
  {
    name: 'USA',
    price: 600,
  },
];

let userName;
let userPass;
let userCredits;
let userCountry;
let maxPrice;

function login() {
  const { inputUsername, inputPassword } = form.elements;
  console.log(inputUsername, inputPassword);
  // userName =
  // localStorage.setItem('USERNAME', userName);
}
