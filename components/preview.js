export default class Preview {
	constructor(container, image) {
		this.container = document.querySelector(container);
		this.childs = this.container.querySelectorAll('li');
		this.image = document.querySelector(image);

		this.init();
		this.childs[0].classList.add('active');
	}

	init() {
		this.childs.forEach((child, i) => {
			child.addEventListener('mouseenter', () => {
				this.image.setAttribute('src', `img/preview-${i + 1}.jpg`);
				this.childs.forEach(item => item.classList.remove('active'))
				child.classList.add('active');
			})
		});
	}
}