/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/difference.js"
/*!**************************************!*\
  !*** ./src/js/modules/difference.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Difference)
/* harmony export */ });
class Difference {
  constructor(oldOfficer, newOfficer, items) {
    try {
      this.oldOfficer = document.querySelector(oldOfficer), this.newOfficer = document.querySelector(newOfficer), this.oldItems = this.oldOfficer.querySelectorAll(items), this.newItems = this.newOfficer.querySelectorAll(items), this.oldCounter = 0, this.newCounter = 0;
    } catch (e) {}
  }
  bindTriggers(parent, counter, items) {
    parent.querySelector('.plus').addEventListener('click', () => {
      if (counter !== items.length - 2) {
        items[counter].classList.add('fadeInDown');
        items[counter].style.display = 'flex';
        counter++;
      } else {
        items[items.length - 1].remove();
        items[counter].classList.add('fadeInDown');
        items[counter].style.display = 'flex';
      }
    });
  }
  hideItems(items) {
    items.forEach((item, i, arr) => {
      if (i !== arr.length - 1) {
        item.style.display = 'none';
        item.classList.add('animated');
      }
    });
  }
  init() {
    try {
      this.hideItems(this.oldItems);
      this.hideItems(this.newItems);
      this.bindTriggers(this.oldOfficer, this.oldCounter, this.oldItems);
      this.bindTriggers(this.newOfficer, this.newCounter, this.newItems);
    } catch (e) {}
  }
}

/***/ },

/***/ "./src/js/modules/download.js"
/*!************************************!*\
  !*** ./src/js/modules/download.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Download)
/* harmony export */ });
class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }
  downloadItem(path) {
    const link = document.createElement('a');
    link.setAttribute('href', path);
    link.setAttribute('download', 'nice_pic');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  init() {
    this.btns.forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}

/***/ },

/***/ "./src/js/modules/forms.js"
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Form)
/* harmony export */ });
class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Мы скоро с вами свяжемся!',
      failure: 'Что-то пошло не так...'
    };
    this.path = {
      question: 'assets/question.php'
    };
    this.inputs = document.querySelectorAll('input');
  }
  clearInputs() {
    this.inputs.forEach(item => {
      item.value = '';
    });
  }
  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[name="email"]');
    mailInputs.forEach(input => {
      input.addEventListener('input', e => {
        if (e.target.value.match(/[^a-z 0-9 @ \.]/ig)) {
          e.target.value = '';
        }
        ;
      });
      input.addEventListener('keypress', function (e) {
        if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
          e.preventDefault();
        }
      });
    });
  }
  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    };
    function createMask(event) {
      let matrix = '+1 (___) __-___',
        i = 0,
        def = matrix.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });
      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach(input => {
      input.addEventListener('input', createMask);
      input.addEventListener('keypress', createMask);
      input.addEventListener('focus', createMask);
      input.addEventListener('blur', createMask);
    });
  }
  async postData(url, data) {
    let res = await fetch(url, {
      method: 'POST',
      body: data
    });
    return await res.text();
  }
  init() {
    this.checkMailInputs();
    this.initMask();
    this.forms.forEach(item => {
      item.addEventListener('submit', e => {
        e.preventDefault();
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `
					margin-top: 15px;
					font-size: 18px;
					color: grey; 
				`;
        item.parentNode.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;
        const formData = new FormData(item);
        this.postData(this.path.question, formData).then(res => {
          console.log(res);
          statusMessage.textContent = this.message.success;
        }).catch(res => {
          statusMessage.textContent = this.message.failure;
        }).finally(res => {
          this.clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 4000);
        });
      });
    });
  }
}

/***/ },

/***/ "./src/js/modules/playVideo.js"
/*!*************************************!*\
  !*** ./src/js/modules/playVideo.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlayVideo)
/* harmony export */ });
class PlayVideo {
  constructor(triggers, overlay) {
    this.triggers = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }
  bindTriggers() {
    this.triggers.forEach((item, i) => {
      try {
        const blockedBlock = item.closest('.module__video-item').nextElementSibling;
        if (i % 2 == 0) {
          blockedBlock.setAttribute('data-disabled', 'true');
        }
      } catch (e) {}
      item.addEventListener('click', () => {
        if (!item.closest('.module__video-item') || item.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
          this.activeBtn = item;
          if (this.path !== item.getAttribute('data-url')) {
            this.path = item.getAttribute('data-url');
            this.createVideoPlayer(this.path);
            console.log(this.player);
            if (this.player && this.player.loadVideoById) {
              this.player.loadVideoById({
                'videoId': this.path
              });
            }
          } else {
            this.path = item.getAttribute('data-url');
            this.createVideoPlayer(this.path);
          }
        }
      });
    });
  }
  bindCloseTrigger() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      this.player.stopVideo();
    });
  }
  createVideoPlayer(url) {
    if (!this.player) {
      this.player = new YT.Player('frame', {
        height: '100%',
        width: '100%',
        videoId: `${url}`,
        playerVars: {
          'playsinline': 1
        },
        events: {
          onReady: event => {
            this.player = event.target;
          },
          'onStateChange': this.onPlayerStateChange
        }
      });
    }
    this.overlay.style.display = 'flex';
  }
  onPlayerStateChange(state) {
    try {
      const blockedBlock = this.activeBtn.closest('.module__video-item').nextElementSibling;
      const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
      if (state.data === 0) {
        if (blockedBlock.querySelector('.play__circle').classList.contains('closed')) {
          blockedBlock.querySelector('.play__circle').classList.remove('closed');
          blockedBlock.querySelector('svg').remove();
          blockedBlock.querySelector('.play__circle').appendChild(playBtn);
          blockedBlock.querySelector('.play__text').classList.remove('attention');
          blockedBlock.querySelector('.play__text').textContent = 'play video';
          blockedBlock.style.opacity = 1;
          blockedBlock.style.filter = 'none';
          blockedBlock.setAttribute('data-disabled', 'false');
        }
      }
    } catch (e) {}
  }
  init() {
    console.log(this.player);
    if (this.triggers.length > 0) {
      const tag = document.createElement('script');
      tag.src = "http://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      this.bindTriggers();
      this.bindCloseTrigger();
    }
  }
}

/***/ },

/***/ "./src/js/modules/showInfo.js"
/*!************************************!*\
  !*** ./src/js/modules/showInfo.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShowInfo)
/* harmony export */ });
class ShowInfo {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
  }
  init() {
    this.btns.forEach(item => {
      item.addEventListener('click', () => {
        const sibling = item.closest('.module__info-show').nextElementSibling;
        sibling.classList.add('animated');
        sibling.classList.toggle('msg');
        sibling.classList.toggle('fadeInDown');
        sibling.style.marginTop = '20px';
      });
    });
  }
}

/***/ },

/***/ "./src/js/modules/slider/slider-main.js"
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-main.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MainSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MainSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(btns) {
    super(btns);
  }
  showSlides(n) {
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    try {
      this.hanson.style.display = 'none';
      this.hanson.classList.add('animated', 'fadeInUp');
    } catch (e) {}
    Array.from(this.slides).forEach(slide => {
      slide.style.display = 'none';
      slide.classList.add('animated');
    });
    if (this.slideIndex === 3) {
      setTimeout(() => {
        try {
          this.hanson.style.display = 'block';
        } catch (e) {}
      }, 3000);
    }
    this.slides[this.slideIndex - 1].style.display = 'block';
  }
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  bindTriggers() {
    this.btns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.plusSlides(1);
      });
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.prevModule.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        this.plusSlides(-1);
      });
    });
    this.nextModule.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        this.plusSlides(1);
      });
    });
  }
  render() {
    if (this.container) {
      this.showSlides(this.slideIndex);
      this.bindTriggers();
    }
  }
}

/***/ },

/***/ "./src/js/modules/slider/slider-mini.js"
/*!**********************************************!*\
  !*** ./src/js/modules/slider/slider-mini.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MiniSlider)
/* harmony export */ });
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./src/js/modules/slider/slider.js");

class MiniSlider extends _slider__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(container, prev, next, activeSlide, animate, autoplay) {
    super(container, prev, next, activeSlide, animate, autoplay);
  }
  decorizeSlides() {
    Array.from(this.slides).forEach(slide => {
      slide.classList.remove(this.activeSlide);
      if (this.animate) {
        slide.querySelector('.card__title').style.opacity = 0.4;
        slide.querySelector('.card__controls-arrow').style.opacity = 0;
      }
    });
    this.slides[0].classList.add(this.activeSlide);
    if (this.animate) {
      this.slides[0].querySelector('.card__title').style.opacity = 1;
      this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
    }
  }
  nextSlide() {
    if (this.prev.parentNode === this.container) {
      this.container.insertBefore(this.slides[0], this.prev);
    } else {
      this.container.appendChild(this.slides[0]);
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
      for (let i = this.slides.length - 1; i > 0; i--) {
        if (this.slides[i].tagName !== 'BUTTON') {
          const active = this.slides[i];
          this.container.insertBefore(active, this.slides[0]);
          this.decorizeSlides();
        }
      }
    });
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
      if (this.autoplay) {
        this.initAutoplay();
      }
    } catch (e) {}
  }
}
;

/***/ },

/***/ "./src/js/modules/slider/slider.js"
/*!*****************************************!*\
  !*** ./src/js/modules/slider/slider.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor({
    container = null,
    btns = null,
    prev = null,
    next = null,
    prevModule = null,
    nextModule = null,
    activeSlide = '',
    animate,
    autoplay
  } = {}) {
    this.container = document.querySelector(container);
    try {
      this.slides = this.container.children;
    } catch (e) {}
    this.btns = document.querySelectorAll(btns), this.prev = document.querySelector(prev), this.next = document.querySelector(next), this.prevModule = document.querySelectorAll(prevModule), this.nextModule = document.querySelectorAll(nextModule), this.hanson = document.querySelector('.hanson'), this.activeSlide = activeSlide, this.animate = animate, this.autoplay = autoplay;
    this.slideIndex = 1;
  }
}

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider/slider-main */ "./src/js/modules/slider/slider-main.js");
/* harmony import */ var _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/slider/slider-mini */ "./src/js/modules/slider/slider-mini.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");
/* harmony import */ var _modules_difference__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/difference */ "./src/js/modules/difference.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/showInfo */ "./src/js/modules/showInfo.js");
/* harmony import */ var _modules_download__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/download */ "./src/js/modules/download.js");







window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.page',
    btns: '.next'
  });
  slider.render();
  const modulesPageSlider = new _modules_slider_slider_main__WEBPACK_IMPORTED_MODULE_0__["default"]({
    container: '.moduleapp',
    btns: '.next',
    prevModule: '.prevmodule',
    nextModule: '.nextmodule'
  });
  modulesPageSlider.render();
  const showUpSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.showup__content-slider',
    prev: '.showup__prev',
    next: '.showup__next',
    activeSlide: 'card-active',
    animate: true
  });
  showUpSlider.init();
  const modulesSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.modules__content-slider',
    prev: '.modules__info .slick-prev',
    next: '.modules__info .slick-next',
    activeSlide: 'card-active',
    animate: true,
    autoplay: true
  });
  modulesSlider.init();
  const feedSlider = new _modules_slider_slider_mini__WEBPACK_IMPORTED_MODULE_1__["default"]({
    container: '.feed__slider',
    prev: '.feed__slider .slick-prev',
    next: '.feed__slider .slick-next',
    activeSlide: 'feed__item-active'
  });
  feedSlider.init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"]('.showup .play', '.overlay').init();
  new _modules_playVideo__WEBPACK_IMPORTED_MODULE_2__["default"]('.module__video-item .play', '.overlay').init();
  new _modules_difference__WEBPACK_IMPORTED_MODULE_3__["default"]('.officerold', '.officernew', '.officer__card-item').init();
  new _modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"]('.form').init();
  new _modules_showInfo__WEBPACK_IMPORTED_MODULE_5__["default"]('.plus').init();
  new _modules_download__WEBPACK_IMPORTED_MODULE_6__["default"]('.download').init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map