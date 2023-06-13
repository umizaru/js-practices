#!/usr/bin/env node

import minimist from "minimist";
import MemosCommander from "./memosCommander.js";

const option = minimist(process.argv);
const commander = new MemosCommander(option);
commander.run();
