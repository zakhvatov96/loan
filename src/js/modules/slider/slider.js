export default class Slider {
	constructor({container = null, 
				 btns = null, 
				 prev = null, 
				 next = null,
				 activeSlide = '',
				 animate,
				 autoplay} = {}) {
		this.container = document.querySelector(container),
		this.slides = this.container.children,
		this.btns = document.querySelectorAll(btns),
		this.prev = document.querySelector(prev),
		this.next = document.querySelector(next),
		this.hanson = document.querySelector('.hanson'),
		this.activeSlide = activeSlide,
		this.animate = animate,
		this.autoplay = autoplay
		this.slideIndex = 1;
	}
}