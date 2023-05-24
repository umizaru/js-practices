import readline from "readline";
class InputReader {
  read() {
    const input = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve, reject) => {
      let lines = [];
      input.on("line", (line) => lines.push(line));
      input.on("close", () => {
        if (lines.length === 0) {
          reject(console.error("文字を入力してください"));
        }
        resolve(lines.join("\n"));
      });
    });
  }
}

export default InputReader;
