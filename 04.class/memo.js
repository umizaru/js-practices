#!/usr/bin/env node
const Commander = require("./Commander.js");
const path = "./data/memos.json";
const option = require("minimist")(process.argv.slice(2));
const command = new Commander(option, path);
command.run();
