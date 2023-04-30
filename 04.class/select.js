const fs = require("fs");
const { prompt } = require("enquirer");
const jsonPath = "./data/memos.json";
const jsonData = fs.readFileSync(jsonPath, "utf-8");
const memosData = JSON.parse(jsonData);
const memos = memosData.memos;

const choices = memos.map((memo) => memo.memo.split("\n")[0]);
console.log(choices);

prompt({
  type: "select",
  name: "memos",
  message: "Choose a note you want to see:",
  choices,
})
  .then((answer) => {
    const selectedMemo = memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.memos
    );
    console.log(selectedMemo.memo);
  })
  .catch(console.error);
