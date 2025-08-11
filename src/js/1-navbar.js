(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const burgerIcon = openMenuBtn.querySelector('use');
  const menuLinks = mobileMenu.querySelectorAll('.nav-link, .mobile-order-btn');

  // Змінні для зберігання обробників подій
  let keydownHandler = null;
  let clickOutsideHandler = null;

  // Отримуємо базовий шлях до спрайту з існуючого елемента
  const getSpritePath = () => {
    const currentHref = burgerIcon.getAttribute('href');
    return currentHref.split('#')[0]; // Забираємо #icon-назву, залишаємо шлях
  };

  // Створення обробника клавіші Escape
  const createKeydownHandler = () => event => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  // Створення обробника кліку поза меню
  const createClickOutsideHandler = () => event => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuButton = openMenuBtn.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuButton) {
      closeMenu();
    }
  };

  // Додавання слухачів при відкритті меню
  const addEventListeners = () => {
    // Створюємо обробники якщо їх ще немає
    if (!keydownHandler) {
      keydownHandler = createKeydownHandler();
    }
    if (!clickOutsideHandler) {
      clickOutsideHandler = createClickOutsideHandler();
    }

    // Додаємо слухачі
    document.addEventListener('keydown', keydownHandler);
    document.addEventListener('click', clickOutsideHandler);
  };

  // Видалення слухачів при закритті меню
  const removeEventListeners = () => {
    if (keydownHandler) {
      document.removeEventListener('keydown', keydownHandler);
    }
    if (clickOutsideHandler) {
      document.removeEventListener('click', clickOutsideHandler);
    }
  };

  const closeMenu = () => {
    const spritePath = getSpritePath();
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    burgerIcon.setAttribute('href', `${spritePath}#icon-burger`);
    openMenuBtn.setAttribute('aria-label', 'Перемикач мобільного меню');
    document.body.classList.remove('no-scroll');

    // Видаляємо слухачі подій
    removeEventListeners();
  };

  const openMenu = () => {
    const spritePath = getSpritePath();
    mobileMenu.classList.add('is-open');
    openMenuBtn.setAttribute('aria-expanded', true);
    burgerIcon.setAttribute('href', `${spritePath}#icon-close`);
    openMenuBtn.setAttribute('aria-label', 'Закрити мобільне меню');
    document.body.classList.add('no-scroll');

    // Додаємо слухачі подій
    addEventListeners();
  };

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');

    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Відкриття та закриття меню по кнопці
  openMenuBtn.addEventListener('click', toggleMenu);

  // Закриття меню при натисканні на посилання
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Закриття меню при зміні розміру екрана на десктопний
  const mediaQuery = window.matchMedia('(min-width: 1440px)');
  const handleMediaChange = e => {
    if (!e.matches) return;
    if (!mobileMenu.classList.contains('is-open')) return;
    closeMenu();
  };

  mediaQuery.addEventListener('change', handleMediaChange);

  // Очищення при вивантаженні сторінки
  window.addEventListener('beforeunload', () => {
    removeEventListeners();
    mediaQuery.removeEventListener('change', handleMediaChange);
  });
})();
