// Определение устройства пользователя (тач-скрин/ПК)
if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
    document.body.classList.add("_touch");
    
    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i<menuArrows.length; i++) {
            let menuArrow = menuArrows[i];
            menuArrow.addEventListener('click', function (e) {
                menuArrow.parentElement.classList.toggle('_active');
            });
        };
    };
  } else {
    document.body.classList.add("_pc")
};

// Навигация по странице при клике

let menuLinks = document.querySelectorAll('.menu__link[data-goto]');
let menuSubLinks = document.querySelectorAll('.menu__sub-link[data-goto]');


if (menuLinks.length > 0) {
    for (let i = 0; i<menuLinks.length; i++) {
        let menulink = menuLinks[i];
        menulink.addEventListener('click', menuLinkClick);
    };

    function menuLinkClick(e) {
        const menulink = e.target;
        if (menulink.dataset.goto && document.querySelector(menulink.dataset.goto)) {
            e.preventDefault();
            const goToItem = document.querySelector(menulink.dataset.goto);
            const headerHeight = document.querySelector('.header').offsetHeight;
            const goToItemTop = goToItem.getBoundingClientRect().top + pageYOffset;
            const goToPosition = goToItemTop - headerHeight;

            if (menuBody.classList.contains('_active')) {
                menuBody.classList.remove('_active')
                menuBurger.classList.remove('_active');
                document.body.classList.remove('_lock')
            }

            window.scrollTo({
                left: 0,
                top: goToPosition,
                behavior: "smooth",
            });
        };
    };
};

if (menuSubLinks.length > 0) {
    for (let i = 0; i<menuSubLinks.length; i++) {
        let menuSublink = menuSubLinks[i];
        menuSublink.addEventListener('click', menuSubLinkClick);
    };

    function menuSubLinkClick(e) {
        const menuSublink = e.target;
        if (menuSublink.dataset.goto && document.querySelector(menuSublink.dataset.goto)) {
            e.preventDefault();
            const goToItem = document.querySelector(menuSublink.dataset.goto);
            const headerHeight = document.querySelector('.header').offsetHeight;
            const goToItemTop = goToItem.getBoundingClientRect().top + pageYOffset;
            const goToPosition = goToItemTop - headerHeight;

            if (menuBody.classList.contains('_active')) {
                menuBody.classList.remove('_active')
                menuBurger.classList.remove('_active');
                document.body.classList.remove('_lock')
            }

            console.log(goToItem, headerHeight, goToItemTop, goToPosition)

            window.scrollTo({
                left: 0,
                top: goToPosition,
                behavior: "smooth",
            });
        };
    };
};

// Открытие бургера

const menuBurger = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__body');

if (menuBurger) {
    menuBurger.addEventListener('click', function () {
        menuBurger.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        document.body.classList.toggle('_lock')
    });
};