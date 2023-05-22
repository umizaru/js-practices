import memosData from "./memosData.mjs";
import InputReader from "./inputReader.mjs";
import pkg from "enquirer";
const { prompt } = pkg;

class MemosController {
  constructor(path) {
    this.memosData = new memosData(path);
    this.inputReader = new InputReader();
  }

  async append() {
    try {
      const inputText = await this.inputReader.read();
      const memoData = await this.memosData.read();
      memoData.memos.push({ memo: inputText });
      await this.memosData.write(memoData);
      console.log("---書き込みが完了しました---");
    } catch (err) {
      console.error(err);
    }
  }

  list() {
    const memoData = this.memosData.read();
    if (memoData.memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    memoData.memos.forEach((memo) => {
      const memosList = memo.memo.split("\n");
      console.log(memosList[0]);
    });
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
