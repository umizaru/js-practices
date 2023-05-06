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
    const memoList = this.jsonFile.read();
    memoList.memos.push({ memo: inputText });
    await this.jsonFile.write(memoList, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("---書き込みが完了しました---");
    });
  }

  async list() {
    const memoList = this.jsonFile.read();
    if (memoList.memos.length === 0) {
      console.log("メモがありません");
      return;
    }
    memoList.memos.forEach((memo) => {
      const memosArray = memo.memo.split("\n");
      console.log(memosArray[0]);
    });
  }

  async refer() {
    const memoList = this.jsonFile.read();
    const choices = memoList.memos.map((memo) => memo.memo.split("\n")[0]);
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
    const selectedMemo = memoList.memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );
    console.log(selectedMemo.memo);
  }

  async delete() {
    const memoList = this.jsonFile.read();
    const choices = memoList.memos.map((memo) => memo.memo.split("\n")[0]);
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

    const selectedMemo = memoList.memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );

    memoList.memos = memoList.memos.filter(
      (memo) => memo.memo.split("\n")[0] !== selectedMemo.memo.split("\n")[0]
    );
    this.jsonFile.write(memoList, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("---削除が完了しました---");
    });
  }
}

module.exports = MemosController;
