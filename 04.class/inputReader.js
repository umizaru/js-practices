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
        resolve(lines.join("\n"));
      });
      rlInterface.on("error", (error) => {
        reject(error);
      });
    });
  }
}

export default InputReader;
