import Slider from './components/slider.js';
import Preview from './components/preview.js';

window.addEventListener('DOMContentLoaded', () => {
	const modalPtotect = document.querySelector('.protect-modal');

	new Slider('.first-slider');
	new Slider('.second-slider');
	new Preview('.product-preview ul', '.product-preview__img');

	/**
	 * Установка слушателя события на крест в модальном окне
	 */

	modalPtotect.querySelector('.close').addEventListener('click', () => {
		modalPtotect.classList.add('hideme');
		localStorage.setItem('modalProtect', true);	//Запись в localStorage о том, что модальное окно было показано
	});

	//Показывать модальное окно только, если оно не было показано ранее
	if (!localStorage.getItem('modalProtect')) {
		setTimeout(() => {
			modalPtotect.classList.remove('hideme'); 
		}, 3000)
	}
})