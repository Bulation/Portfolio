export default class Video {
  constructor(container) {
    this.container = container;
    this.video = this.container.querySelector('.video');
    this.state = {
      volumeState: 0.5,
      videoTime: this.video.currentTime,
      videoDuration: this.video.duration || 0,
      videoPlaybackRate: 1,
    };
    this.control = this.container.querySelector('.video-control');
    this.videoBar = this.control.querySelector('.video-control__bar');
    this.volumeBar = this.control.querySelector('.video-control__volume-bar');
    this.bufferBar = this.control.querySelector('.video-control__buffer-bar');
    this.volumeButton = this.control.querySelector('.video-control__volume');
    this.smallPlayButton = this.control.querySelector('.video-control__play');
    this.settingsButton = this.control.querySelector('.video-control__settings');
    this.settings = this.control.querySelector('.video-control__time-speed-popup');
    this.settingsValuesContainer = this.control.querySelector('.video-control__time-speed-values');
    this.rateBtnChosen = this.settingsValuesContainer.querySelector('.video-control__time-speed-choosen');
    this.timeSpeedValue = this.control.querySelector('.video-control__time-speed-value');
    this.fullscreenButton = this.control.querySelector('.video-control__fullscreen');
    this.controlTime = this.control.querySelector('.video-control__current-time');
    this.controlDuration = this.control.querySelector('.video-control__duration');
    this.playButton = this.container.querySelector('.video__btn');
    this.barsState = new Map();
    this.barsState.set(this.videoBar, 0);
    this.barsState.set(this.volumeBar, this.getState('volumeState') * 100);
    this.timeout = setTimeout(() => this.control.classList.add('video-control_hide'), 3000);
    this.createLoad();
  }

  getTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = Math.round(time - (60 * minutes));
    if (seconds <= 9) {
      seconds = `0${seconds}`;
    }
    return [minutes, seconds];
  }

  defineTime() {
    if (Number.isNaN(this.video.duration) || Number.isNaN(this.video.currentTime)) {
      this.defineTime();
    }
    this.setState('videoDuration', this.video.duration);
    this.setState('videoTime', this.video.currentTime);
    this.initTime();
    this.initDuration();
  }

  initTime() {
    const time = this.getTime(this.getState('videoTime'));
    this.controlTime.textContent = `${time[0]}:${time[1]}`;
  }

  initDuration() {
    const time = this.getTime(this.getState('videoDuration'));
    this.controlDuration.textContent = `${time[0]}:${time[1]}`;
  }

  changeProgress() {
    this.barsState.forEach((value, bar) => {
      /* eslint-disable-next-line */
      bar.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${Math.round(value)}%, #EEEEEE33 ${Math.round(value)}%, #EEEEEE33 100%)`;
    });
  }

  setState(key, value) {
    this.state[key] = value;
  }

  getState(key) {
    return this.state[key];
  }

  setBarsState(key, value) {
    this.barsState.set(key, value);
  }

  getBarsState(key) {
    return this.barsState.get(key);
  }

  togglePlay(e) {
    if (!this.isVisible()) {
      return;
    }
    e.preventDefault();
    if (e.keyCode !== 32 && e.keyCode !== 75 && e.type !== 'click') {
      return;
    }
    if (this.video.paused) {
      this.video.play();
    } else {
      this.video.pause();
    }
    this.hideButtons();
    this.hidingControl();
  }

  hideButtons() {
    this.playButton.classList.toggle('video__btn_hide');
    this.smallPlayButton.classList.toggle('video-control__play_pause');
  }

  hidingControl() {
    this.control.classList.remove('video-control_hide');
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.control.classList.add('video-control_hide'), 3000);
  }

  updateTime() {
    this.video.currentTime = this.getState('videoTime');
    this.changeProgress();
  }

  updateVolume(e) {
    if (!this.isVisible()) {
      return;
    }
    if (this.getState('volumeState') === '0') {
      this.volumeButton.classList.add('video-control__volume_mute');
    } else {
      this.volumeButton.classList.remove('video-control__volume_mute');
    }
    if (e.keyCode === 38 && this.getState('volumeState') <= 0.95) {
      this.setState('volumeState', +this.getState('volumeState') + 0.05);
      this.hidingControl();
    }
    if (e.keyCode === 40 && this.getState('volumeState') >= 0.05) {
      this.setState('volumeState', this.getState('volumeState') - 0.05);
      this.hidingControl();
    }
    this.video.volume = this.getState('volumeState');
    this.volumeBar.value = this.getState('volumeState');
    this.setBarsState(this.volumeBar, this.getState('volumeState') * 100);
    this.changeProgress();
  }

  updateBuffer() {
    const buffer = this.video.buffered;
    for (let i = 0; i < buffer.length; i += 1) {
      if (buffer.start(buffer.length - 1 - i) < this.getState('videoTime')) {
        this.bufferBar.style.width = `${Math.round((buffer.end(buffer.length - 1 - i) / this.getState('videoDuration')) * 100)}%`;
        break;
      }
    }
  }

  muteSound(e) {
    if (!this.isVisible()) {
      return;
    }
    if (e.keyCode !== 77 && e.type !== 'click') {
      return;
    }
    if (this.getState('volumeState') === '0') {
      this.setState('volumeState', this.previousVolumeState);
    } else {
      this.previousVolumeState = this.getState('volumeState');
      this.setState('volumeState', '0');
    }
    this.updateVolume(e);
    this.hidingControl();
  }

  setDefaultValues() {
    this.smallPlayButton.classList.remove('video-control__play_pause');
    this.playButton.classList.remove('video__btn_hide');
    this.control.classList.remove('video-control_hide');
    this.barsState.set(this.videoBar, 0);
    this.changeProgress();
  }

  toggleFullScreen(e) {
    if (!this.isVisible()) {
      return;
    }
    if (e.keyCode !== 70 && e.type !== 'click') {
      return;
    }
    if (!document.fullscreenElement) {
      this.container.requestFullscreen();
    } else if (document.fullscreenEnabled) {
      document.exitFullscreen();
    }
    this.fullscreenButton.classList.toggle('video-control__fullscreen_exit');
  }

  isVisible() {
    return this.video.getBoundingClientRect().top < window.innerHeight
      && this.video.getBoundingClientRect().bottom > 0;
  }

  changePlayBackRate(e) {
    if (!this.isVisible()) {
      return;
    }
    if (e.keyCode === 190 && this.getState('videoPlaybackRate') < 2) {
      this.setState('videoPlaybackRate', this.getState('videoPlaybackRate') + 0.25);
      this.createSpeed(this.getState('videoPlaybackRate'));
    } else if (e.keyCode === 188 && this.getState('videoPlaybackRate') > 0.25) {
      this.setState('videoPlaybackRate', this.getState('videoPlaybackRate') - 0.25);
      this.createSpeed(this.getState('videoPlaybackRate'));
    } else if (e.type === 'click') {
      this.setState('videoPlaybackRate', e.target.dataset.value);
    } else {
      return;
    }
    this.rateBtnChosen.classList.toggle('video-control__time-speed-choosen');
    this.timeSpeedValue.textContent = this.getState('videoPlaybackRate');
    this.rateBtnChosen = this.settingsValuesContainer.querySelector(`[data-value='${this.getState('videoPlaybackRate')}']`);
    this.rateBtnChosen.classList.toggle('video-control__time-speed-choosen');
    this.hidingControl();
    this.video.playbackRate = this.getState('videoPlaybackRate');
  }

  createSpeed(playbackRate) {
    const speed = document.createElement('div');
    speed.innerHTML = `${playbackRate}x`;
    this.container.append(speed);
    speed.classList.add('video-control__speed');
    speed.classList.add('video-control__speed_animate');
    setTimeout(() => {
      speed.remove();
    }, 1000);
  }

  createLoad() {
    this.load = document.createElement('div');
    this.load.className = 'video__load';
  }

  appendLoad() {
    this.container.append(this.load);
  }

  removeLoad() {
    this.load.remove();
  }

  transitionToStartOrToFinish(e) {
    if (!this.isVisible()) {
      return;
    }
    if (e.keyCode === 36 || e.keyCode === 48) {
      this.setState('videoTime', 0);
      this.video.currentTime = this.getState('videoTime');
      this.togglePlay(e);
    }
    if (e.keyCode === 35) {
      this.video.currentTime = this.getState('videoDuration');
    }
  }

  skipTime(e) {
    if (!this.isVisible()) {
      return;
    }
    if (e.keyCode === 74) {
      this.video.currentTime = this.getState('videoTime') - 10;
    }
    if (e.keyCode === 76) {
      this.video.currentTime = this.getState('videoTime') + 10;
    }
    if (e.keyCode === 39) {
      this.video.currentTime = this.getState('videoTime') + 5;
    }
    if (e.keyCode === 37) {
      this.video.currentTime = this.getState('videoTime') - 5;
    }
    this.hidingControl();
  }

  transitionToPartOfVideo(e) {
    if (e.keyCode >= 48 && e.keyCode <= 57 && this.isVisible()) {
      this.video.currentTime = (this.getState('videoDuration') / 10) * e.key;
      this.hidingControl();
    }
  }
}
