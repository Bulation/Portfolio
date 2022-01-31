export default class ImagesChanger {
  constructor(container) {
    this.container = container;
    this.buttons = this.container.querySelector('.seasons-list');
    this.buttonActive = this.buttons.querySelector('.seasons-list__season-btn_active');
    this.imagesContainer = this.container.querySelector('.photos');
    this.images = {};
  }

  async changeImages(season) {
    this.destroyImages();
    if (this.images[season] === undefined) {
      this.images[season] = await this.setImagesFromGithub(season);
    }
    this.images[season].forEach((img) => {
      this.imagesContainer.append(img);
    });
  }

  destroyImages() {
    while (this.imagesContainer.firstChild) {
      this.imagesContainer.firstChild.remove();
    }
  }

  async setImagesFromGithub(season) {
    let arr = [];
    const length = this.getCountOfImages();
    for (let i = 1; i <= length; i += 1) {
      arr.push(new Promise((resolve) => {
        fetch(`https://raw.githubusercontent.com/rolling-scopes-school/file-storage/portfolio/assets/img/${season}/${i}.jpg`).then((response) => response.blob()).then((res) => resolve(res));
      }));
    }
    arr = await Promise.all(arr);
    for (let i = 0; i < length; i += 1) {
      arr[i] = this.createImg(arr[i]);
    }
    return arr;
  }

  createImg(blob) {
    const img = new Image();
    img.src = URL.createObjectURL(blob);
    img.classList.add('photos__photo');
    return img;
  }

  getCountOfImages() {
    return this.imagesCount;
  }

  setCountOfImages(count) {
    this.imagesCount = count;
  }
}
