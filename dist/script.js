/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    this.triggers = document.querySelectorAll(triggers), this.overlay = document.querySelector(overlay), this.close = this.overlay.querySelector('.close');
  }
  bindTriggers() {
    this.triggers.forEach(item => {
      item.addEventListener('click', () => {
        const path = item.getAttribute('data-url');
        this.createVideoPlayer(path);
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
        }
      });
    }
    this.overlay.style.display = 'flex';
  }
  init() {
    const tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    this.bindTriggers();
    this.bindCloseTrigger();
  }
}

/***/ },

/***/ "./src/js/modules/slider.js"
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Slider)
/* harmony export */ });
class Slider {
  constructor(page, btns) {
    this.page = document.querySelector(page), this.slides = Array.from(this.page.children), this.btns = document.querySelectorAll(btns), this.hanson = document.querySelector('.hanson'), this.slideIndex = 1;
  }
  showSlides(n) {
    if (n < 1) {
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
    if (this.slideIndex === 3) {
      setTimeout(() => {
        this.hanson.style.display = 'block';
      }, 3000);
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
      });
      btn.parentNode.previousElementSibling.addEventListener('click', e => {
        e.preventDefault();
        this.slideIndex = 1;
        this.showSlides(this.slideIndex);
      });
    });
    this.showSlides(this.slideIndex);
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
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/playVideo */ "./src/js/modules/playVideo.js");


window.addEventListener('DOMContentLoaded', () => {
  const slider = new _modules_slider__WEBPACK_IMPORTED_MODULE_0__["default"]('.page', '.next');
  slider.render();
  const playVideo = new _modules_playVideo__WEBPACK_IMPORTED_MODULE_1__["default"]('.showup .play', '.overlay');
  playVideo.init();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map