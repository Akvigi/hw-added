import { countries } from './country-array';

const sliderContainer = document.querySelector('#slider');
const sliderBtnContainer = document.querySelector('#slider-btn-container');
const sliderImgTitle = document.querySelector('#image-title');
const sliderImgContainer = document.querySelector('#image-container');
const countryDescripion = document.querySelector('#country-description');
const countryDescripionPrice = document.querySelector('#overlay-price');
const sliderBtnDescription = document.querySelector('#description-btn');
const globalStyle = document.querySelector('style');

function startSlider() {
  const markupForSliderBtns = countries
    .map(element => {
      if (element.id === 1) {
        return `<button class="slider__btn slider__btn-active" id="${element.id}"></button>`;
      }
      if (element.id > 20) return;
      return `<button class="slider__btn" id="${element.id}"></button>`;
    })
    .join('');
  sliderBtnContainer.innerHTML = markupForSliderBtns;
  changeSliderMarkup(0);
}

function changeSlide(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const btn = e.target;
  const activeBtn = document.querySelector('.slider__btn-active');
  activeBtn.classList.remove('slider__btn-active');
  btn.classList.add('slider__btn-active');
  const arrayNumber = Number(btn.id) - 1;
  changeSliderMarkup(arrayNumber);
}

function openDescription() {
  globalStyle.innerHTML =
    '.slider__overlay-description {transform: translateX(0%);}' +
    '.slider__btn-description {background-color: tomato';
  sliderBtnDescription.innerHTML = 'Close description';
  sliderBtnDescription.removeEventListener('click', openDescription);
  sliderBtnDescription.addEventListener('click', closeDescription);
}

function closeDescription() {
  globalStyle.innerHTML =
    '.slider__overlay-description {}' + '.slider__btn-description {}';
  sliderBtnDescription.innerHTML = 'Open description';
  sliderBtnDescription.removeEventListener('click', closeDescription);
  sliderBtnDescription.addEventListener('click', openDescription);
}

startSlider();
sliderBtnContainer.addEventListener('click', changeSlide);
sliderBtnDescription.addEventListener('click', openDescription);

export function changeSliderMarkup(arrayID) {
  sliderImgTitle.innerHTML = countries[arrayID].name;
  countryDescripion.innerHTML = countries[arrayID].description;
  countryDescripionPrice.innerHTML = countries[arrayID].price;
  sliderImgContainer.innerHTML = `<img class="slider__image" src="${countries[arrayID].src}" alt="${countries[arrayID].name}">`;
}

export function changeActiveButton(arrayID) {
  const activeBtn = document.querySelector('.slider__btn-active');
  activeBtn.classList.remove('slider__btn-active');
  sliderBtnContainer.children[arrayID].classList.add('slider__btn-active');
}
