const fs = require("fs");
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
console.log(args);

const displayMemos = () => {
  const jsonPath = "./data/memos.json";
  const jsonData = fs.readFileSync(jsonPath, "utf-8");
  const memosData = JSON.parse(jsonData);
  const memos = memosData.memos;

  for (let i in memos) {
    const memosArray = memos[i].memo.split("\n");
    console.log(memosArray[0]);
  }
};
displayMemos();
