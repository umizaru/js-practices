const MemosController = require("./memosController.js");

class Commander {
  constructor(option, memoFilePath) {
    this.option = option;
    this.path = memoFilePath;
    this.controller = new MemosController(this.path);
  }

  run() {
    if (this.option.l) {
      this.controller.list();
    }
    if (this.option.r) {
      this.controller.refer();
    }
    if (this.option.d) {
      this.controller.delete();
    }
    this.controller.append();
  }
}

module.exports = Commander;
