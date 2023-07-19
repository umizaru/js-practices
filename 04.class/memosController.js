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
      const memosTitleAndBody = await this.#getMemos(this.memosData);
      memosTitleAndBody.forEach((memo) => {
        console.log(memo.title);
      });
    }
  }

  async refer() {
    const memosTitleAndBody = await this.#getMemos(this.memosData);

    const prompt = new enquirer.Select({
      type: "select",
      title: "value",
      message: "Choose a memo you want to see:",
      choices: memosTitleAndBody,
      result() {
        return this.focused.body;
      },
    });

    if (memosTitleAndBody.length !== 0) {
      const memosBody = await prompt.run();
      console.log(memosBody);
    } else {
      console.log("メモがありません");
    }
  }

  async delete() {
    const inputtedMemos = await this.memosData.read();
    const memosTitleAndBody = await this.#getMemos(this.memosData);

    const prompt = new enquirer.Select({
      type: "select",
      title: "value",
      message: "Choose a memo you want to delete:",
      choices: memosTitleAndBody,
      result() {
        return this.index;
      },
    });

    if (memosTitleAndBody.length !== 0) {
      const selectedIndex = await prompt.run();
      inputtedMemos.memos.splice(selectedIndex, 1);
      this.memosData.write(inputtedMemos);
      console.log("---削除が完了しました---");
    } else {
      console.log("メモがありません");
    }
  }

  async append() {
    const inputtedMemos = await this.memosData.read();
    const newMemo = await this.#inputRead();

    inputtedMemos.memos.push(newMemo);
    this.memosData.write(inputtedMemos);
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
    const inputtedMemos = await memosData.read();
    const memosTitleAndBody = inputtedMemos.memos.map((memo) => {
      return {
        title: memo.content.split("\n")[0],
        body: memo.content,
      };
    });
    return memosTitleAndBody;
  }
}

export default MemosController;
