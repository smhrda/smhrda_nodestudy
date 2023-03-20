/* 토큰과 함께 요청한 정보 처리하기 */
var express = require("express"),
  http = require("http"),
  path = require("path");
var bodyParser = require("body-parser"),
  static = require("serve-static");
var app = express();

// 라우터 객체 참조
var router = express.Router();

// 오류 핸들러 모듈 사용
// express-error-handler : 특정 오류 코드에 따라 미리 만들어 놓은 웹 문서를 응답
var expressErrorHandler = require("express-error-handler");

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

// 라우터 객체 등록
app.use("/", router);

// 라우팅 함수 등록
// GET 방식
router.route("/process/users/:id").get(function (req, res) {
  console.log("/process/users/:id 처리함"); // id가 토큰 값

  // URL 파라미터 확인
  var paramId = req.params.id;

  console.log("/process/users와 토큰 %s를 이용해 처리함.", paramId);

  res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.end();
});

// 모든 라우터 처리 끝난 후 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express 서버가 %d번 포트에서 시작됨.", app.get("port"));
});
