import readline from "readline";

class InputReader {
  read() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve) => {
      const lines = [];
      rl.on("line", (line) => lines.push(line));
      rl.on("close", () => {
        if (lines.length === 0) {
          console.log("文字を入力してください");
          process.exit(1);
        }
        resolve(lines.join("\n"));
      });
    });
  }
}

export default InputReader;
