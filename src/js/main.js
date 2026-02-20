import Slider from "./modules/slider";
import PlayVideo from "./modules/playVideo";

window.addEventListener('DOMContentLoaded', () => {
	const slider = new Slider('.page', '.next');
	slider.render();

	const playVideo = new PlayVideo('.showup .play', '.overlay');
	playVideo.init();
});