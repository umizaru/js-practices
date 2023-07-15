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
      const memoFirstLines = memo.content.split("\n");
      console.log(memoFirstLines[0]);
    });
  }

  async refer() {
    const memosList = await this.#getMemos(this.memosData);

    const prompt = new enquirer.Select({
      type: "select",
      name: "value",
      message: "Choose a memo you want to see:",
      choices: memosList,
      result() {
        return this.focused.body;
      },
    });

    const memoBody = await prompt.run();
    console.log(memoBody);
  }

  async delete() {
    const memoData = await this.memosData.read();
    const memosList = await this.#getMemos(this.memosData);

    const prompt = new enquirer.Select({
      type: "select",
      name: "value",
      message: "Choose a memo you want to delete:",
      choices: memosList,
      result() {
        return this.index;
      },
    });

    const selectedIndex = await prompt.run();
    memoData.memos.splice(selectedIndex, 1);
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
      if (inputText.replace(/\s/g, "") === "") {
        console.error("文字を入力してください");
        process.exit(1);
      }
      const newMemo = {
        content: inputText,
      };
      return newMemo;
    } catch (error) {
      console.error("予期しないエラーが発生しました");
      throw error;
    }
  }

  async #getMemos(memosData) {
    const memoData = await memosData.read();
    const memosLists = memoData.memos.map((memo) => {
      return {
        name: memo.content.split("\n")[0],
        body: memo.content,
      };
    });
    if (memoData.memos.length === 0) {
      console.log("メモがありません");
    }
    return memosLists;
  }
}

export default MemosController;
