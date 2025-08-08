import { getFurnitures } from './furniture-api.js';

let NowPages = 1;
let totalItemspages = 1; // [1] Глобально сохраняем общее число страниц

const paginationContainer = document.querySelector('.pagination');
const BtnMoreItems = document.querySelector('.btn-loadMore');

// функция для сбора товаров
// по текущей странице и количеству на страницей

async function createProductsList(functions = getFurnitures(NowPages, 8)) {
  LoaderHid(); // [5] Скрываем лоадер перед загрузкой товаров
  const productsList = document.querySelector('.products-list');
  const productsContainer = document.querySelector('.pagination');
  if (window.innerWidth < 375) {
  productsList.innerHTML = '';
  productsContainer.innerHTML = ''; // Очищаем контейнер пагинации
  }
  try {
    const data = await functions;
    LoaderHid();
    const furnitures = data.furnitures || data;
    totalItemspages = Math.ceil(data.totalItems / 8); // [2] Рассчитываем всего страниц

    if (furnitures && furnitures.length) {
      furnitures.forEach(furniture => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.setAttribute('data-id', furniture._id);

        productItem.innerHTML = `
          <img src="${furniture.images[0]}" alt="${furniture.name}" class="img-card" width="100%" height="256px" />
          <p class="text-card">${furniture.name}</p>
          <div class="colors">
            ${furniture.color.map(c => `<span class="color-one" style="background-color:${c};"></span>`).join('')}
          </div>
          <p class="text-card">${furniture.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        `;

        productsList.appendChild(productItem);
      });

      createPagination(NowPages);   // [3] Обновляем пагинацию
      updatePaginationButtons();    // [4] Включаем/отключаем кнопки вперёд/назад

    } else {
      productsList.innerHTML = '<p>Товари не знайдені.</p>';
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

function LoaderHid() {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('visuallyhidden');
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
document.addEventListener('click', async (event) => {


  if (event.target.closest('.page-number')) {
    const pageBtn = event.target.closest('.page-number');
    const pageNumber = parseInt(pageBtn.textContent, 10);
    if (!isNaN(pageNumber)) {
      NowPages = pageNumber;
      await createProductsList(getFurnitures(NowPages, 8));
      setTimeout(() => {
        document.querySelector('.products-list').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
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
          block: 'nearest'
        });
      }, 1000);
    }
  }

  if (event.target.closest('.btn-prev')) {
    if (NowPages > 1) {
      NowPages--;
      await createProductsList(getFurnitures(NowPages, 8));
      setTimeout(() => {
        document.querySelector('.products-list').scrollIntoView({
          behavior: 'smooth',
          block: 'nearest'
        });
      }, 1000);

    }
  }

});
BtnMoreItems.addEventListener('click', async () => {
  if (NowPages < totalItemspages) {
    NowPages++;
    await createProductsList(getFurnitures(NowPages, 8));
    hideLoadMoreButton(); // [6] Скрываем кнопку "Показать ещё" при достижении последней страницы
    setTimeout(() => {
      document.querySelector('.products-list').scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 400);
  }
});

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  createProductsList();
});
