import { promises as fs } from "fs";

class MemosData {
  constructor() {
    this.memoFilePath = "data/memos.json";
  }

  async read() {
    try {
      const memoData = await fs.readFile(this.memoFilePath, "utf-8");
      return JSON.parse(memoData);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.#createEmptyData();
        return { memos: [] };
      } else {
        console.error("予期しないエラーが発生しました");
        throw error;
      }
    }
  }

  async write(memoData) {
    const memoDataJSON = JSON.stringify(memoData);
    await fs.writeFile(this.memoFilePath, memoDataJSON);
  }

  async #createEmptyData() {
    const emptyDataJSON = JSON.stringify({ memos: [] });
    await fs.writeFile(this.memoFilePath, emptyDataJSON);
  }
}

export default MemosData;
