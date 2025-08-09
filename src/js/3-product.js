import { getCategories, getFurnitures } from './furniture-api.js';

const listCategory = document.querySelector('.product-categories-list');

const paginationContainer = document.querySelector('.pagination');

const ALL_CATEGORY_TEXT = 'Всі товари';

let NowPages = 1;
let totalItemspages = 1; // [1] Глобально сохраняем общее число страниц
const BtnMoreItems = document.querySelector('.btn-loadMore');

export function activeFirstCategory() {
  const firstCategory = document.querySelector('.product-categories-content');
  if (firstCategory) {
    firstCategory.classList.add('active-category');
  }
}

export function activeCategory(event) {
  const activeItem = event.target.closest('.product-categories-content');

  activeItem.classList.add('active-category');
}

export function removeActiveCategory() {
  const activeCategory = document.querySelector('.active-category');
  activeCategory.classList.remove('active-category');
}

export function renderCategories(data) {
  const markup = data
    .map(
      (el, index) => `<li class="product-categories-item" data-id="${el._id}">
  <img
    class="product-categories-img"
    srcset="
                  ./public/category-imgs/category-img-${index + 1}.webp    1x,
                  ./public/category-imgs/category-img-${index + 1}@2x.webp 2x
                "
    src="./public/category-imgs/category-img-${index + 1}.webp"
  />
  <div class="product-categories-content">
    <p class="product-categories-descr">${el.name}</p>
  </div>
</li>`
    )
    .join('');

  listCategory.innerHTML = markup;
}

export async function getAllCategories() {
  try {
    const data = await getCategories();
    renderCategories([
      { name: ALL_CATEGORY_TEXT, _id: '78fa12bc34de56f7890a1b35' },
      ...data,
    ]);
    activeFirstCategory();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function getOneCategory(e) {
  const categoryItem = e.target.closest('.product-categories-item');
  if (!categoryItem) return;
  const categoryName = categoryItem.textContent.trim();
  const categoryId = categoryItem.dataset.id;

  NowPages = 1;

  removeActiveCategory();
  activeCategory(e);

  if (categoryName === ALL_CATEGORY_TEXT) {
    createProductsList();
  }
  createProductsList(getFurnitures(1, 8, categoryId));
}

listCategory.addEventListener('click', getOneCategory);


async function createProductsList(functions = getFurnitures(NowPages, 8)) {
  showLoader() // [5] Скрываем лоадер перед загрузкой товаров
  const productsList = document.querySelector('.products-list');
  const productsContainer = document.querySelector('.pagination');
  productsContainer.innerHTML = ''; // Очищаем контейнер пагинации
  const isMobile = window.matchMedia('(max-width: 374px)').matches;
  console.debug('createProductsList: isMobile=', isMobile, 'innerWidth=', window.innerWidth);

  if (!isMobile) {
    // Очищаем список и пагинацию перед загрузкой (только для ПК/планшета)
    productsList.innerHTML = '';
    if (productsContainer) productsContainer.innerHTML = '';
  }
  try {
    const data = await functions;
    hideLoader() // [5] Скрываем лоадер перед загрузкой товаров
    const furnitures = data.furnitures || data;
    totalItemspages = Math.ceil(data.totalItems / 8); // [2] Рассчитываем всего страниц

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

      createPagination(NowPages); // [3] Обновляем пагинацию
      updatePaginationButtons(); // [4] Включаем/отключаем кнопки вперёд/назад
    } else {
      console.warn('Товари не знайдені.');
    }
  } catch (error) {
    console.error('Помилка завантаження товарів:', error);
    productsList.innerHTML = '<p>Помилка завантаження товарів.</p>';
  }
}

function createPagination(NowPages) {
  paginationContainer.innerHTML = ''; // Очищаем

  // Кнопка "Назад"
  paginationContainer.innerHTML += `
    <button class="btn-prev scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>
  `;

  // Текущая + 2 страницы (например: 8 9 10)
  for (let i = NowPages; i <= Math.min(NowPages + 2, totalItemspages); i++) {
    paginationContainer.innerHTML += `
      <button class="page-number ${i === NowPages ? 'focus' : ''}">${i}</button>
    `;
  }

  // Если осталось больше страниц — многоточие и последняя
  if (NowPages + 2 < totalItemspages) {
    paginationContainer.innerHTML += `<span class="dtp">...</span>`;
    paginationContainer.innerHTML += `<button class="page-number last">${totalItemspages}</button>`;
  }

  // Кнопка "Вперёд"
  paginationContainer.innerHTML += `
    <button class="btn-next scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
      </svg>
    </button>
  `;
}

function showLoader() {
  document.querySelector('.loader').classList.remove('visuallyhidden');
}
function hideLoader() {
  document.querySelector('.loader').classList.add('visuallyhidden');
}
function updatePaginationButtons() {
  const prevBtn = document.querySelector('.btn-prev');
  const nextBtn = document.querySelector('.btn-next');

  // Обработка "Назад"
  if (NowPages === 1) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

  // Обработка "Вперёд"
  if (NowPages >= totalItemspages) {
    nextBtn.classList.add('disabled');
  } else {
    nextBtn.classList.remove('disabled');
  }
}

function hideLoadMoreButton() {
  if (NowPages >= totalItemspages) {
    BtnMoreItems.style.display = 'none';
  } else {
    BtnMoreItems.style.display = 'inline';
  }
}

// Обработка кликов по пагинации

document.addEventListener('click', async event => {
  let shouldScroll = false;

  if (event.target.closest('.page-number')) {
    const pageBtn = event.target.closest('.page-number');
    const pageNumber = parseInt(pageBtn.textContent, 10);
    if (!isNaN(pageNumber)) {
      NowPages = pageNumber;
      await createProductsList(getFurnitures(NowPages, 8));
      setTimeout(() => {
        document.querySelector('.products-list').scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }, 300);
    }
  }

  if (event.target.closest('.btn-next')) {
    if (NowPages < totalItemspages) {
      NowPages++;
      await createProductsList(getFurnitures(NowPages, 8));
      setTimeout(() => {
        document.querySelector('.products-list').scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }, 300);
    }
  }

  if (event.target.closest('.btn-prev')) {
    if (NowPages > 1) {
      NowPages--;
      await createProductsList(getFurnitures(NowPages, 8));
      setTimeout(() => {
        document.querySelector('.products-list').scrollIntoView({
          behavior: 'smooth',
          block: 'end'
        });
      }, 300);

    }
  }

  BtnMoreItems.addEventListener('click', async () => {
    if (NowPages < totalItemspages) {
      NowPages++;
      hideLoadMoreButton();
      await createProductsList(getFurnitures(NowPages, 8));
      setTimeout(() => {
        document.querySelector('.products-list').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 100);
    }
  });


});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  getAllCategories();
  createProductsList();
});
