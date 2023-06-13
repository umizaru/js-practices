import fs from "fs/promises";
class MemosData {
  constructor() {
    this.memofilepath = "data/memos.json";
  }

  async read() {
    if (!fs.stat(this.memofilepath)) {
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
