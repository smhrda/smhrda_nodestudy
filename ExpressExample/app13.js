/* multer 미들웨어로 파일 업로드하기 */
// Express 기본 모듈 불러오기
var express = require("express"),
  http = require("http"),
  path = require("path");
// Express의 미들웨어 불러오기
var bodyParser = require("body-parser"),
  cookieParser = require("cookie-parser"),
  static = require("serve-static"),
  errorHandler = require("errorhandler");
// 오류 핸들러 모듈 사용
var expressErrorHandler = require("express-error-handler");
// Session 미들웨어 불러오기
var expressSession = require("express-session");
// 파일 업로드용 미들웨어
var multer = require("multer");
var fs = require("fs");
// 클라이언트에서 ajax로 요청했을 때 CORS(다중 서버 접속) 지원
var cors = require("cors");

// 익스프레스 객체 생성
var app = express();

// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extends: false }));

// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더의 uploads 폴더 오픈
app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(
  expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
  })
);

// 클라이언트에서 ajax로 요청했을 때 CORS 지원
app.use(cors());

// multer 미들웨어 사용
/* 미들웨어 사용 순서 주의!! body-parser -> multer -> router */
var storage = multer.diskStorage({
  // destination: 업로드한 파일이 저장될 폴더 지정
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  // filename: 업로드한 파일의 이름을 바꿈
  filename: function (req, file, callback) {
    callback(null, file.originalname + Date.now()); // 중복 방지
  },
});

var upload = multer({
  storage: storage,
  // 파일 제한: 10개, 1G
  limits: {
    files: 10,
    fileSize: 1024 * 1024 * 1024,
  },
});

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();

// 사진 파일 처리 라우터
router
  .route("/process/photo")
  .post(upload.array("photo", 1), function (req, res) {
    console.log("/process/photo 호출됨");

    try {
      var files = req.files;
      console.dir("=====#업로드된 첫번재 파일 정보=====#");
      console.dir(req.files[0]);
      console.dir("#=====#");

      // 현재의 파일 정보를 저장할 변수 선언
      var originalname = "",
        filename = "",
        mimetype = "",
        size = 0;

      if (Array.isArray(files)) {
        // 배열에 들어가 있는 경우(1개의 파일도 배열에 들어가도록 설정해둠)
        console.log("배열에 들어있는 파일의 개수 : %d", files.length);

        for (var index = 0; index < files.length; index++) {
          originalname = files[index].originalname;
          filename = files[index].filename;
          mimetype = files[index].mimetype;
          size = files[index].size;
        }
      } else {
        // 배열에 들어가 있지 않은 경우(현재 설정에서는 해당X)
        console.log("파일 개수 : 1");
        originalname = files[index].originalname;
        filename = files[index].filename;
        mimetype = files[index].mimetype;
        size = files[index].size;
      }
      console.log(
        "현재 파일 정보 : " +
          originalname +
          ", " +
          filename +
          ", " +
          mimetype +
          ", " +
          size
      );

      // 클라이언트에 응답 전송
      res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
      res.write("<h3>파일 업로드 성공</h3>");
      res.write("<hr/>");
      res.write(
        "<p>원본 파일 이름 : " +
          originalname +
          "-> 저장 파일명 : " +
          filename +
          "</p>"
      );
      res.write("<p>MIME TYPE : " + mimetype + "</p>");
      res.write("<p>파일 크기 : " + size + "</p>");
      res.end();
    } catch (err) {
      console.dir(err.stack);
    }
  });

app.use("/", router);

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
