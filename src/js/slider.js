import { countries } from './ordertour';
import { fetchImg, changeID } from './fetchIMG';
// import * as images from './images';

const sliderContainer = document.querySelector('#slider');
const sliderBtnContainer = document.querySelector('#slider-btn-container');
const sliderImgTitle = document.querySelector('#image-title');
const sliderImgContainer = document.querySelector('#image-container');
const countryDescripion = document.querySelector('#country-description');
const sliderBtnDescription = document.querySelector('#description-btn');
const globalStyle = document.querySelector('style');

// async function createMrkp(id) {
//   const arrayNumber = id - 1;
//   changeID(id);
//   // await fetchImg().then(query => {
//   const URL = query.data.hits[0].pageURL;
//   stringMarkupIMG = `<img class="slider__image" src="${URL}" alt="${countries[arrayNumber].name}" loading="lazy">`;
//   // });
//   sliderImgContainer.innerHTML = stringMarkupIMG;
// }

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
  sliderImgTitle.innerHTML = countries[0].name;
  countryDescripion.innerHTML = countries[0].description;
  sliderImgContainer.innerHTML = `<img class="slider__image" src="${countries[0].src}" alt="${countries[0].name}">`;
}

function changeSlide(e) {
  e.preventDefault();
  const btn = e.target;
  const activeBtn = document.querySelector('.slider__btn-active');
  activeBtn.classList.remove('slider__btn-active');
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const arrayNumber = Number(btn.id) - 1;
  sliderImgTitle.innerHTML = countries[arrayNumber].name;
  countryDescripion.innerHTML = countries[arrayNumber].description;
  sliderImgContainer.innerHTML = `<img class="slider__image" src="${countries[arrayNumber].src}" alt="${countries[arrayNumber].name}">`;
  btn.classList.add('slider__btn-active');
}

function openDescription() {
  globalStyle.innerHTML =
    '.slider__overlay-description {transform: translateX(0%);}' +
    '.slider__btn-description {background-color: tomato';
  sliderBtnDescription.innerHTML = 'close description';
  sliderBtnDescription.removeEventListener('click', openDescription);
  sliderBtnDescription.addEventListener('click', closeDescription);
}

function closeDescription() {
  globalStyle.innerHTML = '';
  sliderBtnDescription.innerHTML = 'open description';
  sliderBtnDescription.addEventListener('click', openDescription);
}

startSlider();
sliderBtnContainer.addEventListener('click', changeSlide);
sliderBtnDescription.addEventListener('click', openDescription);
