#!/usr/bin/env node

import minimist from "minimist";
import Commander from "./commander.js";

const option = minimist(process.argv);
const commander = new Commander(option);
commander.run();
