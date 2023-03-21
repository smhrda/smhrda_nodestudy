/* 쿠키 관리하기 */
var express = require("express"),
  http = require("http"),
  path = require("path");
var bodyParser = require("body-parser"),
  static = require("serve-static");
var app = express();
var router = express.Router();
var expressErrorHandler = require("express-error-handler");

// cookie-parser 미들웨어 : 요청 객체에 cookies 속성이 추가됨
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.set("port", process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", static(path.join(__dirname, "public")));

app.use("/", router);

// showCookie 라우팅
router.route("/process/showCookie").get(function (req, res) {
  console.log("/process/showCookie 호출됨");

  res.send(req.cookies);
});

// setUserCookie 라우팅
router.route("/process/setUserCookie").get(function (req, res) {
  console.log("/process/setUserCookie 호출됨");

  // 쿠키 설정
  res.cookie("user", {
    id: "mike",
    name: "하리보",
    authorized: true,
  });

  // redirect로 응답
  res.redirect("/process/showCookie");
});

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
