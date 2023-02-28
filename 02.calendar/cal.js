/* eslint-disable no-unused-vars */
const { DateTime } = require("luxon");
const args = require("minimist")(process.argv.slice(2));
let year = args["y"];
let month = args["m"];

const now = DateTime.now();
if (year == undefined) {
  year = now.year;
}
if (month == undefined) {
  month = now.month;
}

console.log("     ", month.toString() + "月", year.toString());
console.log("日", "月", "火", "水", "木", "金", "土");

const first_day = DateTime.fromObject({ year, month, day: 1 });
const last_day = first_day.endOf("month");

let weekday_count = first_day.weekday;
const spaces = "   ".repeat(weekday_count);
if (weekday_count !== 7) process.stdout.write(spaces);

for (let i = 1; i <= last_day.day; i++) {
  const str_day = String(i).padStart(2, " ");
  process.stdout.write(`${str_day} `);
  weekday_count++;
  if (weekday_count % 7 == 0) {
    console.log("");
  }
}
console.log("\n");
