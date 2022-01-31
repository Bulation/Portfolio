export default class BurgerMenu {
  constructor(burger, nav, parent) {
    this.burger = burger;
    this.nav = nav;
    this.parent = parent;
  }

  toggleMenuClasses() {
    this.burger.classList.toggle('burger-menu_active');
    this.nav.classList.toggle('navigation_active');
    if (!this.nav.classList.contains('navigation_active')) {
      this.nav.classList.add('navigation_inactive');
    } else {
      this.nav.classList.remove('navigation_inactive');
    }
    this.parent.classList.toggle('body_overlay');
  }
}
