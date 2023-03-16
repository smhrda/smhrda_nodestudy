/* 파일 다루기 3 */
var fs = require("fs");

// 파일에 데이터 쓰기
// writeFile(filename, data, encoding="utf-8", [callback]) : 비동기식IO로 파일 쓰기
fs.writeFile("./output.txt", "Hello World!", function (err) {
  if (err) {
    console.log("ERror : " + err);
  }
  console.log("output.txt 파일에 데이터 쓰기 완료");
});
