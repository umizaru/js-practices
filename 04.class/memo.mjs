#!/usr/bin/env node
import Commander from "./commander.mjs";
import minimist from "minimist";
import path from "path";

const option = minimist(process.argv);
const memoFilePath = path.resolve("data", "memos.json");
const commander = new Commander(option, memoFilePath);
commander.run();
