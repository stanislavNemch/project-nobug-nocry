// Описана робота модалки - відкриття закриття і все що з модалкою пов'язано
import axios from 'axios';
import { getFurnitureById } from './furniture-api.js';
import { openOrderModal } from './order.js';
import spriteUrl from '../img/sprite.svg';
import 'css-star-rating/css/star-rating.min.css';

const modalSelector = document.querySelector('.modal-window');
const modalContainer = modalSelector.querySelector('.container');
const productsList = document.querySelector('.products-list');

let dataId = 0;
let selectedColor = '';
let keydownHandler = null;
let modalClickHandler = null;
let colorChangeHandlers = [];

// Функція нормалізації рейтингу (така ж як в reviews)
function normalizeRating(value) {
  if (value >= 3.3 && value <= 3.7) return 3.5;
  if (value >= 3.8 && value <= 4.2) return 4;
  return Math.round(value * 2) / 2;
}

// Функція створення рейтингу зірочками (така ж як в reviews)
function createStarRating(rating) {
  const normalizedRating = normalizeRating(rating);
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(normalizedRating);

  let starsHtml = '';

  // Повні зірки
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<span class="star star-full">★</span>';
  }

  // Половинна зірка
  if (hasHalfStar) {
    starsHtml += '<span class="star star-half">★</span>';
  }

  // Порожні зірки
  for (let i = 0; i < emptyStars; i++) {
    starsHtml += '<span class="star star-empty">★</span>';
  }

  return `<div class="modal-rating-stars" data-rating="${normalizedRating}">${starsHtml}</div>`;
}

// Створення обробника клавіші Escape
const createKeydownHandler = () => event => {
  if (event.key === 'Escape') {
    closeModalWindow();
  }
};

// Створення обробника кліку на модалку
const createModalClickHandler = () => event => {
  const modalWindow = event.target.closest('.product-modalWindow');
  const clickOnCloseModalButton = event.target.closest('.modal-close-btn');

  if (!modalWindow || clickOnCloseModalButton) {
    closeModalWindow();
  }
};

// Додавання слухачів при відкритті модалки
const addModalEventListeners = () => {
  // Створюємо обробники якщо їх ще немає
  if (!keydownHandler) {
    keydownHandler = createKeydownHandler();
  }
  if (!modalClickHandler) {
    modalClickHandler = createModalClickHandler();
  }

  // Додаємо слухачі
  document.addEventListener('keydown', keydownHandler);
  modalSelector.addEventListener('click', modalClickHandler);
};

// Видалення слухачів при закритті модалки
const removeModalEventListeners = () => {
  if (keydownHandler) {
    document.removeEventListener('keydown', keydownHandler);
  }
  if (modalClickHandler) {
    modalSelector.removeEventListener('click', modalClickHandler);
  }

  // Видаляємо обробники зміни кольору
  colorChangeHandlers.forEach(({ input, handler }) => {
    input.removeEventListener('change', handler);
  });
  colorChangeHandlers = [];
};

function closeModalWindow() {
  modalSelector.classList.add('visuallyhidden');
  document.body.classList.remove('modal-open');
  removeModalEventListeners();
}

// Налаштування кнопки замовлення в модалці
function setupModalButton() {
  const modalButton = modalContainer.querySelector('.modalButton');
  if (modalButton) {
    modalButton.addEventListener('click', function () {
      // Приховати поточну модалку
      closeModalWindow();
      openOrderModal(dataId, selectedColor);
    });
  }
}

// Порожній/завантажувальний стан модалки
function renderLoadingModal() {
  return `
  <div class="product-modalWindow">
    <div class="modal-loading" style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
      <div class="spinner" aria-label="Loading"></div>
    </div>
    <button type="button" class="modal-close-btn" >
      <svg class="close-icon" width="14" height="14">
        <use href="${spriteUrl}#icon-close"/>
      </svg>
    </button>
  </div>`;
}

// Загальна функція для відкриття модального вікна
async function openProductModal(productId) {
  document.body.classList.add('modal-open');
  modalSelector.classList.remove('visuallyhidden');
  modalContainer.innerHTML = renderLoadingModal();
  addModalEventListeners();

  dataId = productId;

  // Отримати товар за ID
  const furniture = await getFurnitureById(dataId);

  modalContainer.innerHTML = renderModal(furniture);

  // Динамічна кількість кольорів
  const colorInputs = modalContainer.querySelectorAll(
    'input[name="furniture-color"]'
  );

  // Встановити колір за замовчуванням (перший колір)
  if (colorInputs.length > 0) {
    colorInputs[0].checked = true;
    selectedColor = colorInputs[0].value;
  }

  // Слухати зміни кольору та зберігати обробники для видалення
  colorInputs.forEach(input => {
    const handler = function () {
      selectedColor = this.value;
    };
    input.addEventListener('change', handler);
    // Зберігаємо для подальшого видалення
    colorChangeHandlers.push({ input, handler });
  });

  // Налаштувати кнопку модалки
  setupModalButton();

  setupImageSwitching();
}

// Додаємо можливість перемикати картинки: при кліку на маленьку вона стає основною, а основна — маленькою
function setupImageSwitching() {
  const mainImg = modalContainer.querySelector('.modal-image-0');
  const img1 = modalContainer.querySelector('.modal-image-1');
  const img2 = modalContainer.querySelector('.modal-image-2');

  if (!mainImg || !img1 || !img2) return;

  // Функція для обміну src і alt між двома елементами
  function swapImages(imgA, imgB) {
    imgA.style.opacity = '0.5';
    setTimeout(() => {
      const tempSrc = imgA.src;
      const tempAlt = imgA.alt;
      imgA.src = imgB.src;
      imgA.alt = imgB.alt;
      imgB.src = tempSrc;
      imgB.alt = tempAlt;
      imgA.style.opacity = '1';
    }, 150);
  }

  img1.addEventListener('click', () => swapImages(mainImg, img1));
  img2.addEventListener('click', () => swapImages(mainImg, img2));
}

// Обробник для популярних товарів через custom events
document.addEventListener('openProductModal', function (event) {
  const productId = event.detail.productId;
  openProductModal(productId);
});

// Обробник для звичайних товарів
if (productsList) {
  productsList.addEventListener('click', async function (event) {
    if (event.target.matches('img, button')) {
      const productItem = event.target.closest('.product-item');

      if (productItem) {
        const productId = productItem.getAttribute('data-id');
        await openProductModal(productId);
      }
    }
  });
}

// Обробник для популярних товарів - прямий клік
const popularProductsContainer = document.querySelector(
  '.popular-products-swiper'
);
if (popularProductsContainer) {
  popularProductsContainer.addEventListener('click', async function (event) {
    // Перевіряємо клік на зображення або кнопку
    if (event.target.matches('img.img-card, button.btn-go-modal')) {
      const productItem = event.target.closest('.popular-products-item');

      if (productItem) {
        const productId = productItem.getAttribute('data-id');
        await openProductModal(productId);
      }
    }
  });
}

// Динамічна генерація радио-кнопок по кількості кольорів
function renderModal(furniture) {
  const colors = Array.isArray(furniture.color) ? furniture.color : [];
  const colorRadios = colors
    .map(
      (color, idx) => `
      <div class="radio-wrapper">
        <input type="radio" id="color${
          idx + 1
        }" name="furniture-color" value="${color}" class="color-radio" />
        <label for="color${
          idx + 1
        }" class="color-circle" style="background-color: ${color}"></label>
      </div>
    `
    )
    .join('');

  return `
  <div class="product-modalWindow">
    <div class="modal-left">
      <img class="modal-image-0" src="${furniture.images[0]}" alt="${
    furniture.description
  }" />
      <div class="modal-bottom-row">
        ${
          furniture.images[1]
            ? `<img class="modal-image-1" src="${furniture.images[1]}" alt="${furniture.description}" />`
            : ''
        }
        ${
          furniture.images[2]
            ? `<img class="modal-image-2" src="${furniture.images[2]}" alt="${furniture.description}" />`
            : ''
        }
      </div>
    </div>
    <div class="modal-right">
      <h2 class="product-modal-title">${furniture.name}</h2>
      <p class="modal-description">${furniture.category?.name || ''}</p>
      <div class="description-container">
        <div class="modal-price-rating">
          <h3 class="modal-price">${furniture.price} грн</h3>
        </div>
        ${createStarRating(furniture.rate)}
        <div class="color-options">
          <p class="color-label">Колір</p>
          <div class="radio-group">
            ${colorRadios}
          </div>
        </div>
        <p class="furnitureDescription">${furniture.description}</p>
        <p class="furnitureSize">Розміри: ${furniture.sizes}</p>
        <button class="modalButton">Перейти до замовлення</button>
      </div>
    </div>
    <button type="button" class="modal-close-btn" >
        <svg class="close-icon" width="14" height="14">
          <use href="${spriteUrl}#icon-close"/>
        </svg>
      </button>
  </div>`;
}

// Експортуємо функцію для використання в інших модулях
export { openProductModal };
