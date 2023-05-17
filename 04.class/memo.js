#!/usr/bin/env node
const Commander = require("./Commander.js");
const option = require("minimist")(process.argv);
const path = require("path");
const memoFilePath = path.resolve("data", "memos.json");
const commander = new Commander(option, memoFilePath);
commander.run();
