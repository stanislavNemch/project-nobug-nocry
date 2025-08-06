(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const burgerIcon = openMenuBtn.querySelector('use');
  const menuLinks = mobileMenu.querySelectorAll('.nav-link, .mobile-order-btn');

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');

    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    // Заміна іконок
    if (mobileMenu.classList.contains('is-open')) {
      burgerIcon.setAttribute('href', './img/sprite.svg#icon-close');
      openMenuBtn.setAttribute('aria-label', 'Закрити мобільне меню');
    } else {
      burgerIcon.setAttribute('href', './img/sprite.svg#icon-burger');
      openMenuBtn.setAttribute('aria-label', 'Перемикач мобільного меню');
    }

    // Блокування/розблокування скролла
    document.body.classList.toggle('no-scroll');
  };

  // Відкриття та закриття за кнопкою
  openMenuBtn.addEventListener('click', toggleMenu);

  // Закриття меню при натисканні на посилання
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  // Закриття меню при зміні орієнтації на робочий стіл
  window.matchMedia('(min-width: 1440px)').addEventListener('change', e => {
    if (!e.matches) return;
    if (!mobileMenu.classList.contains('is-open')) return;

    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    burgerIcon.setAttribute('href', './img/sprite.svg#icon-burger');
    openMenuBtn.setAttribute('aria-label', 'Перемикач мобільного меню');
    document.body.classList.remove('no-scroll');
  });
})();
