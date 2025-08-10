// Описана робота модалки - відкриття закриття і все що з модалкою пов'язано
import axios from 'axios';
import { getFurnitureById } from './furniture-api.js';
import { openOrderModal } from './order.js';
import spriteUrl from '../img/sprite.svg';

// Імпортуємо css-star-rating
import 'css-star-rating/css/star-rating.min.css';

const modalSelector = document.querySelector('.modal-window');
const productsList = document.querySelector('.products-list');

let dataId = 0;
let selectedColor = '';

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

// Налаштування кнопки замовлення в модалці
function setupModalButton() {
  const modalButton = document.querySelector('.modalButton');
  if (modalButton) {
    modalButton.addEventListener('click', function () {
      // Приховати поточну модалку
      modalSelector.classList.add('visuallyhidden');
      document.body.style.overflow = ''; // відновити прокрутку

      openOrderModal(dataId, selectedColor);
    });
  }
}

// Загальна функція для відкриття модального вікна
async function openProductModal(productId) {
  document.body.style.overflow = 'hidden'; // заборонити прокрутку
  modalSelector.classList.remove('visuallyhidden'); // показати модалку

  dataId = productId;

  // Отримати товар за ID
  const furniture = await getFurnitureById(dataId);

  const renderProduct = renderModal(furniture);
  modalSelector.innerHTML = renderProduct;

  // Додати обробник вибору кольору після рендерингу модалки
  const colorInputs = document.querySelectorAll(
    'input[name="furniture-color"]'
  );

  // Встановити колір за замовчуванням (перший колір)
  if (colorInputs.length > 0) {
    colorInputs[0].checked = true;
    selectedColor = colorInputs[0].value;
  }

  // Слухати зміни кольору
  colorInputs.forEach(input => {
    input.addEventListener('change', function () {
      selectedColor = this.value;
    });
  });

  // Налаштувати кнопку модалки
  setupModalButton();
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
      const productItem = event.target.closest('.product-item'); // селектор для найближчої картки товару

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

function renderModal(furniture) {
  return `
  <div class="product-modalWindow">
    <div class="modal-left">
      <img class="modal-image-0" src="${furniture.images[0]}" alt="${
    furniture.description
  }" />
      <div class="modal-bottom-row">
        <img class="modal-image-1" src="${furniture.images[1]}" alt="${
    furniture.description
  }" />
        <img class="modal-image-2" src="${furniture.images[2]}" alt="${
    furniture.description
  }" />
      </div>
    </div>
    <div class="modal-right">
      <h2 class="product-modal-title">${furniture.name}</h2>
      <p class="modal-description">${furniture.category.name}</p>
      <div class="description-container">
        <div class="modal-price-rating">
          <h3 class="modal-price">${furniture.price} грн</h3>
          ${createStarRating(furniture.rate)}
        </div>
        <div class="color-options">
          <p class="color-label">Колір</p>
          <div class="radio-group">
            <div class="radio-wrapper">
              <input type="radio" id="color1" name="furniture-color" value="${
                furniture.color[0]
              }" class="color-radio" />
              <label for="color1" class="color-circle" style="background-color: ${
                furniture.color[0]
              }"></label>
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="color2" name="furniture-color" value="${
                furniture.color[1]
              }" class="color-radio" />
              <label for="color2" class="color-circle" style="background-color: ${
                furniture.color[1]
              }"></label>
            </div>
            <div class="radio-wrapper">
              <input type="radio" id="color3" name="furniture-color" value="${
                furniture.color[2]
              }" class="color-radio" />
              <label for="color3" class="color-circle" style="background-color: ${
                furniture.color[2]
              }"></label>
            </div>
          </div>
        </div>
        <p class="furnitureDescription">${furniture.description}</p>
        <p class="furnitureSize">${furniture.sizes}</p>
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

// Логіка закриття модалки
modalSelector.addEventListener('click', function (event) {
  const modalWindow = event.target.closest('.product-modalWindow');
  const clickOnCloseModalButton = event.target.closest('.modal-close-btn');

  if (!modalWindow) {
    // Клік був поза модальним вікном
    modalSelector.classList.add('visuallyhidden');
    document.body.style.overflow = ''; // увімкнути прокрутку
  }
  if (clickOnCloseModalButton) {
    modalSelector.classList.add('visuallyhidden');
    document.body.style.overflow = ''; // увімкнути прокрутку
  }
});

function closeModalWindow() {
  modalSelector.classList.add('visuallyhidden');
  document.body.style.overflow = ''; // увімкнути прокрутку
}

// Закриття модалки при натисканні Escape
document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    !modalSelector.classList.contains('visuallyhidden')
  ) {
    modalSelector.classList.add('visuallyhidden');
    document.body.style.overflow = ''; // увімкнути прокрутку
  }
});
