//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import axios from 'axios';
import { getFurnitureById } from './furniture-api.js';
import { openOrderModal } from './order.js';

const modalSelector = document.querySelector('.modal-window');
const productsList = document.querySelector('.products-list');
let dataId = 0;
let selectedColor = '';

// Add this function
function setupModalButton() {
  const modalButton = document.querySelector('.modalButton');
  if (modalButton) {
    modalButton.addEventListener('click', function () {
      console.log('Order button clicked');
      console.log('Selected color:', selectedColor);
      console.log('Product ID:', dataId);

      // Hide current modal
      modalSelector.classList.add('visuallyhidden');
      document.body.style.overflow = ''; // restore scrolling

      openOrderModal(dataId, selectedColor);
      console.log('order window call');
    });
  }
}

//Getting furenitureId in this function:
productsList.addEventListener('click', async function (event) {
  document.body.style.overflow = 'hidden'; // stop scrolling
  if (event.target.matches('img, button')) {
    modalSelector.classList.remove('visuallyhidden'); //show modal
    document.body.style.overflow = 'hidden'; // stop scrolling

    const productItem = event.target.closest('.product-item'); //selector for the closest product card (the click card)

    if (productItem) {
      dataId = productItem.getAttribute('data-id');

      console.log('data-id:', dataId);
      // Получить товар с ID = 123
      const furniture = await getFurnitureById(dataId);

      // if (furniture) {
      //   console.log('Информация о товаре:', furniture);
      // } else {
      //   console.log('Товар не найден');
      // }
      const renderProduct = renderModal(furniture);
      modalSelector.innerHTML = renderProduct;

      // Add color selection handler after rendering modal
      const colorInputs = document.querySelectorAll(
        'input[name="furniture-color"]'
      );

      // Set default color (first color)
      if (colorInputs.length > 0) {
        colorInputs[0].checked = true;
        selectedColor = colorInputs[0].value;
        console.log('Default color:', selectedColor);
      }

      // Listen for color changes
      colorInputs.forEach(input => {
        input.addEventListener('change', function () {
          selectedColor = this.value;
          console.log('Selected color:', selectedColor);
        });
      });

      // Set up modal button
      setupModalButton();
    }
  }
});

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
        <h3 class="modal-price">${furniture.price} грн</h3>
        <div class="stars">
          <div class="rating" data-rate="${furniture.rate}">
            <div class="empty-stars">★★★★★</div>
            <div class="filled-stars" style="width: ${
              (furniture.rate / 5) * 100
            }%">★★★★★</div>
          </div>
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
  </div>`;
}

//next goes logic to close modal
modalSelector.addEventListener('click', function (event) {
  const modalWindow = event.target.closest('.product-modalWindow');
  if (!modalWindow) {
    console.log('closing modal');
    console.log('selected color after closing modal', selectedColor);

    // Click was outside the modal-window
    modalSelector.classList.add('visuallyhidden');
    document.body.style.overflow = ''; //turn on scroll
  }
});

function closeModalWindow() {
  modalSelector.classList.add('visuallyhidden');
  document.body.style.overflow = ''; //turn on scroll
}

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    modalSelector.classList.contains('visuallyhidden')
  ) {
    modalSelector.classList.add('visuallyhidden');
    document.body.style.overflow = ''; //turn on scroll
  }
});
