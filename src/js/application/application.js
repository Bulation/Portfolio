export class Application {
  constructor(node) {
    this.node = node;
    this.activateListeners();
  }
  toggleMenuClasses(burger, nav) {
    burger.span.classList.toggle('burger-menu__item');
    burger.span.classList.toggle('burger-menu__item_close');
    nav.node.classList.toggle('navigation_active');
    this.node.classList.toggle('body_overlay');
  }
  activateListeners() {
    const burger = new Burger(this.node.querySelector('.burger-menu'));
    const nav = new Navigation(this.node.querySelector('.navigation'));
    burger.node.onclick = () => {
      this.toggleMenuClasses(burger, nav);
    }
    nav.node.onclick = (e) => {
      if (e.target.classList.contains('navigation__link')) {
        this.toggleMenuClasses(burger, nav);
      }
    }
    this.node.onclick = (e) => {
      if (!e.target.closest(".navigation") && burger.span.classList.contains('burger-menu__item_close') && !e.target.closest(".burger-menu")) {
        this.toggleMenuClasses(burger, nav);
      }
    }
  }
}
export class Burger {
  constructor(node) {
    this.node = node;
    this.span = node.querySelector('.burger-menu__item')
  }
}
export class Navigation {
  constructor(node) {
    this.node = node;
  }
}