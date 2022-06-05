
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

const modals = document.querySelectorAll(".modal");
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

// Нахождение главных объектов на странице и добавление им основных событий:

let mainCart = document.querySelector("#shoppingCart"); // Корзина в <header>
mainCart.addEventListener('click', openCart);

let cardButtons = document.querySelectorAll(".btn2Cart"); // Массив кнопок на карточке товара

for (let i = 0; i < cardButtons.length; i++) {
	cardButtons[i].addEventListener('click', add2Cart)
};

// Открытие окна корзины и заполнение ее данными

let close1 = document.querySelector("#close1");
let close2 = document.querySelector("#close2");

close1.addEventListener('click', function () {
	closeWind(true)
});
close2.addEventListener('click', function () {
	closeWind(true)
});

function closeWind(x) {
	if (x === false) {
		document.querySelector("#windowcart").style.display = "block";
		mainCart.style.display = "none";
		document.querySelector("body").classList.add("body-lock")
	} else {
		document.querySelector("#windowcart").style.display = "none";
		mainCart.style.display = "block";
		document.querySelector("body").classList.remove("body-lock")
	};

	cheakCart();
};

function add2Cart() {
	this.disable = true;
	let cartData = getCartData() || {},
		itemID = this.dataset.id,
		itemNAME = this.dataset.name,
		itemPRICE = this.dataset.price;

	//	alert(`Товар ${itemNAME} - ${itemPRICE}руб. успешно добавлен в корзину!`)

	if (cartData.hasOwnProperty(itemID)) {
		cartData[itemID][2]++;
	} else {
		cartData[itemID] = [itemNAME, itemPRICE, 1];
	};

	setCartData(cartData);
	this.disable = true;
	cheakCart();
	return cartData;
}

function setCartData(a) {

	localStorage.setItem("cart", JSON.stringify(a));
};

function getCartData() {
	return JSON.parse(localStorage.getItem("cart"));
};

function cheakCart() {
	if (localStorage.getItem("cart") != null) {
		mainCart.style.display = "block";
	} else {
		mainCart.style.display = "none";
	};
};

cheakCart();

// Кнопка "Очистить корзину" 

let clearAll = document.querySelector("#clearAll");
clearAll.addEventListener('click', ClearAllElems)

function ClearAllElems() {
	if (confirm("Вы точно хотите очистить всё?") == true) {
		localStorage.removeItem("cart");
		alert("Корзина очищена!");
		mainCart.style.display = "none";
		closeWind(true);
	};
};

function openCart() {
	closeWind(false);

	let cartData = getCartData(), // Получение данных из LocalStorage
		totalItems = '', // код HTML для корзины
		totalSum = 0, // Сумма всех товаров в корзине
		cartInfo = ''; // Текст заказа для письма

	if (cartData !== null) {
		totalItems = `
    <table class="mytable" cellpadding=7>
    <tr>
        <th width=48%>Наименование</th>
        <th width=20%>Цена</th>
        <th width=12% colspan=3>Количество</th>
    </tr>`;

		for (let items in cartData) {
			totalItems += "<tr>";
			for (let i = 0; i < cartData[items].length; i++) {
				totalItems += `<td>${cartData[items][i]}</td>`;
				cartInfo += `${cartData[items][i]}\t`;
			};
			cartInfo += "\n";
			totalSum += Number(String((cartData[items][1]).split(',').join("")) * cartData[items][2]);
			totalItems += "<td width=10% class='columns-del' onclick = deleteItem(" + items + ")> - </td>";
			totalItems += "<td width=10% class='columns-del' onclick = addItem(" + items + ")> + </td></tr>";
		};
		
		totalItems += "</table>";

		document.getElementById("table").innerHTML = totalItems;
		document.getElementById("cost").innerHTML = `Общая стоимость товаров: ${totalSum}руб.`;
		document.getElementById("hiddenCartItem").value = cartInfo + `Общая стоимость товаров: ${totalSum}руб.`;
	};
	return totalSum;
};

function addItem(itemID) {
	let cartData = getCartData();
	cartData[itemID][2] += 1;
	setCartData(cartData);
	openCart()
}


function deleteItem(item) {
	let cartData = getCartData();

	if (cartData[item][2] == 1) {
		delete cartData[item];
	} else {
		cartData[item][2] -= 1;
	}

	setCartData(cartData);
	openCart();

	if (openCart() === 0) {
		localStorage.removeItem("cart");
		alert("Корзина очищена");
		closeWind(true);
		cheakCart();
	};
};

// Отправка заказа

let sendBtn = document.getElementById("sendOrder");
sendBtn.addEventListener('click', sendOrder)

function sendOrder() {
	alert("Заказ отправлен, мы скоро с вами свяжемся!");
	ClearAllElems()
}


// Cookie Alert

let ck_window = document.querySelector(".cookie-alert"),
	ck_closeBtn = document.querySelector("#cookie_alertClose");

ck_closeBtn.addEventListener('click', () => {
	ck_window.classList.add("invisible");
});

function visible_ckAlert() {
	ck_window.classList.remove("invisible");
	ck_window.classList.add("visible");
}

let cookie_interval = setTimeout(visible_ckAlert, 3000);




