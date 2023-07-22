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

  async delete(inputtedMemos, selectedIndex) {
    if (inputtedMemos.memos.length !== 0) {
      inputtedMemos.memos.splice(selectedIndex, 1);
      this.#write(inputtedMemos);
      console.log("---削除が完了しました---");
    } else {
      console.log("メモがありません");
    }
  }

  async append(inputtedMemos) {
    const newMemo = await this.#inputRead();

    inputtedMemos.memos.push(newMemo);
    this.#write(inputtedMemos);
    console.log("---書き込みが完了しました---");
  }

  async #createEmptyData() {
    const emptyDataJSON = JSON.stringify({ memos: [] });
    await fs.writeFile(this.memoFilePath, emptyDataJSON);
  }

  async #write(inputtedMemos) {
    const memoDataJSON = JSON.stringify(inputtedMemos);
    await fs.writeFile(this.memoFilePath, memoDataJSON);
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

export default MemosData;
