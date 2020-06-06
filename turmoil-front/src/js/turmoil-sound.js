export let Sound = {
	playAudio: function (audio) {
		let sound = new Audio(window.turmoil.sounds[audio]);
		sound.load();
		let promise = sound.play();
	},
	playAudioLoop: function (audio, suffix) {
		let ident = audio + '_' + suffix;
		let sound = new Audio(window.turmoil.sounds[audio]);
		window.turmoil.soundLoops[ident] = sound;
		window.turmoil.soundLoops[ident + '_loop'] = true;

		sound.load();
		sound.addEventListener('ended', function() {
			if (window.turmoil.soundLoops[ident + '_loop'])
			{
				this.currentTime = 0;
				window.turmoil.soundLoopsPromises[ident] = this.play();
			}
		}, false);

		window.turmoil.soundLoopsPromises[ident] = sound.play();
	},
	stopAudioLoop: function (audio, suffix) {
		let ident = audio + '_' + suffix;
		if (typeof(window.turmoil.soundLoops[ident]) != 'undefined')
		{
			let sound = window.turmoil.soundLoops[ident];
			let playPromise = window.turmoil.soundLoopsPromises[ident];

			if (playPromise !== undefined) {
				playPromise.then(_ => {
					sound.pause();
				})
					.catch(error => {
						console.log("sound pause catch", error);
					});
			}

			window.turmoil.soundLoops[ident] = null;
			window.turmoil.soundLoopsPromises[ident] = null;
			window.turmoil.soundLoops[ident + '_loop'] = false;
		}
	}
}
