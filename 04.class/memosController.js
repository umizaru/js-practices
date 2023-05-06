const JsonFile = require("./memosData.js");
const InputReader = require("./inputReader.js");

const { prompt } = require("enquirer");

class MemosController {
  constructor(path) {
    this.jsonFile = new JsonFile(path);
    this.inputReader = new InputReader();
  }

  async append() {
    const inputText = await this.inputReader.read();
    const memoData = this.jsonFile.read();
    memoData.memos.push({ memo: inputText });
    await this.jsonFile.write(memoData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("---書き込みが完了しました---");
    });
  }

  async list() {
    const memoData = this.jsonFile.read();
    if (memoData.memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    memoData.memos.forEach((memo) => {
      const memosArray = memo.memo.split("\n");
      console.log(memosArray[0]);
    });
  }

  async refer() {
    const memoData = this.jsonFile.read();
    const choices = memoData.memos.map((memo) => memo.memo.split("\n")[0]);
    if (choices.length === 0) {
      console.log("メモがありません");
      return;
    }
    const answer = await prompt({
      type: "select",
      name: "selectedMemo",
      message: "Choose a note you want to see:",
      choices,
    });
    const selectedMemo = memoData.memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );
    console.log(selectedMemo.memo);
  }

  async delete() {
    const memoData = this.jsonFile.read();
    const choices = memoData.memos.map((memo) => memo.memo.split("\n")[0]);
    if (choices.length === 0) {
      console.log("メモがありません");
      return;
    }
    const answer = await prompt({
      type: "select",
      name: "selectedMemo",
      message: "Choose a note you want to delete:",
      choices,
    });

    const selectedMemo = memoData.memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );

    memoData.memos = memoData.memos.filter(
      (memo) => memo.memo.split("\n")[0] !== selectedMemo.memo.split("\n")[0]
    );
    this.jsonFile.write(memoData, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("---削除が完了しました---");
    });
  }
}

module.exports = MemosController;
