//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import axios from 'axios';
import { getFurnitureById } from './furniture-api.js';

const modalSelector = document.querySelector('.modal');
const productsList = document.querySelector('.products-list');
let dataId = 0;
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

      if (furniture) {
        console.log('Информация о товаре:', furniture);
      } else {
        console.log('Товар не найден');
      }
      const renderProduct = renderModal(furniture);
      modalSelector.innerHTML = renderProduct;
    }
  }
});

function renderModal(furniture) {
  console.log(furniture.images);
  return `
  <div class="modalWindow">
      <div class="modal-left">
        <img class="modal-image-0" src="${furniture.images[0]}" alt="${furniture.description}" />
        <div class="modal-bottom-row">
          <img class="modal-image-1" src="${furniture.images[1]}" alt="${furniture.description}" />
          <img class="modal-image-2" src="${furniture.images[2]}" alt="${furniture.description}" />
        </div>
      </div>
      <div class="modal-right">
  <h2 class="modal-title">${furniture.name}</h2>
  <p class="modal-description" >${furniture.category.name}</p>
  <div class="description-container">
    <h3 class="modal-price">${furniture.price} грн</h3>
     <div class="stars"></div>
     <!-- checkbox .furnitureColors -->
      <p class="furnitureDescription">${furniture.description}</p>
      <p class="furnitureSize">${furniture.sizes}</p>
      <button class="modalButton">Перейти до замовлення</button>
  </div>
</div>
      <div></div>
    </div>
  `;
}

//next goes logic to close modal
modalSelector.addEventListener('click', function (event) {
  const modalWindow = event.target.closest('.modalWindow');
  if (!modalWindow) {
    console.log('closing modal');

    // Click was outside the modal-window
    modalSelector.classList.add('visuallyhidden');
    document.body.style.overflow = ''; //turn on scroll
  }
});

document.addEventListener('keydown', event => {
  if (
    event.key === 'Escape' &&
    modalSelector.classList.contains('visuallyhidden')
  ) {
    modalSelector.classList.add('visuallyhidden');
    document.body.style.overflow = ''; //turn on scroll
  }
});

// export function getDataId() {
//   return dataId;
// }

// data.modelId = selectedModelId;
// data.color = selectedColor;

// export { selectedModelId };
// export { selectedColor };
