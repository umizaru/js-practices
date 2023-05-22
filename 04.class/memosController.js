const memosData = require("./memosData.js");
const InputReader = require("./inputReader.js");

const { prompt } = require("enquirer");

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
      await new Promise((resolve, reject) => {
        this.memosData.write(memoData, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
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
    const memoData = memosData.read();
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
      await new Promise((resolve, reject) => {
        this.memosData.write(memoData, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      console.log("---削除が完了しました---");
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = MemosController;
