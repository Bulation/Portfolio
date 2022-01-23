export class Application {
  constructor(node) {
    this.node = node;
    this.menu = new BurgerMenu(this.node.querySelector('.burger-menu'), this.node.querySelector('.navigation'), this.node);
    this.menu.activateListeners();
  }
  activateBodyListeners() {
    this.node.onclick = (e) => {
      if (!e.target.closest(".navigation") && this.menu.burger.classList.contains('burger-menu_active') && !e.target.closest(".burger-menu")) {
        this.menu.toggleMenuClasses();
      }
    }
  }
}
export class BurgerMenu {
  constructor(burger, nav, parent) {
    this.burger = burger;
    this.nav = nav;
    this.parent = parent;
  }
  toggleMenuClasses() {
    this.burger.classList.toggle('burger-menu_active');
    this.nav.classList.toggle('navigation_active');
    if (!this.nav.classList.contains('navigation_active'))
      this.nav.classList.add('navigation_inactive');
    else
      this.nav.classList.remove('navigation_inactive');
    this.parent.classList.toggle('body_overlay');
  }
  activateListeners() {
    this.burger.onclick = () => {
      this.toggleMenuClasses();
    }
    this.nav.onclick = (e) => {
      if (e.target.classList.contains('navigation__link')) {
        this.toggleMenuClasses();
      }
    }
  }
}