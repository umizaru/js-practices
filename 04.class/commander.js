const MemosController = require("./memosController.js");

class Commander {
  constructor(option, path) {
    this.option = option;
    this.path = path;
  }

  run() {
    if (this.option.l) {
      return new MemosController(this.path).list();
    }
    if (this.option.r) {
      return new MemosController(this.path).refer();
    }
    if (this.option.d) {
      return new MemosController(this.path).delete();
    }
    return new MemosController(this.path).append();
  }
}

module.exports = Commander;
