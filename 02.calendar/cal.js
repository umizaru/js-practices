/* eslint-disable no-unused-vars */

const args = require("minimist")(process.argv.slice(2));
let year = args["y"];
let month = args["m"];

console.log("     ", month + "月", year);
console.log("日", "月", "火", "水", "木", "金", "土");

const { DateTime } = require("luxon");

const first_day = DateTime.fromObject({ year, month, day: 1 });
const last_day = DateTime.fromObject({ year, month, day: 1 }).plus({
  months: 1,
  days: -1,
});
console.log(first_day);
console.log(last_day);

// # 月の最初,最後の日を整数型で算出
// first_day = Date.new(year.to_i, month.to_i, 1)
// last_day = Date.new(year.to_i, month.to_i, -1)

// # 始まる曜日に合わせて空欄を挿入
// space = "   " * first_day.wday
// print space

// # カレンダーの形になるよう最初日〜最終日を処理
// month_day_range = first_day.day .. last_day.day # 1ヵ月の日数をカウント
// wd_count = first_day.wday # 1日の曜日を数値で表示
// month_day_range.each do |day|
//   print day.to_s.rjust(2) # 右端で折り返し、(n)は余白
//   print " "
//     wd_count = wd_count + 1
//     if (wd_count % 7 == 0) # 土曜日で改行
//         print("\n")
//     end
//   end
