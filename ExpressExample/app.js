/* 익스프레스 서버 만들기 */
var express = require("express");
var http = require("http"); // express 사용 시 항상 http 모듈도 필요!

// 익스프레스 서버 객체 app 생성
var app = express();

// 기본 포트를 app 객체에 속성으로 설정
// set(name, value) : 서버 설정을 위한 속성 지정 / 지정한 속성은 get()으로 꺼내어 확인할 수 있음
app.set("port", process.env.PORT || 3000); // process.env에 PORT가 있으면 사용하고, 없으면 3000번 사용

// 익스프레스 서버 시작
http.createServer(app).listen(app.get("port"), function () {
  console.log("익스프레스 서버를 시작했습니다. : " + app.get("port")); // get(name) : 지정한 속성 꺼내기
});

/* express() 메소드를 호출하여 만든 app 객체의 주요 메소드 
    - set(name, value) : 서버 설정을 위한 속성 지정 / 지정한 속성은 get()으로 꺼내어 확인할 수 있음
    - get(name) : 지정한 속성 꺼내기
    - use([path], function, [function...]) : 미들웨어 함수를 사용
    - get([path], function) : 특정 패스로 요청된 정보 처리
*/

/* 서버 설정을 위해 정해진 app 객체의 주요 속성
    - env : 서버 모드를 설정
    - views : 뷰들이 들어 있는 폴더 또는 폴더 배열을 설정
    - view engine : 디폴트로 사용할 뷰 엔진 설정(ejs, pug 등)
*/
