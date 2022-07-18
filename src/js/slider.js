import { countries } from './ordertour';
import { fetchImg, changeID } from './fetchIMG';
// import * as images from './images';

const sliderContainer = document.querySelector('#slider');
const sliderBtnContainer = document.querySelector('#slider-btn-container');
const sliderImgTitle = document.querySelector('#image-title');
const sliderImgContainer = document.querySelector('#image-container');
const countryDescripion = document.querySelector('#country-description');
const activeBtn = document.querySelector('.slider__btn-active');

// console.log(images);
let stringMarkupIMG;
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
  // createMrkp(0);
  // const
  // await createMrkp();
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

  btn.classList.add('slider__btn-active');
  // console.log(activeBtn);
  console.log(btn.classList);
  // createMrkp(btn.id);
  // sliderImgContainer.innerHTML = countries[btnId].src;
}
startSlider();
sliderBtnContainer.addEventListener('click', changeSlide);
// const markup = `<img class="slider__image" src="${countries[0].src}" alt="${countries[0].name}">`;
// sliderImgContainer.innerHTML = `<img class="slider__image" src="${countries[0].src}" alt="${countries[0].name}">`;
// console.log(markup);
