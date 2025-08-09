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
    alt="${el.name}"
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

async function createProductsList(
  functions = getFurnitures(NowPages, 8, currentCategoryId)
) {
  showLoader();
  const productsList = document.querySelector('.products-list');
  const productsContainer = document.querySelector('.pagination');

  // Исправленная логика: мобильные до 768px показывают "Показати ще"
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  if (NowPages === 1 || !isMobile) {
    productsList.innerHTML = '';
    if (productsContainer) productsContainer.innerHTML = '';
  }

  try {
    const data = await functions;
    hideLoader();
    const furnitures = data.furnitures || data;
    totalItemspages = Math.ceil(data.totalItems / 8);

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
      });

      if (!isMobile) {
        createPagination(NowPages);
        updatePaginationButtons();
      }

      updateLoadMoreButton();
    } else {
      productsList.innerHTML = '<p>Товари не знайдені.</p>';
      hideLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    productsList.innerHTML = '<p>Помилка завантаження товарів.</p>';
    hideLoadMoreButton();
  }
}

function createPagination(NowPages) {
  paginationContainer.innerHTML = '';

  paginationContainer.innerHTML += `
    <button class="btn-prev scroll">
      <svg class="swiper-button-icon" width="24" height="24">
                <use href="./img/sprite.svg#left-arrow-alt"/>
      </svg>
    </button>
  `;

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
      <svg class="swiper-button-icon" width="24" height="24">
                <use href="./img/sprite.svg#right-arrow-alt" />
      </svg>
    </button>
  `;
}

function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.remove('visuallyhidden');
  }
}

function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('visuallyhidden');
  }
}

function updatePaginationButtons() {
  const prevBtn = document.querySelector('.btn-prev');
  const nextBtn = document.querySelector('.btn-next');

  if (prevBtn) {
    if (NowPages === 1) {
      prevBtn.classList.add('disabled');
    } else {
      prevBtn.classList.remove('disabled');
    }
  }

  if (nextBtn) {
    if (NowPages >= totalItemspages) {
      nextBtn.classList.add('disabled');
    } else {
      nextBtn.classList.remove('disabled');
    }
  }
}

function updateLoadMoreButton() {
  if (!BtnMoreItems) return;

  // Исправленная логика: мобильные до 768px (где 1 товар в ряду)
  const isMobile = window.matchMedia('(max-width: 767px)').matches;

  if (isMobile) {
    if (NowPages >= totalItemspages) {
      BtnMoreItems.style.display = 'none';
    } else {
      BtnMoreItems.style.display = 'block';
    }
  } else {
    BtnMoreItems.style.display = 'none';
  }
}

function hideLoadMoreButton() {
  if (BtnMoreItems) {
    BtnMoreItems.style.display = 'none';
  }
}

if (BtnMoreItems) {
  BtnMoreItems.addEventListener('click', async () => {
    if (NowPages < totalItemspages) {
      NowPages++;
      await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));

      setTimeout(() => {
        const lastProduct = document.querySelector(
          '.products-list .product-item:last-child'
        );
        if (lastProduct) {
          lastProduct.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }, 100);
    }
  });
}

const productSection = document.getElementById('furniture');
if (productSection) {
  productSection.addEventListener('click', async event => {
    // Исправленная логика: мобильные до 768px не используют пагинацию
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    if (isMobile) return;

    if (event.target.closest('.page-number')) {
      const pageBtn = event.target.closest('.page-number');
      const pageNumber = parseInt(pageBtn.textContent, 10);
      if (!isNaN(pageNumber)) {
        NowPages = pageNumber;
        await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));
        setTimeout(() => {
          document.querySelector('.products-list').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 300);
      }
    }

    if (event.target.closest('.btn-next')) {
      if (NowPages < totalItemspages) {
        NowPages++;
        await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));
        setTimeout(() => {
          document.querySelector('.products-list').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 300);
      }
    }

    if (event.target.closest('.btn-prev')) {
      if (NowPages > 1) {
        NowPages--;
        await createProductsList(getFurnitures(NowPages, 8, currentCategoryId));
        setTimeout(() => {
          document.querySelector('.products-list').scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
        }, 300);
      }
    }
  });
}

window.addEventListener('resize', () => {
  updateLoadMoreButton();
});

document.addEventListener('DOMContentLoaded', () => {
  getAllCategories();
  createProductsList();
});
