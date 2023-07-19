import enquirer from "enquirer";
import { promises as fs } from "fs";
import InputReader from "./inputReader.js";

class MemosData {
  constructor() {
    this.memoFilePath = "data/memos.json";
    this.inputReader = new InputReader();
  }

  async read() {
    try {
      const memosJSON = await fs.readFile(this.memoFilePath, "utf-8");
      return JSON.parse(memosJSON);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.#createEmptyData();
        return { memos: [] };
      } else {
        console.error("予期しないエラーが発生しました");
        throw error;
      }
    }
  }

  async append() {
    const inputtedMemos = await this.read();
    const newMemo = await this.#inputRead();

    inputtedMemos.memos.push(newMemo);
    this.#write(inputtedMemos);
    console.log("---書き込みが完了しました---");
  }

  async delete() {
    const inputtedMemos = await this.read();

    const prompt = new enquirer.Select({
      type: "select",
      title: "value",
      message: "Choose a memo you want to delete:",
      choices: inputtedMemos.memos,
      result() {
        return this.index;
      },
    });

    if (inputtedMemos.memos.length !== 0) {
      const selectedIndex = await prompt.run();
      inputtedMemos.memos.splice(selectedIndex, 1);
      this.#write(inputtedMemos);
      console.log("---削除が完了しました---");
    } else {
      console.log("メモがありません");
    }
  }

  async #createEmptyData() {
    const emptyDataJSON = JSON.stringify({ memos: [] });
    await fs.writeFile(this.memoFilePath, emptyDataJSON);
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

  async #write(inputtedMemos) {
    const memoDataJSON = JSON.stringify(inputtedMemos);
    await fs.writeFile(this.memoFilePath, memoDataJSON);
  }
}

export default MemosData;
