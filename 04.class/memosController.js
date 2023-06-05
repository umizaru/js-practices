import pkg from "enquirer";
const { prompt } = pkg;
import { v4 as uuidv4 } from "uuid";
import InputReader from "./inputReader.js";
import memosData from "./memosData.js";

class MemosController {
  constructor(path) {
    this.inputReader = new InputReader();
    this.memosData = new memosData(path);
  }

  async append() {
    try {
      const inputText = await this.inputReader.read();
      const memoData = await this.memosData.read();
      const newMemo = {
        id: uuidv4(),
        memo: inputText,
      };
      memoData.memos.push(newMemo);
      await this.memosData.write(memoData);
      console.log("---書き込みが完了しました---");
    } catch (err) {
      process.exit(1);
    }
  }

  async list() {
    try {
      const memoData = await this.memosData.read();
      if (memoData.memos.length === 0) {
        console.log("メモがありません");
        return;
      }
      memoData.memos.forEach((memo) => {
        const memosList = memo.memo.split("\n");
        console.log(memosList[0]);
      });
    } catch (err) {
      console.error(err);
    }
  }

  async getMemoDataAndTitles(memosData, message) {
    const memoData = await memosData.read();
    const memoTitles = memoData.memos.map((memo) => memo.memo.split("\n")[0]);
    if (memoTitles.length === 0) {
      console.log("メモがありません");
      return null;
    }
    const answer = await prompt({
      type: "select",
      name: "selectedMemo",
      message: message,
      choices: memoTitles,
    });
    const selectedMemo = memoData.memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );
    return {
      memoData,
      selectedMemo,
    };
  }

  async refer() {
    const { selectedMemo } = await this.getMemoDataAndTitles(
      this.memosData,
      "Choose a memo you want to see:"
    );
    console.log(selectedMemo.memo);
  }

  async delete() {
    const { memoData, selectedMemo } = await this.getMemoDataAndTitles(
      this.memosData,
      "Choose a memo you want to delete:"
    );
    memoData.memos = memoData.memos.filter(
      (memo) => memo.memo.split("\n")[0] !== selectedMemo.memo.split("\n")[0]
    );
    try {
      await this.memosData.write(memoData);
      console.log("---削除が完了しました---");
    } catch (err) {
      console.error(err);
    }
  }
}

export default MemosController;

// 以下デバッグ用
import path from "path";
new MemosController(path.resolve("data", "memos.json"));
