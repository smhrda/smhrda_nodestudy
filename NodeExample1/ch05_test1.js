/* 간단한 웹서버 만들기 1 */
var http = require("http");

// 웹 서버 객체 만들기
var server = http.createServer();

// 웹 서버를 시작하여 3000번 포트에서 대기
var port = 3000;
// listen(port, [hostname], [backlog], [callback]) : 서버를 싱행하여 대기시키는 메소드
// server.listen(port, function () {
//   console.log("웹 서버가 %d 번 포트에서 시작되었습니다.", port); // 웹 서버가 시작되면 호출
// });

// 특정 IP를 직접 지정해야 하는 경우
// 웹 서버를 시작하여 192.168.0.5 IP와 3000번 포트에서 대기하도록 설정
var host = "43.227.120.188";
var port = 3000;
server.listen(port, host, "50000", function () {
  console.log("웹 서버가 시작되었습니다. : %s, %d", host, port);
});
