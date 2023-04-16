// ...
const readline = require("readline");
const fs = require("fs");

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

  fs.writeFile("./data.json", jsoncontent, "utf8", (err) => {
    if (err) {
      console.error("ファイルの保存に失敗しました:", err);
    } else {
      console.log("メモがJSON形式でファイルに保存されました");
    }
    rl.close();
  });
});
