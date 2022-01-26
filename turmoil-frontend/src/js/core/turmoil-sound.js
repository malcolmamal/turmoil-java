export const Sound = {
  playAudio(audio) {
    const sound = new Audio(window.turmoil.sounds[audio]);
    sound.load();
    const promise = sound.play();
  },
  playAudioLoop(audio, suffix) {
    const ident = `${audio}_${suffix}`;
    const sound = new Audio(window.turmoil.sounds[audio]);
    window.turmoil.soundLoops[ident] = sound;
    window.turmoil.soundLoops[`${ident}_loop`] = true;

    sound.load();
    sound.addEventListener('ended', function () {
      if (window.turmoil.soundLoops[`${ident}_loop`]) {
        this.currentTime = 0;
        window.turmoil.soundLoopsPromises[ident] = this.play();
      }
    }, false);

    window.turmoil.soundLoopsPromises[ident] = sound.play();
  },
  stopAudioLoop(audio, suffix) {
    const ident = `${audio}_${suffix}`;
    if (typeof (window.turmoil.soundLoops[ident]) !== 'undefined') {
      const sound = window.turmoil.soundLoops[ident];
      const playPromise = window.turmoil.soundLoopsPromises[ident];

      if (playPromise !== undefined) {
        playPromise.then((_) => {
          sound.pause();
        })
          .catch((error) => {
            console.log('sound pause catch', error);
          });
      }

      window.turmoil.soundLoops[ident] = null;
      window.turmoil.soundLoopsPromises[ident] = null;
      window.turmoil.soundLoops[`${ident}_loop`] = false;
    }
  },
};
