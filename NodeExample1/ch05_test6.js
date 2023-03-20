/* 간단한 웹서버 만들기 6 */
/* 파일을 스트림으로 읽어 응답 보내기 */
var http = require("http");
var fs = require("fs");

// 웹 서버 객체 만들기
var server = http.createServer();

// 웹 서버를 3000번 포트에서 시작하고 대기시킴
var port = 3000;
server.listen(port, function () {
  console.log("웹 서버가 %d 번 포트에서 시작되었습니다.", port);
});

// 클라이언트 연결 이벤트 처리
// socket : 클라이언트 연결 정보를 담고 있는 객체
server.on("connection", function (socket) {
  var addr = socket.address(); // address() : 클라이언트의 IP와 포트 정보를 확인할 수 있는 메소드
  console.log("클라이언트가 접속했습니다. : %s, %d", addr.address, addr.port);
});

// 클라이언트 요청 이벤트 처리(파일 읽어 응답하기)
server.on("request", function (req, res) {
  console.log("클라이언트 요청이 들어왔습니다.");

  var filename = "coffee.png";
  var infile = fs.createReadStream(filename, { flags: "r" });

  // 파이프로 연결하여 알아서 처리하도록 설정하기
  infile.pipe(res);
});

// 서버 종료 이벤트 처리
server.on("close", function () {
  console.log("서버가 종료됩니다.");
});

/* Content Type에 설정할 수 있는 대표적인 MIME Type
  - text/plain : 일반 텍스트 문서
  - text/html : html 문서
  - text/css : css 문서
  - text/xml : xml 문서
  - image/jpeg, image/png : jpeg 파일, png 파일
  - video/mpeg, audio/mp3 : mpeg 비디오 파일, mp3 음악 파일
  - application/zip : zip 압축 파일
*/
