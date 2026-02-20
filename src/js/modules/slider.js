export default class Slider {
	constructor(page, btns) {
		this.page = document.querySelector(page),
		this.slides = Array.from(this.page.children),
		this.btns = document.querySelectorAll(btns),
		this.hanson = document.querySelector('.hanson'),
		this.slideIndex = 1;
	}

	showSlides(n) {
		if(n < 1) {
			this.slideIndex = this.slides.length;
		}

		if (n > this.slides.length) {
			this.slideIndex = 1;
		}

		this.hanson.style.display = 'none';
		this.hanson.classList.add('animated', 'fadeInUp');

		this.slides.forEach(slide => {
			slide.style.display = 'none';
			slide.classList.add('animated');
		});

		if(this.slideIndex === 3) {
			setTimeout(() => {
				this.hanson.style.display = 'block';
			}, 3000)
		}

		this.slides[this.slideIndex - 1].style.display = 'block';
	}

	plusSlides(n) {
		this.showSlides(this.slideIndex += n);
	}


	render() {
		this.btns.forEach(btn => {
			btn.addEventListener('click', () => {
				this.plusSlides(1);
			})

			btn.parentNode.previousElementSibling.addEventListener('click', (e) => {
				e.preventDefault();
				this.slideIndex = 1;
				this.showSlides(this.slideIndex);
			})
		})

		this.showSlides(this.slideIndex);
	}
}