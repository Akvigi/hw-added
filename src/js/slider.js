import { countries } from './ordertour';
import { fetchImg, changeID } from './fetchIMG';

const sliderContainer = document.querySelector('#slider');
const sliderBtnContainer = document.querySelector('#slider-btn-container');
const sliderImgTitle = document.querySelector('#image-title');
const sliderImgContainer = document.querySelector('#image-container');
const countryDescripion = document.querySelector('#country-description');
const arrayOfMarkupIMG = [];
let stringMarkupIMG;
// async function createMrkp() {
//   countries.map(async country => {
//     changeID(country.id);
//     await fetchImg().then(query => {
//       const URL = query.data.hits[0].pageURL;
//       // console.log(URL);
//       if (country.id === 1) {
//         arrayOfMarkupIMG.push(
//           `<img class="slider__image" src="${URL}" alt="${country.name}" loading="lazy">`
//         );
//       } else
//         arrayOfMarkupIMG.push(
//           `<img class="slider__image is-hidden make-absolute" src="${URL}" alt="${country.name}" loading="lazy">`
//         );
//       console.log(arrayOfMarkupIMG);
//       stringMarkupIMG = arrayOfMarkupIMG.join('');
//       // return ;
//     });
//     sliderImgContainer.innerHTML = stringMarkupIMG;
//   });
// }
async function startSlider() {
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
  // const
  // await createMrkp();
}
// console.log(fetchImg());
startSlider();
// const markup = `<img class="slider__image" src="${countries[0].src}" alt="${countries[0].name}">`;
// sliderImgContainer.innerHTML = `<img class="slider__image" src="${countries[0].src}" alt="${countries[0].name}">`;
// console.log(markup);
