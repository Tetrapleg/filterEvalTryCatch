const filterByType = (type, ...values) => values.filter(value => typeof value === type), //присваиваем константе функцию filterByType которая при запуске получает аргументы type и последующими аргументами, собранными припомощи рест-параметра (...) в массив values, затем функция создаёт новый массив, перебирая элементы массива values, и поещает в него те значения, тип данных которых равен аргументу 

	hideAllResponseBlocks = () => { //присваиваем константе функцию hideAllResponseBlocks
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); //создаём константу responseBlocksArray и передаём ей массив, созданный из псевдомассива полученных со страницы элементов div с классом '.dialog__response-block'
		responseBlocksArray.forEach(block => block.style.display = 'none'); //перебираем с помощью цикла forEach все элементы полученного массива и задаём им стиль display = 'none' (убираем с видимой страницы)
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { //присваиваем константе функцию showResponseBlock которая при запуске получает аргументы
		hideAllResponseBlocks(); //запускаем функцию
		document.querySelector(blockSelector).style.display = 'block'; //получаем со страницы элемент по селектору, полученным при запуске blockSelector, и задаём ему стиль display = 'block' (выводим на видимую страницу)
		if (spanSelector) { //проверяем условие, что аргумент spanSelector получен
			document.querySelector(spanSelector).textContent = msgText; //если spanSelector получен, получаем со страницы элемент по селектору spanSelector и присваивае ему текст из аргумента msgText
		} //заканчиваем проверкуgit add
	}, //выходим из функции

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), //присваиваем константе функцию showError запускающую функцию  showResponseBlock и передающую в неё в качестве аргументов класс'..dialog__response-block_error', свой аргумент, полученный при запуск msgText, идентификатор'#error')

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), //присваиваем константе функцию showResults запускающую функцию  showResponseBlock и передающую в неё в качестве аргументов класс'.dialog__response-block_ok', свой аргумент, полученный при запуск msgText, идентификатор'#ok')

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), //присваиваем константе функцию showNoResults, запускающую функцию showResponseBlock и передающую в неё аргументом класс'.dialog__response-block_no-results'

	tryFilterByType = (type, values) => { //присваиваем константе функцию tryFilterByType, которая при запуске (строка 46) получает аргументы type = values typeInput.value.trim() и values = dataInput.value.trim()
		try { //запускаем конструкцию try…catch
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //создаём константу valuesArray и присваиваем ей результат - полученный из функции filterByType (запущенной с помощью  метода eval из последующей строки и переданными ей при запуске аргументами, полученными самой ф-цией tryFilterByTypeпри запуске) массив, с помощью метода  преобразованный в строку
			const alertMsg = (valuesArray.length) ? //создайм константу alertMsg и присваиваем ей значение, получаемое в результате проверки на ноль с помощью тернарного оператора длины строки valuesArray 
				`Данные с типом ${type}: ${valuesArray}` : //если не ноль, alertMsg равен даму значению (строке)
				`Отсутствуют данные типа ${type}`; //если ноль, alertMsg равен даму значению (строке)
			showResults(alertMsg); //запускаем фнкцию showResults с аргументом alertMsg
		} catch (e) { //в случае ошибки в блоке кода try запускаем код ниже, аргумент е - ошибка, возникшая в блоке try
			showError(`Ошибка: ${e}`); //запускаем функцию showError с аргументом `Ошибка: ${e}`
		} //выходим из конструкции try…catch
	}; //выходим из ф-ции tryFilterByType

const filterButton = document.querySelector('#filter-btn');  //получаем элемент (кнопка "Фильтровать") со страницы по id

filterButton.addEventListener('click', e => {  //вешаем на полученную кнопку слушатель отслеживающий клик по ней, после чего запускается функция, в которую передаётся евент
	const typeInput = document.querySelector('#type'); //получаем со страницы селект выбора типа данных в диалоговом окне
	const dataInput = document.querySelector('#data'); //получаем инпут, в который мы вводим данные для фильтрации

	if (dataInput.value === '') { //проверяем условие не осталось ли поле с вводимыми для фильтрации данными пустым после нажатия кнопки фильтр
		dataInput.setCustomValidity('Поле не должно быть пустым!'); //выводим сообщение, если поле пустое
		showNoResults(); //запускаем функцию и заканчиваем проверку
	} else { //если поле с вводимыми данными не пустое, выполняем далььнейшие действия
		dataInput.setCustomValidity(''); //оставляем данные, введённе для проверки 
		 e.preventDefault(); //убираем стандартные события при нажатии кнопки (в данном случае обновление страницы)
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //запускаем функцию и передаём ей аргументы (1. данные из селекта, где мы выбираем на какой тип данных будем проверять, предварительно убрав пробелы в начале и конце 2. строку с данными, которые мы бубем проверять, так же удаляем пробелы в начале и конце строки)
	} //выходим из проверки
}); //выходим из функции слушателя

