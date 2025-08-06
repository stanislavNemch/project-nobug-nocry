(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');
  const menuLinks = mobileMenu.querySelectorAll('.nav-link, .mobile-order-btn');

  const toggleMenu = () => {
    const isMenuOpen = mobileMenu.classList.contains('is-open');

    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');

    // Блокування/розблокування скролла
    document.body.classList.toggle('no-scroll');
  };

  // Відкриття та закриття за кнопками
  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

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
    document.body.classList.remove('no-scroll');
  });
})();
