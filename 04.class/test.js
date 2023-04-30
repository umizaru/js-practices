const { prompt } = require("enquirer");
const response = prompt({
  type: "input",
  name: "username",
  message: "What is your username?",
});

console.log(response);
