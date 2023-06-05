#!/usr/bin/env node

import path from "path";
import minimist from "minimist";
import Commander from "./commander.js";

const option = minimist(process.argv);
const memoFilePath = path.resolve("data", "memos.json");
const commander = new Commander(option, memoFilePath);
commander.run();
