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
    const inputtedMemos = await this.read();
    inputtedMemos.splice(selectedIndex, 1);
    this.#write(inputtedMemos);
  }

  async append(newMemo) {
    const inputtedMemos = await this.read();
    inputtedMemos.push(newMemo);
    this.#write(inputtedMemos);
  }

  async #createEmptyData() {
    const emptyDataJSON = JSON.stringify([]);
    await fs.writeFile(this.memoFilePath, emptyDataJSON);
  }

  async #write(inputtedMemos) {
    const memoDataJSON = JSON.stringify(inputtedMemos);
    await fs.writeFile(this.memoFilePath, memoDataJSON);
  }
}

export default MemosData;
