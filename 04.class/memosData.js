import fs from "fs";
import { readFile } from "node:fs/promises";

class MemosData {
  constructor(memoFilePath) {
    this.path = memoFilePath;
  }

  async read() {
    if (!fs.existsSync(this.path)) {
      const emptyMemoData = JSON.stringify({ memos: [] });
      fs.writeFileSync(this.path, emptyMemoData);
    }
    try {
      const memoData = await readFile(this.path, "utf-8");
      return JSON.parse(memoData);
    } catch (err) {
      console.error(err);
    }
  }

  write(memoData) {
    const memoDataJSON = JSON.stringify(memoData);
    fs.writeFileSync(this.path, memoDataJSON);
  }
}
export default MemosData;
