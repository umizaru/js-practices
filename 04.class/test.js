import pkg from "enquirer";
const { Select } = pkg;

const prompt = new Select({
  name: "memos",
  message: "Choose a note you want to see:",
  choices: [
    { name: "Note 1", value: 1 },
    { name: "Note 2", value: 2 },
    { name: "Note 3", value: 3 },
    { name: "Note 1", value: 4 },
  ],
  result() {
    return this.focused.text;
  },
});

prompt.run();
