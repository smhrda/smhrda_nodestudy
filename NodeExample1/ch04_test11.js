/* 파일 다루기 7 */
/* 스트림( 데이터가 전달되는 통로) 단위로 파일 읽고 쓰기 */
var fs = require("fs");

var infile = fs.createReadStream("./output.txt", { flags: "r" });
var outfile = fs.createWriteStream("./output2.txt", { flags: "w" });

infile.on("data", function (data) {
  console.log("읽어들인 데이터 ", data);

  outfile.write(data);
});

infile.on("end", function () {
  console.log("파일 읽기 종료");
  outfile.end(function () {
    console.log("파일 쓰기 종료");
  });
});
