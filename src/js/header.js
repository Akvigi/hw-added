export const cabinetBtn = document.querySelector('#btn-personal');
const tourPageBtn = document.querySelector('#tour-order');
const orderSection = document.querySelector('#order-section');
const persCabSection = document.querySelector('#pers-cabinet-section');

const pageStatus = {
  cabinet: 0,
  tourOrder: 1,
};

function openPersonalCabinet() {
  localStorage.setItem('PAGE', 'CABINET');
  orderSection.classList.add('make-absolute');
  orderSection.classList.add('is-hidden');
  persCabSection.classList.remove('is-hidden');
  persCabSection.classList.remove('make-absolute');
}

function openTourOrder() {
  localStorage.setItem('PAGE', 'TOUR_ORDER');
  persCabSection.classList.add('make-absolute');
  persCabSection.classList.add('is-hidden');
  orderSection.classList.remove('is-hidden');
  orderSection.classList.remove('make-absolute');
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
