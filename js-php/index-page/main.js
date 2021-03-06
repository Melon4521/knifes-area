// Определение устройства пользователя (тач-скрин/ПК)
if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
    document.body.classList.add("_touch");

    let menuArrows = document.querySelectorAll('.menu__arrow');
    if (menuArrows.length > 0) {
        for (let i = 0; i < menuArrows.length; i++) {
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
    for (let i = 0; i < menuLinks.length; i++) {
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
    for (let i = 0; i < menuSubLinks.length; i++) {
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

// Modal windows

const modals = document.querySelectorAll(".modal-window");
const openModals = document.querySelectorAll(".open-modal[data-open]");
const closeModals = document.querySelectorAll(".modal__close[data-close]");

if (openModals.length > 0 && modals.length > 0) {
    openModals.forEach((openModal) => {
        openModal.addEventListener('click', openModalWindow);
    });
}

if (closeModals.length > 0 && modals.length > 0) {
    closeModals.forEach((closeModal) => {
        closeModal.addEventListener('click', closeModalWindow);
    });
}

function openModalWindow(e) {
    e.preventDefault();
    const dataAtribute = this.dataset.open;

    if (document.querySelector(dataAtribute)) {
        if (menuBody.classList.contains('_active') && menuBurger.classList.contains('_active')) {
            menuBody.classList.remove('_active');
            menuBurger.classList.remove('_active');
        }

        const modalWindow = document.querySelector(dataAtribute)
        modalWindow.classList.add('_active');
        const htmlElem = document.documentElement
        document.body.style.paddingRight = window.innerWidth - htmlElem.clientWidth + 'px';
        document.querySelector('.header').style.paddingRight = window.innerWidth - htmlElem.clientWidth + 'px';
        document.body.classList.add("_lock");
    }
};

function closeModalWindow() {
    const dataAtribute = this.dataset.close;

    if (document.querySelector(dataAtribute)) {
        const modalWindow = document.querySelector(dataAtribute)
        modalWindow.classList.remove('_active');
        document.body.classList.remove("_lock");
        document.querySelector('.header').style.paddingRight = '0px';
        document.body.style.paddingRight = '0px';
    }
}


// Scroll-animations

const animItems = document.querySelectorAll('._scroll-anim');

if (animItems.length > 0) {
    window.addEventListener('scroll', scrollAnimation)

    function scrollAnimation() {
        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const windowHeight = window.innerHeight;
            let animItemHeight = animItem.offsetHeight;
            let animItemTop = offset(animItem);
            let animCooficent = 4;

            let animItemPoint = windowHeight - animItemHeight / animCooficent;
            if (animItemHeight > windowHeight) {
                animItemPoint = windowHeight - windowHeight / animCooficent;
            }

            if ((window.pageYOffset > animItemTop - animItemPoint) && window.pageYOffset < (animItemTop + animItemHeight)) {
                animItem.classList.add("_scroll-anim__active");
            } 
            // else {
            //     animItem.classList.remove("_scroll-anim__active");
            // }
        }

        function offset(element) {
            const rect = element.getBoundingClientRect(),
                scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return (rect.top + scrollTop)
        }
    }

    
    setTimeout(() => {
        scrollAnimation()
    }, 400)
};