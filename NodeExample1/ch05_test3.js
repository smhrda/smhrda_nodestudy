/* 간단한 웹서버 만들기 3 */
/* 클라이언트가 웹 서버에 요청할 때 발생하는 이벤트 처리하기 */
var http = require("http");

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

// 클라이언트 요청 이벤트 처리
server.on("request", function (req, res) {
  console.log("클라이언트 요청이 들어왔습니다.");

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // 응답으로 보낼 헤더 만들기
  // 응답 본문 데이터 만들기
  res.write("<!DOCTYPE html>");
  res.write("<html>");
  res.write("<head>");
  res.write("<body>");
  res.write("<h1>노드제이에스로부터의 응답 페이지</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end(); // end() : 응답을 모두 보냈다는 것을 의미 => end() 호출 시 클라이언트로 응답 전송됨
});

// 서버 종료 이벤트 처리
server.on("close", function () {
  console.log("서버가 종료됩니다.");
});
