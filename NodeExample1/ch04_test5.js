/* 파일 다루기 */
var fs = require("fs");

// 파일을 동기식 IO로 읽어들이기 -> Sync
// readFile(filename, [encoding]) : 동기식으로 파일 읽어 들임
var data = fs.readFileSync("./package.json", "utf-8");

console.log(data); // 파일이 다 읽어진 후 출력됨(동기식)
