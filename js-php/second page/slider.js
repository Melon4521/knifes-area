let slides = document.querySelectorAll(".slider-item");
let dots = document.querySelectorAll(".slider-dot");

for (let i = 0; i < dots.length; i++) {
	dots[i].addEventListener('click', function() {
		slideIndex = this.dataset.slide;
		showSlides(slideIndex)
	});
};

// Индекс слайда по умолчанию
let slideIndex = 1;
showSlides(slideIndex)

// Функция "переключения" слайдов
function showSlides(index) {
	if (index > slides.length) {
		slideIndex = 1;
	} else if (index < 1) {
		slideIndex = Math.max(slides.length);
	}
	
	for (let i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
		dots[i].className = dots[i].className.replace(" active", "");
	}
	
	slides[slideIndex - 1].style.display = "block";
	dots[slideIndex - 1].className += " active";
}

let prev = document.querySelector(".slider__previous");
let next = document.querySelector(".slider__next");

prev.addEventListener('click', prevSlide)
next.addEventListener('click', nextSlide)

// Функция для кнопки "назад"
function prevSlide() {
	showSlides(slideIndex -= 1);
}

// Функция для кнопки "вперед"
function nextSlide() {
	showSlides(slideIndex += 1);
}

let auto_changing = setInterval(() => {showSlides(slideIndex+=1)}, 10000)









