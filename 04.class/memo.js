// ...
const readline = require("readline");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputcontent = [];

rl.on("line", (input) => {
  inputcontent = input;
  console.log("受け取ったメモの内容:", inputcontent);

  const memo = {
    content: inputcontent,
  };

  const jsoncontent = JSON.stringify(memo);

  const uniqueid = uuidv4();
  const filename = `./data/memo_${uniqueid}.json`;
  fs.writeFile(filename, jsoncontent, "utf8", (err) => {
    if (err) {
      console.error("ファイルの保存に失敗しました:", err);
    } else {
      console.log("ファイの保存に成功しました");
    }
    rl.close();
  });
});
