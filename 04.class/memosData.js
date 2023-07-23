import { promises as fs } from "fs";

class MemosData {
  constructor() {
    this.memoFilePath = "data/memos.json";
  }

  async read() {
    try {
      const memosJSON = await fs.readFile(this.memoFilePath, "utf-8");
      return JSON.parse(memosJSON);
    } catch (error) {
      if (error.code === "ENOENT") {
        await this.#createEmptyData();
        return {};
      } else {
        console.error("予期しないエラーが発生しました");
        throw error;
      }
    }
  }

  async delete(selectedIndex) {
    const memos = await this.read();
    memos.splice(selectedIndex, 1);
    this.#write(memos);
  }

  async append(newMemo) {
    const memos = await this.read();
    memos.push(newMemo);
    this.#write(memos);
  }

  async #createEmptyData() {
    const emptyDataJSON = JSON.stringify([]);
    await fs.writeFile(this.memoFilePath, emptyDataJSON);
  }

  async #write(memos) {
    const memoDataJSON = JSON.stringify(memos);
    await fs.writeFile(this.memoFilePath, memoDataJSON);
  }
}

export default MemosData;
