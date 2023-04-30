const fs = require("fs");

const displayOneLineMemos = () => {
  const jsonPath = "./data/memos.json";
  const jsonData = fs.readFileSync(jsonPath, "utf-8");
  const memosData = JSON.parse(jsonData);
  const memos = memosData.memos;

  for (let i in memos) {
    const memosArray = memos[i].memo.split("\n");
    console.log(memosArray[0]);
  }
};

displayOneLineMemos();
