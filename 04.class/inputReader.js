import readline from "readline";

class InputReader {
  read() {
    const rlInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return new Promise((resolve) => {
      const lines = [];
      rlInterface.on("line", (line) => lines.push(line));
      rlInterface.on("close", () => {
        resolve(lines.join("\n"));
      });
    });
  }
}

export default InputReader;
