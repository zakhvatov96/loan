export default class ShowInfo {
	constructor(triggers) {
		this.btns = document.querySelectorAll(triggers)
	}

	init() {
		this.btns.forEach(item => {
			item.addEventListener('click', () => {
				const sibling = item.closest('.module__info-show').nextElementSibling;

				sibling.classList.add('animated');
				sibling.classList.toggle('msg');
				sibling.classList.toggle('fadeInDown');
				sibling.style.marginTop = '20px';
			})
		})
	}
}