/* 익스프레스의 요청 객체와 응답 객체 알아보기 */
var express = require("express");
var http = require("http");

var app = express();

// use() 메소드를 이용해 미들웨어 등록
app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함.");

  // send() 메소드로 클라이언트에 JSON 데이터 전송
  res.send({ name: "프링글스", age: 30 });
});

http.createServer(app).listen(3000, function () {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
});

/* 익스프레스에서 추가로 사용할 수 있는 응답 객체의 메소드
    - send([body]) : 클라이언트에 응답 데이터 보내기 / HTML 문자열, Buffer 객체, JSON 객체, JSON 배열 전달 가능
    - status(code) : HTTP 상태 코드를 반환 / 상태 코드는 end(), send() 등의 전송 메소드를 추가로 호출 해야 전송할 수 있음
    - sendStatus(statusCode) : HTTP 상태 코드를 반환 / 상태 메세지와 함께 전송됨
    - redirect([status], path) : 웹 페이지 경로를 강제로 이동 시킴
    - render(view, [locals], [callback]) : 뷰 엔진을 사용해 문서를 만든 후 전송
    */
