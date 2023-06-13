import fs from "fs/promises";
import fsExists from "fs.promises.exists";

class MemosData {
  constructor() {
    this.memofilepath = "data/memos.json";
  }

  async read() {
    if (!(await fsExists(this.memofilepath))) {
      const emptyMemoData = JSON.stringify({ memos: [] });
      fs.writeFile(this.memofilepath, emptyMemoData);
    }
    const memoData = await fs.readFile(this.memofilepath, "utf-8");
    return JSON.parse(memoData);
  }

  write(memoData) {
    const memoDataJSON = JSON.stringify(memoData);
    fs.writeFile(this.memofilepath, memoDataJSON);
  }
}
export default MemosData;
