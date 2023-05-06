const readline = require("readline");

class InputReader {
  read() {
    const input = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve) => {
      let lines = [];
      input.on("line", (line) => lines.push(line));
      input.on("close", () => {
        if (lines.length === 0) {
          console.log("文字を入力してください");
          process.exit(1);
        }
        resolve(lines.join("\n"));
      });
    });
  }
}

module.exports = InputReader;
