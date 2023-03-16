/* 파일 다루기 2 */
var fs = require("fs");

// 파일을 비동기식 IO로 읽어들이기
// readFile(filename, [encoding], [callback]) : 비동기식으로 파일 읽어 들임
var data = fs.readFile("./package.json", "utf-8", function (err, data) {
  console.log(data);
});

console.log("프로젝트 폴더 안의 package.json 파일을 읽도록 요청함");
