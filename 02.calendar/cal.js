/* eslint-disable no-unused-vars */
const { DateTime } = require("luxon");
let args = require("minimist")(process.argv.slice(2));
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

let first_day = DateTime.fromObject({ year, month, day: 1 });
let last_day = first_day.endOf("month");

let days_of_month = [];
for (let i = 1; i <= last_day.day; i++) {
  days_of_month.push(i);
}

let weekday_count = first_day.weekday;
let spaces = "   ".repeat(weekday_count);
if (first_day.weekday !== 7) process.stdout.write(spaces);

days_of_month.forEach((day) => {
  let str_day = String(day).padStart(2, " ");
  process.stdout.write(str_day + " ");
  weekday_count++;
  if (weekday_count % 7 == 0) {
    console.log("");
  }
});
console.log("\n");
