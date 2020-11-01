export default class StartPage {
  constructor(path) {
    this.path = path;
  }

  replacePage() {
    if (this.path !== window.location.pathname) {
      window.location.replace(this.Path);
    } else {
      window.location.reload();
    }
  }
}
