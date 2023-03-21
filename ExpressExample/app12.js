/* 세션 관리하기 */
var express = require("express"),
  http = require("http"),
  path = require("path");
var bodyParser = require("body-parser"),
  static = require("serve-static");
var app = express();
var router = express.Router();
var expressErrorHandler = require("express-error-handler");

var cookieParser = require("cookie-parser");
app.use(cookieParser());

// 세션 처리 모듈 불러오기
var expressSession = require("express-session");
app.use(
  expressSession({
    secret: "my key", // secret 속성에 키 값을 넣어 초기화
    resave: true,
    saveUninitialized: true,
  })
);

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

// 상품 정보 라우팅 함수
router.route("/process/product").get(function (req, res) {
  console.log("/process/product 호출됨");
  // user 세션 객체가 있는지 확인
  if (req.session.user) {
    res.redirect("/public/product.html");
  } else {
    res.redirect("/public/login2.html");
  }
});

// 로그인 라우팅 함수
router.route("/process/login").post(function (req, res) {
  console.log("/process/login 호출됨.");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;

  if (req.session.user) {
    // 이미 로그인된 경우
    console.log("이미 로그인되어 상품 페이지로 이동합니다.");
    res.redirect("/public/product.html");
  } else {
    // 세션 저장
    req.session.user = {
      id: paramId,
      name: "mike",
      authorized: true,
    };
    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
    res.write("<h1>로그인 성공</h1>");
    res.write("<div><p>Param id : " + paramId + "</p></div>");
    res.write("<div><p>Param password : " + paramPassword + "</p></div>");
    res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
    res.end();
  }
});

// 로그아웃 라우팅
router.route("/process/logout").get(function (req, res) {
  console.log("/process/logout 호출됨");

  if (req.session.user) {
    console.log("로그아웃합니다.");
    // destroy() : 세션 삭제
    req.session.destroy(function (err) {
      if (err) {
        throw err;
      }
      console.log("세션을 삭제하고 로그아웃되었습니다.");
      res.redirect("/public/login2.html");
    });
  } else {
    console.log("아직 로그인되어 있지 않습니다.");
    res.redirect("/public/login2.html");
  }
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
