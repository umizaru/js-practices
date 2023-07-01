import { promises as fs } from "fs";
class MemosData {
  constructor() {
    this.memofilepath = "data/memos.json";
  }

  async read() {
    try {
      const memoData = await fs.readFile(this.memofilepath, "utf-8");
      return JSON.parse(memoData);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.#createEmptyData();
        return { memos: [] };
      }
    }
  }

  async #createEmptyData() {
    const emptyDataJSON = JSON.stringify({ memos: [] });
    await fs.writeFile(this.memofilepath, emptyDataJSON);
  }

  async write(memoData) {
    const memoDataJSON = JSON.stringify(memoData);
    await fs.writeFile(this.memofilepath, memoDataJSON);
  }
}

export default MemosData;
