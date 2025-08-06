(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const burgerIcon = openMenuBtn.querySelector('use');
  const menuLinks = mobileMenu.querySelectorAll('.nav-link, .mobile-order-btn');

  // Отримуємо базовий шлях до спрайту з існуючого елемента
  const getSpritePath = () => {
    const currentHref = burgerIcon.getAttribute('href');
    return currentHref.split('#')[0]; // Забираємо #icon-назву, залишаємо шлях
  };

  const closeMenu = () => {
    const spritePath = getSpritePath();
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    burgerIcon.setAttribute('href', `${spritePath}#icon-burger`);
    openMenuBtn.setAttribute('aria-label', 'Перемикач мобільного меню');
    document.body.classList.remove('no-scroll');
  };

  const openMenu = () => {
    const spritePath = getSpritePath();
    mobileMenu.classList.add('is-open');
    openMenuBtn.setAttribute('aria-expanded', true);
    burgerIcon.setAttribute('href', `${spritePath}#icon-close`);
    openMenuBtn.setAttribute('aria-label', 'Закрити мобільне меню');
    document.body.classList.add('no-scroll');
  };

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');

    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  // Відкриття та закриття за кнопкою
  openMenuBtn.addEventListener('click', toggleMenu);

  // Закриття меню при натисканні на посилання
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Закриття меню при натисканні на клавішу Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Закриття меню при кліку за межами
  document.addEventListener('click', event => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnMenuButton = openMenuBtn.contains(event.target);

    if (isMenuOpen && !isClickInsideMenu && !isClickOnMenuButton) {
      closeMenu();
    }
  });

  // Закриття меню при зміні орієнтації на робочий стіл
  window.matchMedia('(min-width: 1440px)').addEventListener('change', e => {
    if (!e.matches) return;
    if (!mobileMenu.classList.contains('is-open')) return;
    closeMenu();
  });
})();
