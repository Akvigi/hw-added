import { changeProfileInfo } from './personalcabinet';
import { replaceBlock } from './common';
export const cabinetBtn = document.querySelector('#btn-personal');
const tourPageBtn = document.querySelector('#tour-order');
const orderSection = document.querySelector('#order-section');
const persCabSection = document.querySelector('#pers-cabinet-section');

function openPersonalCabinet() {
  localStorage.setItem('PAGE', 'CABINET');
  replaceBlock(orderSection, persCabSection);
  changeProfileInfo();
}

function openTourOrder() {
  localStorage.setItem('PAGE', 'TOUR_ORDER');
  replaceBlock(persCabSection, orderSection);
}

if (
  localStorage.getItem('USERNAME') !== '' &&
  localStorage.getItem('USERNAME') !== null
) {
  cabinetBtn.classList.remove('is-hidden');
  cabinetBtn.classList.remove('make-absolute');
}

if (localStorage.getItem('PAGE') === 'TOUR_ORDER') {
  openTourOrder();
}

if (
  localStorage.getItem('PAGE') === 'CABINET' &&
  localStorage.getItem('USERNAME') !== ''
) {
  openPersonalCabinet();
}

tourPageBtn.addEventListener('click', openTourOrder);
cabinetBtn.addEventListener('click', openPersonalCabinet);
