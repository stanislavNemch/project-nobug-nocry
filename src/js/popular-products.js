import { getPopularFurnitures } from './furniture-api.js';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

class PopularProductsSwiper {
  constructor() {
    this.swiperContainer = document.querySelector('.popular-products-swiper');
    this.swiperWrapper = document.querySelector(
      '.popular-products-swiper .swiper-wrapper'
    );
    this.loader = document.querySelector('.popular-products-loader');

    this.swiper = null;
    this.products = [];

    this.init();
  }

  async init() {
    await this.loadProducts();
    if (this.products.length >= 3) {
      this.renderProducts();
      this.initSwiper();
    }
  }

  async loadProducts() {
    this.showLoader();

    try {
      const data = await getPopularFurnitures();
      if (data && data.furnitures && data.furnitures.length >= 3) {
        this.products = data.furnitures;
      } else {
        this.showError('Недостатньо популярних товарів для відображення');
      }
    } catch (error) {
      this.showError('Помилка завантаження популярних товарів');
    } finally {
      this.hideLoader();
    }
  }

  renderProducts() {
    const slides = this.products
      .map(
        product => `
      <div class="swiper-slide">
        <div class="popular-products-item" data-id="${product._id}">
          <img src="${product.images[0]}" alt="${
          product.name
        }" class="img-card" />
          <p class="text-card">${product.name}</p>
          <div class="colors">
            ${product.color
              .map(
                color =>
                  `<span class="color-one" style="background-color:${color};"></span>`
              )
              .join('')}
          </div>
          <p class="text-card">${product.price} грн</p>
          <button class="btn btn-go-modal">Детальніше</button>
        </div>
      </div>
    `
      )
      .join('');

    this.swiperWrapper.innerHTML = slides;
  }

  initSwiper() {
    this.swiper = new Swiper('.popular-products-swiper', {
      modules: [Navigation, Pagination],

      // Количество слайдов в зависимости от экрана
      slidesPerView: 1, // Мобильные - 1 товар
      spaceBetween: 16,
      centeredSlides: true, // Центрирование слайдов

      // Breakpoints для responsive дизайна
      breakpoints: {
        // >= 768px (планшеты) - 2 товара
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
          centeredSlides: false, // Отключаем центрирование для планшетов и десктопа
        },
        // >= 1440px (десктоп) - 4 товара
        1440: {
          slidesPerView: 4,
          spaceBetween: 24,
          centeredSlides: false,
        },
      },

      // Навигация
      navigation: {
        nextEl: '.popular-products-navigation .swiper-button-next',
        prevEl: '.popular-products-navigation .swiper-button-prev',
      },

      // Пагинация
      pagination: {
        el: '.popular-products-pagination',
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) {
          return '<span class="' + className + '"></span>';
        },
      },

      // Дополнительные настройки
      loop: false,
      watchOverflow: true,
      watchSlidesProgress: true,

      // Плавная анимация
      speed: 300,

      // Отключение автопрокрутки
      autoplay: false,

      // Touch события
      touchRatio: 1,
      touchAngle: 45,
      grabCursor: true,

      // Обновление при изменении размера
      updateOnWindowResize: true,

      // События
      on: {
        init: () => {
          this.addCustomIcons();
        },
        slideChange: () => {
          console.log('Slide changed');
        },
      },
    });

    // Обработчик клика на карточки товаров
    this.bindEvents();
  }

  bindEvents() {
    this.swiperWrapper.addEventListener('click', e => {
      const productItem = e.target.closest('.popular-products-item');
      if (productItem && e.target.classList.contains('btn-go-modal')) {
        const productId = productItem.dataset.id;
        this.openProductModal(productId);
      }
    });

    // Дополнительное обновление при изменении размера окна
    window.addEventListener('resize', () => {
      setTimeout(() => {
        if (this.swiper) {
          this.swiper.update();
        }
      }, 100);
    });
  }

  addCustomIcons() {
    // Swiper уже автоматически создает кнопки, просто добавляем иконки
    setTimeout(() => {
      const prevBtn = document.querySelector(
        '.popular-products-navigation .swiper-button-prev'
      );
      const nextBtn = document.querySelector(
        '.popular-products-navigation .swiper-button-next'
      );

      if (prevBtn && !prevBtn.querySelector('.popular-products-icon')) {
        prevBtn.innerHTML = `
          <svg class="popular-products-icon" width="24" height="24">
            <use href="./img/sprite.svg#left-arrow-alt"></use>
          </svg>
        `;
      }

      if (nextBtn && !nextBtn.querySelector('.popular-products-icon')) {
        nextBtn.innerHTML = `
          <svg class="popular-products-icon" width="24" height="24">
            <use href="./img/sprite.svg#right-arrow-alt"></use>
          </svg>
        `;
      }
    }, 100);
  }

  openProductModal(productId) {
    // Интеграция с модальным окном
    const modalEvent = new CustomEvent('openProductModal', {
      detail: { productId },
    });
    document.dispatchEvent(modalEvent);

    console.log('Открыть модальное окно для товара:', productId);
  }

  showLoader() {
    this.loader.classList.remove('hidden');
  }

  hideLoader() {
    this.loader.classList.add('hidden');
  }

  showError(message) {
    this.swiperWrapper.innerHTML = `
      <div class="swiper-slide">
        <p class="error-message" style="text-align: center; padding: 40px; color: #666;">${message}</p>
      </div>
    `;
  }

  // Методы для программного управления
  slideNext() {
    if (this.swiper) {
      this.swiper.slideNext();
    }
  }

  slidePrev() {
    if (this.swiper) {
      this.swiper.slidePrev();
    }
  }

  // Уничтожение инстанса при необходимости
  destroy() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  new PopularProductsSwiper();
});

// Экспорт для возможного использования в других модулях
export default PopularProductsSwiper;
