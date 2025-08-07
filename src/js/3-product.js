import { getFurnitures } from './furniture-api.js';

const listCategory = document.querySelector('.product-categories-list');

let NowPages = 1;

export function renderCategories(data) {
  const markup = data
    .map(
      el => `<li class="product-categories-item">
      ${el.name}
      </li>`
    )
    .join('');

  listCategory.innerHTML = markup;
}

export async function getAllCategories() {
  try {
    const data = await getCategories();
    renderCategories([{ name: 'Всі товари' }, ...data]);
    console.log(data);
  } catch (error) {
    console.log(error);
    return [];
  }
}

// async function renderCategories() {
//   try {
//     const data = await listCategory();
//     const murkUp = data.map(elem => {
//       return elem;
//     });
//     console.log(murkUp);
//   } catch (error) {
//     console.log(error);
//   }
// }

getAllCategories();

async function createProductsList(functions = getFurnitures(1, 8)) {
  const productsList = document.querySelector('.products-list');
  productsList.innerHTML = '';

  try {
    const data = await functions;
    const furnitures = data.furnitures || data;
    const totalItemspages = Math.ceil(data.totalItems / 8);
    if (furnitures && furnitures.length) {
      furnitures.forEach(furniture => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.setAttribute('data-id', furniture._id);
        productItem.innerHTML = `
          <img src="${furniture.images[0]}" alt="${
          furniture.name
        }" class="img-card" width="100%" height="256px" />
          <p class="text-card">${furniture.name}</p>
          <div class="colors">
            ${furniture.color
              .map(
                c =>
                  `<span class="color-one" style="background-color:${c};"></span>`
              )
              .join('')}
          </div>
          <p class="text-card">${furniture.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `;
        productsList.appendChild(productItem);
        createPagination(totalItemspages);
      });
    } else {
      productsList.innerHTML = '<p>Товари не знайдені.</p>';
    }
  } catch (error) {
    console.error('Помилка завантаження товарів:', error);
    productsList.innerHTML = '<p>Помилка завантаження товарів.</p>';
  }
}

function createPagination(totalItemspages) {
  const pagination = document.querySelector('.pagination');
  pagination.innerHTML = ''; // Очистка пагінації перед добавлением новых страниц

  if (totalItemspages > 4) {
    pagination.innerHTML = `
        <button class="btn-prev scroll">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </button>
        <button class="page-number focus">${NowPages}</button>
        <button class="page-number">${NowPages + 1}</button>
        <button class="page-number">${NowPages + 2}</button>
        <span class="dtp">...</span>
        <button class="page-number last">${totalItemspages}</button>
        <button class="btn-next scroll"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
            width="24px" class="icon">
            <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
          </svg></button>
      `;
  } else {
    console.log('totalItemspages', totalItemspages);
  }
}

addEventListener('DOMContentLoaded', () => {
  createProductsList();
});
