import pkg from "enquirer";
const { Select } = pkg;
import InputReader from "./inputReader.js";
import memosData from "./memosData.js";

class MemosController {
  constructor(path) {
    this.inputReader = new InputReader();
    this.memosData = new memosData(path);
  }

  async input() {
    try {
      const inputText = await this.inputReader.read();
      const newMemo = {
        memo: inputText,
      };
      return newMemo;
    } catch (err) {
      console.error("文字を入力してください");
      process.exit(1);
    }
  }

  async append() {
    const memoData = await this.memosData.read();
    const newMemo = await this.input();
    memoData.memos.push(newMemo);
    this.memosData.write(memoData);
    console.log("---書き込みが完了しました---");
  }

  async list() {
    const memoData = await this.memosData.read();
    if (memoData.memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    memoData.memos.forEach((memo) => {
      const memosList = memo.memo.split("\n");
      console.log(memosList[0]);
    });
  }

  async refer() {
    const memoData = await this.memosData.read();
    const memoTitles = memoData.memos.map((memo) => {
      return {
        name: memo.memo.split("\n")[0],
        body: memo.memo,
      };
    });
    if (memoData.memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    const prompt = new Select({
      type: "select",
      name: "value",
      message: "Choose a memo you want to see:",
      choices: memoTitles,
      result() {
        return this.focused.body;
      },
    });
    const memoText = await prompt.run();
    console.log(memoText);
  }

  async delete() {
    const memoData = await this.memosData.read();
    const memoTitles = memoData.memos.map((memo) => {
      return {
        name: memo.memo.split("\n")[0],
        body: memo.memo,
      };
    });
    if (memoData.memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    const prompt = new Select({
      type: "select",
      name: "value",
      message: "Choose a memo you want to delete:",
      choices: memoTitles,
      result() {
        let number = this.index;
        return number;
      },
    });
    let number = await prompt.run();
    memoData.memos.splice(number, 1);
    this.memosData.write(memoData);
    console.log("---削除が完了しました---");
  }
}
export default MemosController;
