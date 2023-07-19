import MemosController from "./memosController.js";
import MemosData from "./memosData.js";

class MemosCommander {
  constructor(option) {
    this.option = option;
    this.data = new MemosData();
    this.controller = new MemosController();
  }

  run() {
    if (this.option.l) {
      this.controller.list();
    } else if (this.option.r) {
      this.controller.refer();
    } else if (this.option.d) {
      this.data.delete();
    } else {
      this.data.append();
    }
  }
}

export default MemosCommander;
