const readline = require("readline");
const fs = require("fs");

const saveInputToJson = async () => {
  try {
    const inputText = await readInput();
    await appendMemo(inputText);
    console.log("---正常に書き込みが完了しました---");
  } catch (err) {
    console.error("エラーが発生しました:", err);
  }
};

const readInput = async () => {
  const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    let lines = [];
    input.on("line", (line) => lines.push(line));
    input.on("close", () => resolve(lines.join("\n")));
  });
};

const appendMemo = async (memoText) => {
  const jsonPath = "./data/memos.json";
  const jsonData = fs.readFileSync(jsonPath, "utf-8");
  const memosData = JSON.parse(jsonData);

  memosData.memos.push({ memo: memoText });
  const updatedJsonData = JSON.stringify(memosData);

  return new Promise((resolve, reject) => {
    fs.writeFile(jsonPath, updatedJsonData, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

saveInputToJson();
