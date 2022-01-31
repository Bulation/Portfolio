export default class ThemeChanger {
  constructor(node, body) {
    this.theme = node;
    this.body = body;
  }

  changeTheme() {
    this.body.classList.toggle('dark-theme');
    this.body.classList.toggle('light-theme');
  }

  changeIcon() {
    this.theme.classList.toggle('theme-changer__sun');
    this.theme.classList.toggle('theme-changer__moon');
  }
}
