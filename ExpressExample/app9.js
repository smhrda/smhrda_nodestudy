/* express-error-handler 미들웨어로 오류 페이지 보내기 */
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
router.route("/process/login").post(function (req, res) {
  console.log("/process/login 처리함");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param password : " + paramPassword + "</p></div>");
  res.write(
    "<br><br><a href='/public/login2.html'>로그인 페이지로 돌아가기</a>"
  );
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
