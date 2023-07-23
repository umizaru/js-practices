import enquirer from "enquirer";
import InputReader from "./inputReader.js";
import MemosData from "./memosData.js";

class MemosController {
  constructor() {
    this.inputReader = new InputReader();
    this.memosData = new MemosData();
  }

  async list() {
    const memos = await this.memosData.read();

    if (memos.length === 0) {
      console.log("メモがありません");
      return;
    }

    memos.forEach((memo) => {
      console.log(memo.title);
    });
  }

  async refer() {
    const memos = await this.memosData.read();

    if (memos.length === 0) {
      console.log("メモがありません");
      return;
    }

    const prompt = new enquirer.Select({
      type: "select",
      title: "value",
      message: "Choose a memo you want to see:",
      choices: memos,
      result() {
        return this.focused.body;
      },
    });

    const memoBody = await prompt.run();
    console.log(memoBody);
  }

  async delete() {
    const memos = await this.memosData.read();

    if (memos.length === 0) {
      console.log("メモがありません");
      return;
    }

    const prompt = new enquirer.Select({
      type: "select",
      title: "value",
      message: "Choose a memo you want to delete:",
      choices: memos,
      result() {
        return this.index;
      },
    });

    const selectedIndex = await prompt.run();
    this.memosData.delete(selectedIndex);
    console.log("---削除が完了しました---");
  }

  async append() {
    const newMemo = await this.#inputRead();
    await this.memosData.append(newMemo);
    console.log("---書き込みが完了しました---");
  }

  async #inputRead() {
    try {
      const inputText = await this.inputReader.read();
      if (inputText.replace(/\s/g, "") === "") {
        console.error("文字を入力してください");
        process.exit(1);
      }
      const newMemo = {
        title: inputText.split("\n")[0],
        body: inputText,
      };
      return newMemo;
    } catch (error) {
      console.error("予期しないエラーが発生しました");
      throw error;
    }
  }
}

export default MemosController;
