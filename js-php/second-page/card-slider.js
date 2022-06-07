const cardSliders = document.querySelectorAll(".card__slider");

for (let i = 0; i < cardSliders.length; i++) {
	const cardSlider = cardSliders[i];

	let cardSlides = cardSlider.querySelectorAll(".card__slider-item");
	let cardDots = cardSlider.querySelectorAll(".card__slider-dot");

	for (let i = 0; i < cardDots.length; i++) {
		cardDots[i].addEventListener('click', function () {
			cardSlideIndex = this.dataset.slide;
			showCardSlides(cardSlideIndex)
		});
	};

	// Индекс слайда по умолчанию
	let cardSlideIndex = 1;
	showCardSlides(cardSlideIndex)

	// Функция "переключения" слайдов
	function showCardSlides(index) {
		console.log(index, cardSlides)
		if (index > cardSlides.length) {
			cardSlideIndex = 1;
		} else if (index < 1) {
			cardSlideIndex = Math.max(cardSlides.length);
		}

		for (let i = 0; i < cardSlides.length; i++) {
			cardSlides[i].style.display = "none";
			cardDots[i].className = cardDots[i].className.replace(" _active", "");
		}

		cardSlides[cardSlideIndex - 1].style.display = "block";
		cardDots[cardSlideIndex - 1].className += " _active";

	}

	let cardPrev = cardSlider.querySelector(".card__slider-previous");
	let CardNext = cardSlider.querySelector(".card__slider-next");

	cardPrev.addEventListener('click', prevCardSlide)
	CardNext.addEventListener('click', nextCardSlide)

	// Функция для кнопки "назад"
	function prevCardSlide() {
		showCardSlides(cardSlideIndex -= 1);
	}

	// Функция для кнопки "вперед"
	function nextCardSlide() {
		showCardSlides(cardSlideIndex += 1);
	}
}

// let cardSlides = document.querySelectorAll(".card__slider-item");
// let cardDots = document.querySelectorAll(".card__slider-dot");

// for (let i = 0; i < cardDots.length; i++) {
// 	cardDots[i].addEventListener('click', function() {
// 		cardSlideIndex = this.dataset.slide;
// 		showCardSlides(cardSlideIndex)
// 	});
// };

// // Индекс слайда по умолчанию
// let cardSlideIndex = 1;
// showCardSlides(cardSlideIndex)

// // Функция "переключения" слайдов
// function showCardSlides(index) {
// 	if (index > cardSlides.length) {
// 		cardSlideIndex = 1;
// 	} else if (index < 1) {
// 		cardSlideIndex = Math.max(cardSlides.length);
// 	}

// 	for (let i = 0; i < cardSlides.length; i++) {
// 		cardSlides[i].style.display = "none";
// 		cardDots[i].className = cardDots[i].className.replace(" _active", "");
// 	}

// 	cardSlides[cardSlideIndex - 1].style.display = "block";
// 	cardDots[cardSlideIndex - 1].className += " _active";
// }

// let cardPrev = document.querySelector(".card__slider-previous");
// let CardNext = document.querySelector(".card__slider-next");

// cardPrev.addEventListener('click', prevCardSlide)
// CardNext.addEventListener('click', nextCardSlide)

// // Функция для кнопки "назад"
// function prevCardSlide() {
// 	showCardSlides(cardSlideIndex -= 1);
// }

// // Функция для кнопки "вперед"
// function nextCardSlide() {
// 	showCardSlides(cardSlideIndex += 1);
// }