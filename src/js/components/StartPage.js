export default class StartPage {
  constructor(path) {
    this.path = path;
  }

  replacePage() {
    if (this.path !== window.location.pathname) {
      window.location.replace(this.Path);
      window.location.href = '../index.html';
    } else {
      window.location.reload();
    }
  }
}
