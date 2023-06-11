import fs from "fs/promises";
class MemosData {
  constructor(memoFilePath) {
    this.path = memoFilePath;
  }

  async read() {
    if (fs.access(this.path).catch(() => false)) {
      const emptyMemoData = JSON.stringify({ memos: [] });
      fs.writeFile(this.path, emptyMemoData);
    }
    try {
      const memoData = await fs.readFile(this.path, "utf-8");
      return JSON.parse(memoData);
    } catch (err) {
      console.error(err);
    }
  }

  write(memoData) {
    const memoDataJSON = JSON.stringify(memoData);
    fs.writeFile(this.path, memoDataJSON);
  }
}
export default MemosData;
