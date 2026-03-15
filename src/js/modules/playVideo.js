export default class PlayVideo {
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

				if(i % 2 == 0) {
					blockedBlock.setAttribute('data-disabled', 'true');
				}
			} catch(e){}

			item.addEventListener('click', () => {
				if(!item.closest('.module__video-item') || item.closest('.module__video-item').getAttribute('data-disabled') !== 'true') {
					this.activeBtn = item;
					if(this.path !== item.getAttribute('data-url')) {
						this.path = item.getAttribute('data-url');
						this.createVideoPlayer(this.path);
						console.log(this.player)
						if(this.player && this.player.loadVideoById) {
							this.player.loadVideoById({'videoId': this.path});
						}
					} else {
						this.path = item.getAttribute('data-url');
						this.createVideoPlayer(this.path);
					}	
				}
								
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
          },
		  events: {
       		 onReady: (event) => {
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

			if(state.data === 0) {
				if(blockedBlock.querySelector('.play__circle').classList.contains('closed')) {
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
		} catch(e){}
	}

	init() {
		console.log(this.player)
		if(this.triggers.length > 0) {
			const tag = document.createElement('script');
			tag.src = "http://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			this.bindTriggers();
			this.bindCloseTrigger();
		}
	  
	}
}