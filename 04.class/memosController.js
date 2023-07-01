import enquirer from "enquirer";
import InputReader from "./inputReader.js";
import MemosData from "./memosData.js";

class MemosController {
  constructor() {
    this.inputReader = new InputReader();
    this.memosData = new MemosData();
  }

  async list() {
    const memoData = await this.memosData.read();
    if (memoData.memos.length === 0) {
      console.log("メモがありません");
    }
    memoData.memos.forEach((memo) => {
      const memosList = memo.memo.split("\n");
      console.log(memosList[0]);
    });
  }

  async refer() {
    const memoTitles = await this.#getMemo(this.memosData);
    const { Select } = enquirer;
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
    const memoTitles = await this.#getMemo(this.memosData);

    const { Select } = enquirer;
    const prompt = new Select({
      type: "select",
      name: "value",
      message: "Choose a memo you want to delete:",
      choices: memoTitles,
      result() {
        const number = this.index;
        return number;
      },
    });

    const number = await prompt.run();
    memoData.memos.splice(number, 1);
    this.memosData.write(memoData);
    console.log("---削除が完了しました---");
  }

  async append() {
    const memoData = await this.memosData.read();
    const newMemo = await this.#inputRead();
    memoData.memos.push(newMemo);
    this.memosData.write(memoData);
    console.log("---書き込みが完了しました---");
  }

  async #inputRead() {
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

  async #getMemo(memosData) {
    const memoData = await memosData.read();
    const memoTitles = memoData.memos.map((memo) => {
      return {
        name: memo.memo.split("\n")[0],
        body: memo.memo,
      };
    });
    if (memoData.memos.length === 0) {
      throw new Error("メモがありません");
    }
    return memoTitles;
  }
}

export default MemosController;
