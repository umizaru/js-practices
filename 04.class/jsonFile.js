const fs = require("fs");

class memosData {
  constructor(path) {
    this.path = path;
  }
  read() {
    if (!fs.existsSync(this.path)) {
      const emptyMemoData = JSON.stringify({ memos: [] });
      fs.writeFileSync(this.path, emptyMemoData);
    }
    const jsonData = fs.readFileSync(this.path, "utf-8");
    return JSON.parse(jsonData);
  }
  write(memoList, callback) {
    const updatedJsonData = JSON.stringify(memoList);
    fs.writeFile(this.path, updatedJsonData, callback);
  }
}

module.exports = memosData;
