import MemosController from "./memosController.mjs";

class Commander {
  constructor(option, memoFilePath) {
    this.option = option;
    this.path = memoFilePath;
    this.controller = new MemosController(this.path);
  }

  run() {
    if (this.option.l) {
      this.controller.list();
    } else if (this.option.r) {
      this.controller.refer();
    } else if (this.option.d) {
      this.controller.delete();
    } else {
      this.controller.append();
    }
  }
}

export default Commander;
