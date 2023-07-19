import enquirer from "enquirer";
import InputReader from "./inputReader.js";
import MemosData from "./memosData.js";

class MemosController {
  constructor() {
    this.inputReader = new InputReader();
    this.memosData = new MemosData();
  }

  async list() {
    const inputtedMemos = await this.memosData.read();

    if (inputtedMemos.memos.length === 0) {
      console.log("メモがありません");
    } else {
      inputtedMemos.memos.forEach((memo) => {
        console.log(memo.title);
      });
    }
  }

  async refer() {
    const inputtedMemos = await this.memosData.read();

    const prompt = new enquirer.Select({
      type: "select",
      title: "value",
      message: "Choose a memo you want to see:",
      choices: inputtedMemos.memos,
      result() {
        return this.focused.body;
      },
    });

    if (inputtedMemos.memos.length !== 0) {
      const memosBody = await prompt.run();
      console.log(memosBody);
    } else {
      console.log("メモがありません");
    }
  }
}

export default MemosController;
