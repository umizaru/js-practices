const fs = require("fs");

class MemosData {
  constructor(memoFilePath) {
    this.path = memoFilePath;
  }

  read() {
    if (!fs.existsSync(this.path)) {
      const emptyMemoData = JSON.stringify({ memos: [] });
      fs.writeFileSync(this.path, emptyMemoData);
    }
    const memoData = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(memoData);
  }

  write(memoData, callback) {
    const updatedJsonData = JSON.stringify(memoData);
    fs.writeFile(this.path, updatedJsonData, callback);
  }
}

module.exports = MemosData;
