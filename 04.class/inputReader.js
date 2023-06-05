import readline from "readline";

class InputReader {
  read() {
    const rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve, reject) => {
      const lines = [];
      rlInterface.on("line", (line) => lines.push(line));
      rlInterface.on("close", () => {
        if (lines.length === 0) {
          reject(console.error("文字を入力してください"));
        }
        resolve(lines.join("\n"));
      });
    });
  }
}

export default InputReader;
