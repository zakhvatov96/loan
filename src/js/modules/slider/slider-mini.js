import Slider from "./slider";

export default class MiniSlider extends Slider {
	constructor(container, prev, next, activeSlide, animate, autoplay) {
		super(container, prev, next, activeSlide, animate, autoplay);
	}

	decorizeSlides() {
		Array.from(this.slides).forEach(slide => {
			slide.classList.remove(this.activeSlide);
			if(this.animate) {
				slide.querySelector('.card__title').style.opacity = 0.4;
				slide.querySelector('.card__controls-arrow').style.opacity = 0;
			}
		});

		this.slides[0].classList.add(this.activeSlide);
		if(this.animate) {
			this.slides[0].querySelector('.card__title').style.opacity = 1;
			this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
		}
	}

	nextSlide() {
			if(this.prev.parentNode === this.container) {
				this.container.insertBefore(this.slides[0], this.prev)
			} else {
				this.container.appendChild(this.slides[0])
			}
			;
			this.decorizeSlides();
	}

	initAutoplay() {
		let play = setInterval(() => this.nextSlide(), 5000);

		this.container.addEventListener('mouseenter', () => {
			clearInterval(play);
		});

		this.container.addEventListener('mouseleave', () => {
			play = setInterval(() => this.nextSlide(), 5000);
		});
	}

	bindTriggers() {
		this.next.addEventListener('click', () => this.nextSlide());
		this.prev.addEventListener('click', () => {

			for(let i = this.slides.length - 1; i > 0; i--) {
				if(this.slides[i].tagName !== 'BUTTON') {
					const active = this.slides[i];
					this.container.insertBefore(active, this.slides[0]);
					this.decorizeSlides();
				}
			}

			
		})
	}

	init() {
		try {
			this.container.style.cssText = `
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			overflow: hidden;
		`;
		this.bindTriggers();
		this.decorizeSlides();

		if(this.autoplay) {
			this.initAutoplay();
		}
		} catch(e){}
	}

};