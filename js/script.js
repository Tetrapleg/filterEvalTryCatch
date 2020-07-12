
let valuesArray = [];
const filterByType = (type, ...values) => {
  console.log(type, values);
  valuesArray = values.filter(value => typeof value === type);
  return valuesArray;
  },

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		hideAllResponseBlocks();
		document.querySelector(blockSelector).style.display = 'block';
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText;
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),

  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),

  tryFilterByType = (type, values) => {
    try {
      const valArr = Function(`filterByType('${type}', ${values})`);
      valArr();
      valuesArray = valuesArray.join(", ");
      const alertMsg = (valuesArray.length) ?
        `Данные с типом ${type}: ${valuesArray}` :
        `Отсутствуют данные типа ${type}`;
      showResults(alertMsg);
    } catch (e) {
      showError(`Ошибка: ${e}`);
    }
  };

const filterButton = document.querySelector('#filter-btn');

filterButton.addEventListener('click', e => {
	const typeInput = document.querySelector('#type');
	const dataInput = document.querySelector('#data');

	if (dataInput.value === '') {
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		showNoResults();
	} else {
		dataInput.setCustomValidity('');
		 e.preventDefault();console.log(typeInput.value.trim(), dataInput.value.trim());
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});