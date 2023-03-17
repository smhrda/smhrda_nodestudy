/* 파일 다루기 5 */
var fs = require("fs");

// 파일을 열고 데이터 읽기
fs.open("./output.txt", "r", function (err, fd) {
  if (err) throw err;

  var buf = Buffer.alloc(10); // 버퍼 객체 만들기(정수는 alloc 사용)
  console.log("버퍼 타입 : %s", Buffer.isBuffer(buf));

  fs.read(fd, buf, 0, buf.length, null, function (err, bytesRead, buffer) {
    // write(fd, buffer, offset, length, position, [callback]) : 지정한 부분의 파일 내용을 읽어들이는 메소드
    if (err) throw err;

    var inStr = buffer.toString("utf-8", 0, bytesRead);
    console.log("파일에서 읽은 데이터 : %s", inStr);

    console.log(err, bytesRead, buffer);

    fs.close(fd, function () {
      console.log("파일 열고 - 파일을 읽고 - 파일 닫기 완료");
    });
  });
});
