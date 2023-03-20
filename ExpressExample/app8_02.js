/* URL 파라미터 사용하기 */
var express = require("express"),
  http = require("http"),
  path = require("path");
var bodyParser = require("body-parser"),
  static = require("serve-static");
var app = express();

// 라우터 객체 참조
var router = express.Router();

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

// 라우터 객체 등록
app.use("/", router);

// 라우팅 함수 등록
router.route("/process/login/:name").post(function (req, res) {
  console.log("/process/login/:name 처리함");

  var paramName = req.params.name;
  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
  res.write("<h1>Express 서버에서 응답한 결과입니다.</h1>");
  res.write("<div><p>Param name : " + paramName + "</p></div>");
  res.write("<div><p>Param id : " + paramId + "</p></div>");
  res.write("<div><p>Param password : " + paramPassword + "</p></div>");
  res.write(
    "<br><br><a href='/public/login3.html'>로그인 페이지로 돌아가기</a>"
  );
  res.end();
});

http.createServer(app).listen(app.get("port"), function () {
  console.log("Express 서버가 %d번 포트에서 시작됨.", app.get("port"));
});
