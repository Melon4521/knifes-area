let chatArea = document.getElementById("chat"),
	input = document.querySelector("#user-text"),
	send_btn = document.querySelector("#send-btn"),
	dateTime = new Date(),
	hours = dateTime.getHours(),
	minutes = dateTime.getMinutes(),
	closeChat = document.querySelector(".closeItem"),
	callChat = document.createElement('div'),
	fstMessBot_Time = document.querySelectorAll(".time");
input.focus();

callChat.classList.add('invisible');
callChat.classList.add('btn-callbot');
callChat.title = "Виртуальный помощник"
document.body.append(callChat);

function callButton_in() {
	if (!callChat.classList.contains('btn-callbot')) {
		callChat.classList.add('btn-callbot');
	}
	callChat.classList.remove('invisible');
	callChat.classList.add('visible');
}

call_in = setTimeout(callButton_in, 5000)

callChat.addEventListener('click', () => {
	document.getElementById('wrapper').classList.remove("d-none");
	const prevent = ev => ev.preventDefault();
	document.getElementsByTagName('body')[0].style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
	document.querySelector('.header').style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
	document.getElementsByTagName('body')[0].style.overflowY = "hidden";
	callChat.classList.add('invisible');
	document.removeEventListener('wheel', prevent)
})

closeChat.addEventListener('click', () => {
	document.getElementById("wrapper").classList.add("d-none");
	const prevent = ev => ev.preventDefault();
	document.getElementsByTagName('body')[0].style.overflowY = "scroll";
	document.querySelector('.header').style.paddingRight = '0px';
	document.getElementsByTagName('body')[0].style.paddingRight = "0";
	callChat.classList.remove('invisible');
	callChat.classList.add('visible');
})

for (let i = 0; i < fstMessBot_Time.length; i++) {
	if (minutes < 10) {
		fstMessBot_Time[i].innerHTML = `${hours}:0${minutes}`;
	} else {
		fstMessBot_Time[i].innerHTML = `${hours}:${minutes}`;
	};
}

send_btn.addEventListener('click', newElement);

function newElement() {
	let inputValue = input.value;
	let dateTime = new Date(),
		hours = dateTime.getHours(),
		minutes = dateTime.getMinutes();

	if (inputValue == "") {
		alert("Введите вопрос");
	} else {
		let newElemUser = document.createElement('div');
		newElemUser.classList.add('user');
		let textUser = document.createTextNode(inputValue);
		newElemUser.appendChild(textUser);
		let timeSendUser = document.createElement('span');
		timeSendUser.classList.add('message-time');
		if (minutes < 10) {
			timeSendUser.innerHTML = `${hours}:0${minutes}`;
		} else {
			timeSendUser.innerHTML = `${hours}:${minutes}`;
		};
		newElemUser.appendChild(timeSendUser);
		chatArea.appendChild(newElemUser);

		let newElemBot = document.createElement('div');
		newElemBot.classList.add('bot');
		let textBot = document.createTextNode(generateTextBot(inputValue.toLowerCase()));
		newElemBot.appendChild(textBot);
		let timeSendBot = document.createElement('span');
		timeSendBot.classList.add('message-time')
		if (minutes < 10) {
			timeSendBot.innerHTML = `${hours}:0${minutes}`;
		} else {
			timeSendBot.innerHTML = `${hours}:${minutes}`;
		};
		newElemBot.appendChild(timeSendBot);
		chatArea.appendChild(newElemBot);

		chatArea.scrollTop = chatArea.scrollHeight;
		input.value = "";
	}
}

function generateTextBot(text) {
	if (text.includes('привет') || text.includes('прив') || text.includes('хай') || text.includes('hello') || text.includes('hi') || text.includes('добрый день') || text.includes('здарова') || text.includes('здравствуй') || text.includes('здраствуйте') || text.includes('привки') || text.includes('хей') || text.includes('hey')) {
		return "Привет!"
	} else if (text.includes('как дела') || text.includes('как ты') || text.includes('как поживаешь') || text.includes('как делишки') || text.includes('дела ') || text.includes('как жизнь') || text.includes('что по чем') || text.includes('че по чем')) {
		return "Все хорошо!"
	} else if (text.includes('плохо') || text.includes('так себе') || text.includes('грустно') || text.includes('не оч') || text.includes('мне') && text.includes('плохо') || text.includes('так') && text.includes('себе')) {
		return "Как? Все будет хорошо, я уверен!"
	} else if (text.includes('ты') && text.includes('где') || text.includes('где')) {
		return "Я у тебя дома)"
	} 
	/* предложение поговорить */
	else if (text.includes('давай') && text.includes('говор') || text.includes('разговор') || text.includes('поговорим')) {
		return "Давай! Ты можешь спросить у меня эти вопросы: Как дела? Чем можно заняться? Курс валют."
	}
	/* когда сделают сайт? */
	else if (text.includes('когда') && text.includes('сайт') || text.includes('сайт') && text.includes('готов') || text.includes('поговорим')) {
		return "Пока что сайт разрабатывают. Наши программисты очень стараются, они надеются, что вам все понравится! Нужно только немножко подождать.                                                            "
	} 
	
	/* ответ на спасибо */
	else if (text.includes('спасиб') || text.includes('спс') || text.includes('спосиб') || text.includes('благодарен')) {
		return "К вашим услугам!)"
	}
	
	// ответ на начальное сообщение.
	else if (text.includes('отдел') && text.includes('продаж') || text.includes('1')) {
		return "Отдел продаж приветствует вас!"
	} else if (text.includes('сервис') || text.includes('2')) {
		return "Сервис приветствует вас!"
	} else if (text.includes('бух') || text.includes('бухгалтер') || text.includes('3')) {
		return "Бухгалтерия приветствует вас!"
	} else {
		return "Я вас не понял, извините, я только учусь отвечать."
	}

}
