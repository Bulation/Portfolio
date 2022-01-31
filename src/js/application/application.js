import Video from '../assets/video';
import BurgerMenu from '../assets/burger';
import ImagesChanger from '../assets/portfolio';
import ThemeChanger from '../assets/theme';
import Translator from '../assets/translate';

export default class Application {
  constructor(node) {
    this.node = node;
    this.menu = new BurgerMenu(this.node.querySelector('.burger-menu'), this.node.querySelector('.navigation'), this.node);
    this.imagesChanger = new ImagesChanger(this.node.querySelector('.portfolio-container'));
    this.imagesChanger.setCountOfImages(6);
    this.imagesChanger.changeImages('winter');
    this.videoPlayer = new Video(this.node.querySelector('.video-player-container'));
    this.themeChanger = new ThemeChanger(this.node.querySelector('.theme-changer'), this.node);
    this.translator = new Translator(this.node.querySelectorAll('[data-i18n]'), this.node.querySelector('.langs'));
  }

  activateListeners() {
    this.node.onclick = (e) => {
      if (!e.target.closest('.navigation, .burger-menu') && this.menu.burger.classList.contains('burger-menu_active')) {
        this.menu.toggleMenuClasses();
      }
      if (!e.target.closest('.video-control__settings, .video-control__time-speed-values, .video-control__time-speed-popup, video-control__time-speed-values-exit') && this.videoPlayer.settings.classList.contains('video-control__time-speed-popup_active')) {
        this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');
      }
      if (!e.target.closest('.video-control__settings, .video-control__time-speed-values, .video-control__time-speed-popup, video-control__time-speed-values-exit') && this.videoPlayer.settingsValuesContainer.classList.contains('video-control__time-speed-values_active')) {
        this.videoPlayer.settingsValuesContainer.classList.toggle('video-control__time-speed-values_active');
      }
    };
    // menu
    this.menu.burger.onclick = () => {
      this.menu.toggleMenuClasses();
    };
    this.menu.nav.onclick = (e) => {
      if (e.target.classList.contains('navigation__link')) {
        this.menu.toggleMenuClasses();
      }
    };
    // video
    this.videoPlayer.video.oncanplay = () => {
      this.videoPlayer.defineTime();
      this.videoPlayer.videoBar.oninput = (e) => {
        this.videoPlayer.setBarsState(this.videoPlayer.videoBar, e.target.value);
        this.videoPlayer.setState('videoTime', (e.target.value / 100)
                                  * this.videoPlayer.state.videoDuration);
        this.videoPlayer.updateTime();
      };
      this.videoPlayer.volumeBar.oninput = (e) => {
        this.videoPlayer.setState('volumeState', e.target.value);
        this.videoPlayer.setBarsState(this.videoPlayer.volumeBar, this.videoPlayer.getState('volumeState') * 100);
        this.videoPlayer.updateVolume(e);
      };
      this.videoPlayer.video.onclick = (e) => {
        this.videoPlayer.togglePlay(e);
      };
      this.videoPlayer.video.onended = () => this.videoPlayer.setDefaultValues();
      this.videoPlayer.video.ontimeupdate = () => {
        this.videoPlayer.initTime();
        this.videoPlayer.setState('videoTime', this.videoPlayer.video.currentTime);
        this.videoPlayer.setBarsState(this.videoPlayer.videoBar, (this.videoPlayer.getState('videoTime')
          / this.videoPlayer.getState('videoDuration')) * 100);
        this.videoPlayer.changeProgress();
        this.videoPlayer.videoBar.value = this.videoPlayer.getBarsState(this.videoPlayer.videoBar);
      };
      this.videoPlayer.playButton.onclick = (e) => {
        this.videoPlayer.togglePlay(e);
      };
      this.videoPlayer.smallPlayButton.onclick = (e) => {
        this.videoPlayer.togglePlay(e);
      };
      this.videoPlayer.volumeButton.onclick = (e) => this.videoPlayer.muteSound(e);
      this.videoPlayer.fullscreenButton.onclick = (e) => {
        this.videoPlayer.toggleFullScreen(e);
      };
      this.videoPlayer.container.onmouseover = () => {
        if (!document.fullscreenElement) {
          this.videoPlayer.control.classList.remove('video-control_hide');
        }
      };
      this.videoPlayer.container.onmousemove = () => {
        if (document.fullscreenElement) {
          this.videoPlayer.hidingControl();
        }
      };
      this.videoPlayer.container.onmouseout = () => {
        if (!this.videoPlayer.video.paused) {
          this.videoPlayer.control.classList.add('video-control_hide');
        }
      };
      this.videoPlayer.video.onprogress = () => {
        this.videoPlayer.updateBuffer();
      };
      this.videoPlayer.video.onwaiting = () => {
        this.videoPlayer.appendLoad();
        this.videoPlayer.video.onplaying = () => {
          this.videoPlayer.removeLoad();
        };
        this.videoPlayer.video.onpause = () => {
          this.videoPlayer.removeLoad();
        };
      };
      this.videoPlayer.settingsButton.onclick = () => {
        this.videoPlayer.settingsButton.classList.toggle('video-control__settings_active');
        if (this.videoPlayer.settingsValuesContainer.classList.contains('video-control__time-speed-values_active')) {
          this.videoPlayer.settingsValuesContainer.classList.remove('video-control__time-speed-values_active');
        } else {
          this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');
        }
      };
      this.videoPlayer.settings.onclick = () => {
        this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');
        this.videoPlayer.settingsValuesContainer.classList.toggle('video-control__time-speed-values_active');
      };
      this.videoPlayer.settingsValuesContainer.onclick = (e) => {
        if (e.target.classList.contains('video-control__time-speed-values-exit')) {
          this.videoPlayer.settings.classList.toggle('video-control__time-speed-popup_active');
        }
        if (e.target.classList.contains('video-control__time-speed-btn')) {
          this.videoPlayer.changePlayBackRate(e);
        }
        this.videoPlayer.settingsValuesContainer.classList.toggle('video-control__time-speed-values_active');
      };
    };
    window.onkeydown = (e) => {
      this.videoPlayer.changePlayBackRate(e);
      this.videoPlayer.togglePlay(e);
      this.videoPlayer.updateVolume(e);
      this.videoPlayer.muteSound(e);
      this.videoPlayer.toggleFullScreen(e);
      this.videoPlayer.transitionToStartOrToFinish(e);
      this.videoPlayer.skipTime(e);
      this.videoPlayer.transitionToPartOfVideo(e);
    };
    // portfolio
    this.imagesChanger.buttons.onclick = (e) => {
      if (e.target.classList.contains('btn')) {
        this.imagesChanger.buttonActive.classList.toggle('seasons-list__season-btn_active');
        this.imagesChanger.buttonActive = e.target;
        this.imagesChanger.buttonActive.classList.toggle('seasons-list__season-btn_active');
        this.imagesChanger.changeImages(e.target.dataset.season);
      }
    };
    this.themeChanger.theme.onclick = () => {
      this.themeChanger.changeTheme();
      this.themeChanger.changeIcon();
    };
  }
}
