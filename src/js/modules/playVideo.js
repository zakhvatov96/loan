export default class PlayVideo {
	constructor(triggers, overlay) {
		this.triggers = document.querySelectorAll(triggers),
		this.overlay = document.querySelector(overlay),
		this.close = this.overlay.querySelector('.close');		
	}

	bindTriggers() {
		this.triggers.forEach(item => {
			item.addEventListener('click', () => {
				const path = item.getAttribute('data-url');
				this.createVideoPlayer(path);
			})
		})
	}

	bindCloseTrigger() {
		this.close.addEventListener('click', () => {
			this.overlay.style.display = 'none';
			this.player.stopVideo();
		})
	}

	createVideoPlayer(url) {
		if(!this.player) {
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