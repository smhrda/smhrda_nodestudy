/* 파일 다루기 4 */
var fs = require("fs");

// 파일을 열고 데이터 쓰기
fs.open("./output.txt", "w", function (err, fd) {
  // open(filename, flags, [mode], [callback]) : 파일을 여는 메소드
  if (err) throw err;

  /* var buf = new Buffer("안녕!\n"); */ //<- new Buffer()은 이제 사용되지 않음!
  var buf = Buffer.from("안녕!\n"); // 버퍼 객체 만들기(문자열은 from 사용)

  fs.write(fd, buf, 0, buf.length, null, function (err, written, buffer) {
    // write(fd, buffer, offset, length, position, [callback]) : 파일의 지정한 부분에 데이터를 쓰는 메소드
    if (err) throw err;

    console.log(err, written, buffer);

    fs.close(fd, function () {
      // close(fd, [callback]) : 파일을 닫는 메소드
      console.log("파일 열고 - 데이터 쓰고 - 파일 닫기 완료");
    });
  });
});

/* open() 사용 시 대표적인 플래그
  - "r" : 읽기 / 파일 없으면 예외 발생
  - "w" : 쓰기 / 파일이 없으면 새로 만듦 / 이전 내용 모두 삭제됨
  - "w+" : 읽기 및 쓰기 / 파일이 없으면 새로 만듦 / 이전 내용 모두 삭제됨
  - "a+" : 읽기 및 추가 / 파일이 없으면 새로 만듦 / 이전 내용에 새로운 내용 추가
  */
