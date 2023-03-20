/* 익스프레스에서 요청 객체에 추가한 헤더와 파라미터 알아보기 */
var express = require("express");
var http = require("http");

var app = express();

// use() 메소드를 이용해 미들웨어 등록
app.use(function (req, res, next) {
  console.log("첫 번째 미들웨어에서 요청을 처리함.");

  var userAgent = req.header("User-Agent");
  var paramName = req.query.name; // http://localhost:3000/?name=mike

  res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>User-Agent : " + userAgent + "</p></div>");
  res.write("<div><p>Param name : " + paramName + "</p></div>");
  res.end();
});

http.createServer(app).listen(3000, function () {
  console.log("Express 서버가 3000번 포트에서 시작됨.");
});

/* 익스프레스에서 추가로 사용할 수 있는 요청 객체의 속성들
    - query: 클라이언트에서 GET 방식으로 전송한 요청 파라미터(query string)를 확인
    - body : 클라이언트에서 POST 방식으로 전송한 요청 파라미터를 확인 
            / body-parser와 같은 외장 모듈을 사용해야 함!
    - header(name) : 헤더를 확인
*/
