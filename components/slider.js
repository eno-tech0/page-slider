export default class Slider {
	constructor(container) {
		this.containerSelector	= container;  																	//сохранение переданного селектора контейнера для получения дочерних элементов
		this.container				= document.querySelector(container); 									//контейнер слайдера
		this.slidesContainer		= this.container.querySelector('.slides'); 							//контейнер слайдов
		this.slides					= this.slidesContainer.querySelectorAll('.slide'); 				//слайды контейнера (с учетом дубликатов)
		this.nowSlide				= 0;																				//индекс текущего слайда
		this.width					= this.container.clientWidth;
		this.intervalId;																								//получение id интервала для остановки интервала

		this.init();																									//инициализация слайдера
	}

	init() {
		// this.slidesContainer.style.transform = `translateX(-${this.nowSlide * this.width}px)`;

		this.createPoint();																							//создание точек для переключения слайдов
		this.changeActivePoint(0);																					//установка активной точки
		this.bindListenerOnPoint(document.querySelector(`${this.containerSelector} .points`));	//привязка слушателя события клика на точки
		this.bindListenerOnHover();																				//остановка интервала при наведении мыши на слайд
		this.autoplay();																								//запуск автоматической смены слайдов
	}

	/**
	 * Создание точек для слайдера
	 */

	createPoint() {
		const points = document.createElement('div');
		points.classList.add('points');

		for (let i = 0; i < this.slides.length - 1; i++) {
			const point = document.createElement('div');
			point.classList.add('point');
			points.append(point);
		}

		this.container.append(points);
	}

	/**
	 * Слушатели событий
	 */

	bindListenerOnPoint(container) {
		const child = container.childNodes;

		for (let i = 0; i < child.length; i++) {
			child[i].addEventListener('click', () => this.render(i))
		}
	}

	bindListenerOnHover() {
		this.container.addEventListener('mouseenter', () => {
			clearInterval(this.intervalId);
		})

		this.container.addEventListener('mouseleave', () => {
			this.autoplay();
		})
	}

	/**
	 * Автовоспроизведение слайдов
	 */

	autoplay() {
		let count = this.nowSlide;

		this.intervalId = setInterval(() => {
			this.autoRender(count);
			count >= this.slides.length - 1 ? count = 1 : count++;
		}, 2000);
	}

	/**
	 * Смещение активного слайда
	 */

	render(n) {
		this.slidesContainer.style.transform = `translateX(-${n * this.width}px`;
		this.slidesContainer.style.transition = "transform .3s ease-in-out";

		this.nowSlide = n;																							//установка выбранного слайда в качестве текущего

		this.changeActivePoint(n);
	}

	/**
	 * Бесконечное перелистывание слайдов
	 */

	autoRender(n) {
		this.render(n)

		this.slidesContainer.style.transition = "transform .3s ease-in-out";
		this.slidesContainer.style.transform = `translateX(-${n * this.width}px`;

		this.slidesContainer.addEventListener('transitionend', () => {

			if (this.slides[n].id === "duplicat-first") {
				n = 0;

				this.slidesContainer.style.transition = "none";
				this.slidesContainer.style.transform = `translateX(-${n * this.width}px`;
			}
		});

		this.nowSlide = n;
	}

	/**
	 * Смена класса активности для точки с нидексом n
	 */

	changeActivePoint(n) {
		const points = document.querySelectorAll(`${this.containerSelector} .point`);					//получение всех точек текущего слайдера

		points.forEach(point => {
			point.classList.remove('active');																		//снятие со всех точек класса активности
		});

		n >= this.slides.length - 1 ? n = 0 : n;																	//смена точки при попадании на дубликат

		points[n].classList.add('active');																			//присвоение точки текущего слайда класса активности
	}

}
