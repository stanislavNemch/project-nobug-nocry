import { getCategories, getFurnitures } from './furniture-api.js';

const listCategory = document.querySelector('.product-categories-list');
const paginationContainer = document.querySelector('.pagination');
const BtnMoreItems = document.querySelector('.btn-loadMore');

const ALL_CATEGORY_TEXT = 'Всі товари';

let NowPages = 1;
let totalItemspages = 1;
let currentCategoryId = null;

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
  if (activeCategory) {
    activeCategory.classList.remove('active-category');
  }
}

export function renderCategories(data) {
  const markup = data
    .map(
      (el, index) => `<li class="product-categories-item" data-id="${el._id}">
  <img
    class="product-categories-img"
    srcset="
      ./img/category-imgs/category-img-${index + 1}.webp    1x,
      ./img/category-imgs/category-img-${index + 1}@2x.webp 2x
    "
    src="./img/category-imgs/category-img-${index + 1}.webp"
    alt="Зображення категорії ${el.name}"
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
    currentCategoryId = null;
    createProductsList(getFurnitures(1, 8));
  } else {
    currentCategoryId = categoryId;
    createProductsList(getFurnitures(1, 8, categoryId));
  }
}

listCategory.addEventListener('click', getOneCategory);

// Функция для отображения скелетон-карточек
function showSkeleton(count = 8) {
  const productsList = document.querySelector('.products-list');
  productsList.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'product-item skeleton';
    skeleton.innerHTML = `
      <div class="skeleton-box" style="width:100%; height:256px; margin-bottom:10px;"></div>
      <div class="skeleton-box" style="width:80%; height:16px; margin-bottom:8px;"></div>
      <div class="skeleton-box" style="width:60%; height:16px; margin-bottom:8px;"></div>
      <div class="skeleton-box" style="width:40%; height:16px; margin-bottom:12px;"></div>
      <button class="btn btn-go-modal">Детальніше</button>
    `;
    productsList.appendChild(skeleton);
  }
}

async function createProductsList(functions = getFurnitures(NowPages, 8)) {
  const productsList = document.querySelector('.products-list');
  const isMobiles = window.matchMedia('(max-width: 767px)').matches;

  // Сохраняем текущую длину списка для автоскролла
  const existingItems = productsList.querySelectorAll('.product-item').length;

  // Скелетоны показываем только при первой загрузке или на десктопе
  if (!isMobiles || NowPages === 1) {
    showSkeleton(8);
  }

  showLoader();

  try {
    const data = await functions;
    const furnitures = data.furnitures || data;
    totalItemspages = Math.ceil(data.totalItems / 8);

    // Если мобильный и это не первая страница — добавляем
    if (isMobiles && NowPages > 1) {
      furnitures.forEach(furniture => {
        productsList.appendChild(createProductCard(furniture));
      });

      // Автоскролл к первому новому товару
      const firstNewItem =
        productsList.querySelectorAll('.product-item')[existingItems];
      if (firstNewItem) {
        firstNewItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Иначе перерисовываем
      productsList.innerHTML = '';
      furnitures.forEach(furniture => {
        productsList.appendChild(createProductCard(furniture));
      });
    }

    if (!isMobiles) {
      createPagination(NowPages);
      updatePaginationButtons();
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error('Помилка завантаження товарів:', error);
    productsList.innerHTML = '<p>Помилка завантаження товарів.</p>';
  } finally {
    hideLoader();
  }
}

function createProductCard(furniture) {
  const productItem = document.createElement('li');
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
          c => `<span class="color-one" style="background-color:${c};"></span>`
        )
        .join('')}
    </div>
    <p class="text-card">${furniture.price} грн</p>
    <button class="btn btn-go-modal">Детальніше</button>
  `;

  return productItem;
}

function createPagination(NowPages) {
  paginationContainer.innerHTML = '';

  paginationContainer.innerHTML += `
    <button class="btn-prev scroll">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" class="icon">
        <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
      </svg>
    </button>
  `;

  if (NowPages > 1) {
    paginationContainer.innerHTML += `
      <button class="page-number ${NowPages === 1 ? 'focus' : ''}">1</button>
    `;
    paginationContainer.innerHTML += `<span class="dtp" style="margin-right: 18px;">...</span>`;
  }

  for (let i = NowPages; i <= Math.min(NowPages + 2, totalItemspages); i++) {
    paginationContainer.innerHTML += `
      <button class="page-number ${i === NowPages ? 'focus' : ''}">${i}</button>
    `;
  }

  if (NowPages + 2 < totalItemspages) {
    paginationContainer.innerHTML += `<span class="dtp">...</span>`;
    paginationContainer.innerHTML += `<button class="page-number last">${totalItemspages}</button>`;
  }

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

  if (NowPages === 1) {
    prevBtn.classList.add('disabled');
  } else {
    prevBtn.classList.remove('disabled');
  }

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

document.addEventListener('click', async event => {
  if (event.target.closest('.page-number')) {
    const pageBtn = event.target.closest('.page-number');
    const pageNumber = parseInt(pageBtn.textContent, 10);
    if (!isNaN(pageNumber)) {
      NowPages = pageNumber;
      await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));
    }
  }

  if (event.target.closest('.btn-next')) {
    if (NowPages < totalItemspages) {
      NowPages++;
      await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));
    }
  }

  if (event.target.closest('.btn-prev')) {
    if (NowPages > 1) {
      NowPages--;
      await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));
    }
  }
});

BtnMoreItems.addEventListener('click', async () => {
  if (NowPages < totalItemspages) {
    NowPages++;
    hideLoadMoreButton();
    await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  getAllCategories();
  createProductsList();
});
