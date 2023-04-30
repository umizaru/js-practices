const fs = require("fs");
const { prompt } = require("enquirer");
const jsonPath = "./data/memos.json";
const jsonData = fs.readFileSync(jsonPath, "utf-8");
const memosData = JSON.parse(jsonData);
const memos = memosData.memos;

const getChoices = () => {
  return memos.map((memo) => memo.memo.split("\n")[0]);
};

const deleteMemo = async () => {
  const choices = getChoices();
  try {
    const answer = await prompt({
      type: "select",
      name: "selectedMemo",
      message: "Choose a note you want to delete:",
      choices,
    });

    const selectedMemo = memos.find(
      (memo) => memo.memo.split("\n")[0] === answer.selectedMemo
    );

    memosData.memos = memosData.memos.filter(
      (memo) => memo.memo.split("\n")[0] !== selectedMemo.memo.split("\n")[0]
    );

    const updatedJsonData = JSON.stringify(memosData);
    await fs.promises.writeFile(jsonPath, updatedJsonData);
    console.log("正常に削除されました");
  } catch (error) {
    console.error(error);
  }
};

deleteMemo();
