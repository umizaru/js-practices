const memosData = require("./memosData.js");
const InputReader = require("./inputReader.js");

const { prompt } = require("enquirer");

class MemosController {
  constructor(path) {
    this.memosData = new memosData(path);
    this.inputReader = new InputReader();
  }

  async append() {
    const inputText = await this.inputReader.read();
    const memoData = this.memosData.read();
    memoData.memos.push({ memo: inputText });
    await this.memosData.write(memoData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("---書き込みが完了しました---");
    });
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

  async refer() {
    const memoData = this.memosData.read();
    const memoTitles = memoData.memos.map((memo) => memo.memo.split("\n")[0]);
    if (memoTitles.length === 0) {
      console.log("メモがありません");
      return;
    }
    const answer = await prompt({
      type: "select",
      name: "selectedMemo",
      message: "Choose a memo you want to see:",
      choices: memoTitles,
    });
    const selectedMemo = memoData.memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );
    console.log(selectedMemo.memo);
  }

  async delete() {
    const memoData = this.memosData.read();
    const memoTitles = memoData.memos.map((memo) => memo.memo.split("\n")[0]);
    if (memoTitles.length === 0) {
      console.log("メモがありません");
      return;
    }
    const answer = await prompt({
      type: "select",
      name: "selectedMemo",
      message: "Choose a memo you want to delete:",
      choices: memoTitles,
    });

    const selectedMemo = memoData.memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );

    memoData.memos = memoData.memos.filter(
      (memo) => memo.memo.split("\n")[0] !== selectedMemo.memo.split("\n")[0]
    );
    this.memosData.write(memoData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("---削除が完了しました---");
    });
  }
}

module.exports = MemosController;
