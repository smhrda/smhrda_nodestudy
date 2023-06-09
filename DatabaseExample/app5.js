/* 비밀번호를 암호화하여 저장하는 코드 적용하기 */
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
// 몽구스 모듈 불러오기
var mongoose = require("mongoose");

// crypto 모듈(암호화) 불러오기
var crypto = require("crypto");

// DB 객체를 위한 변수 선언
var database;
// 데이터 스키마 객체를 위한 변수 선언
var UserSchema;
// 데이터베이스 모델 객체를 위한 변수 선언
var UserModel;
// DB에 연결
function connectDB() {
  // DB 연결정보
  var databaseUrl = "mongodb://localhost:27017/local";
  // DB 연결
  console.log("DB 연결을 시도합니다.");
  mongoose.Promise = global.Promise;
  mongoose.connect(databaseUrl);
  database = mongoose.connection;

  database.on("error", console.log.bind(console, "mongoose connection error"));
  database.on("open", function () {
    // open이벤트 : DB 연결 시 발생
    console.log("DB에 연결되었습니다. " + databaseUrl);

    // user 스키마 및 모델 객체 생성
    createUserSchema();

    // static 메소드 추가
    UserSchema.static("findById", function (id, callback) {
      return this.find({ id: id }, callback);
    });
    UserSchema.static("findAll", function (callback) {
      return this.find({}, callback);
    });

    console.log("UserSchema 정의함.");

    // UserModel 모델 정의
    // model(모델 이름, 스키마 객체) 메소드 사용
    UserModel = mongoose.model("users3", UserSchema);
    console.log("UserModel 정의함.");
  });
  // 연결이 끊어졌을 때, 5초 후 재연결
  database.on("disconnected", function () {
    console.log("연결이 끊어졌습니다. 5초 후 다시 연결합니다.");
    setInterval(connectDB, 5000);
  });
}

// user 스키마 및 모델 객체 생성 함수
function createUserSchema() {
  // 스키마 정의
  UserSchema = mongoose.Schema({
    // 스키마 타입 지정(salt - 암호화 과정에서 사용되는 key값)
    id: { type: String, required: true, unique: true, default: " " },
    hashed_password: { type: String, required: true, default: " " },
    salt: { type: String, required: true },
    name: { type: String, index: "hashed", default: " " },
    age: { type: Number, default: -1 },
    created_at: { type: Date, index: { unique: false }, default: Date.now },
    updated_at: { type: Date, index: { unique: false }, default: Date.now },
  });
  // password를 virtual 메소드로 정의
  // - MongoDB에 저장되지 않는 편리한 속성 / 특정 속성을 지정하고 set, get 메소드를 정의
  UserSchema.virtual("password")
    .set(function (password) {
      this._password = password;
      this.salt = this.makeSalt();
      this.hashed_password = this.encryptPassword(password);
      console.log("virtual apssword 호출됨. : " + this.hashed_password);
    })
    .get(function () {
      return this._password;
    });

  /* 모델 인스턴스에서 사용할 수 있는 메소드 추가 */
  // 비밀번호 암호화 메소드
  UserSchema.method("encryptPassword", function (plainText, inSalt) {
    if (inSalt) {
      return crypto.createHmac("sha1", inSalt).update(plainText).digest("hex");
    } else {
      return crypto
        .createHmac("sha1", this.salt)
        .update(plainText)
        .digest("hex");
    }
  });
  // salt 값 만들기 메소드
  UserSchema.method("makeSalt", function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  });
  // 인증 메소드 - 입력된 비밀번호와 비교하여 true/false 리턴
  UserSchema.method(
    "authenticate",
    function (plainText, inSalt, hashed_password) {
      if (inSalt) {
        console.log(
          "authenticate 호출됨: %s -> %s : %s",
          plainText,
          this.encryptPassword(plainText, inSalt),
          hashed_password
        );
        return this.encryptPassword(plainText, inSalt) === hashed_password;
      } else {
        console.log(
          "authenticate 호출됨: %s -> %s : %s",
          plainText,
          this.encryptPassword(plainText),
          this.hashed_password
        );
        return this.encryptPassword(plainText) === this.hashed_password;
      }
    }
  );
  // 필수 속성에 대한 유효성 확인(길이 값 체크)
  UserSchema.path("id").validate(function (id) {
    return id.length;
  }, "id 칼럼의 값이 없습니다.");
  UserSchema.path("name").validate(function (name) {
    return name.length;
  }, "name 칼럼의 값이 없습니다.");
}

// 사용자 인증 함수 만들기
var authUser = function (database, id, password, callback) {
  console.log("authUser 호출됨.");
  // 1. 아이디를 사용해 검색
  UserModel.findById(id, function (err, results) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("아이디 [%s]로 사용자 검색 결과", id);
    console.dir(results);
    if (results.length > 0) {
      console.log("아이디와 일치하는 사용자 찾음.");

      // 2. 비밀번호 확인 - 모델 인스턴스를 객체로 만들고 authenticate() 메소드 호출
      var user = new UserModel({ id: id });
      var authenticated = user.authenticate(
        password,
        results[0]._doc.salt,
        results[0]._doc.hashed_password
      );
      if (authenticated) {
        console.log("비밀번호 일치함.");
        callback(null, results);
      } else {
        console.log("비밀번호 일치하지 않음.");
        callback(null, null);
      }
    }
  });
};
// 사용자 추가 함수 만들기
var addUser = function (database, id, password, name, callback) {
  console.log("addUser 호출됨.");

  // UserModel의 인스턴스 생성
  var user = new UserModel({ id: id, password: password, name: name });

  // save()로 저장
  user.save(function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log("사용자 데이터 추가함.");
    callback(null, user);
  });
};

// 익스프레스 객체 생성
var app = express();
// 기본 속성 설정
app.set("port", process.env.PORT || 3000);

// body-parser를 사용해 application/x-www-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));
// body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());

// public 폴더를 static으로 오픈
app.use("/public", static(path.join(__dirname, "public")));

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

// 라우터 객체 참조
var router = express.Router();

// 로그인 라우팅 함수
// - 데이터베이스의 정보와 비교
router.route("/process/login").post(function (req, res) {
  console.log("/process/login 호출됨.");

  var paramId = req.param("id");
  var paramPassword = req.param("password");
  //console.log("확인: %s, %s", paramId, paramPassword);

  if (database) {
    authUser(database, paramId, paramPassword, function (err, docs) {
      if (err) throw err;

      if (docs) {
        console.dir(docs);
        var username = docs[0].name;
        res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
        res.write("<h1>로그인 성공</h1>");
        res.write("<div><p>사용자 아이디 : " + paramId + "</p></div>");
        res.write("<div><p>사용자 이름 : " + username + "</p></div>");
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();
      } else {
        res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
        res.write("<h1>로그인 실패</h1>");
        res.write("<div><p>아이디와 비밀번호를 다시 확인하십시오.</div>");
        res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        res.end();
      }
    });
  } else {
    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.write("<div><p>데이터베이스에 연결하지 못했습니다.</div>");
    res.end();
  }
});

// 사용자 추가 라우팅 함수
// - 클라이언트에서 보내온 데이터를 이용해 데이터베이스에 추가
router.route("/process/adduser").post(function (req, res) {
  console.log("/process/adduser 호출됨.");

  var paramId = req.body.id || req.query.id;
  var paramPassword = req.body.password || req.query.password;
  var paramName = req.body.name || req.query.name;

  console.log(
    "요청 파라미터 : " + paramId + ", " + paramPassword + ", " + paramName
  );

  // DB 객체가 초기화된 경우, addUser 함수 호출하여 사용자 추가
  if (database) {
    addUser(
      database,
      paramId,
      paramPassword,
      paramName,
      function (err, result) {
        if (err) {
          throw err;
        }
        // 결과 객체를 확인하여 추가된 데이터가 있으면 성공 응답 전송
        if (result) {
          console.dir(result);
          res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
          res.write("<h2>사용자 추가 성공</h2>");
          res.end();
        } else {
          // 결과 객체가 없으면 실패 응답 전송
          res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
          res.write("<h2>사용자 추가 실패</h2>");
          res.end();
        }
      }
    );
  } else {
    // DB 객체가 초기화되지 않은 경우, 실패 응답 전송
    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.end();
  }
});

// 사용자 리스트 라우팅 함수
router.route("/process/listuser").post(function (req, res) {
  console.log("/process/listuser 호출됨.");

  // DB 객체가 초기화된 경우, 모델 객체의 findAll 메소드 호출
  if (database) {
    // 1. 모든 사용자 검색
    UserModel.findAll(function (err, results) {
      // 오류 발생 시 클라이언트로 전송
      if (err) {
        console.error("사용자 리스트 조회 중 오류 발생 : " + err.stack);
        res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
        res.write("<h2>사용자 리스트 조회 중 오류 발생</h2>");
        res.write("<p>" + err.stack + "</p>");
        res.end();

        return;
      }
      if (results) {
        console.dir(results);
        res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
        res.write("<h2>사용자 리스트</h2>");
        res.write("<div><ul>");
        for (var i = 0; i < results.length; i++) {
          var curId = results[i]._doc.id;
          var curName = results[i]._doc.name;
          res.write("  <li>#" + i + " : " + curId + ", " + curName + "</li>");
        }
        res.write("</ul></div>");
        res.end();
      } else {
        // 결과 객체가 없을 때, 실패 응답
        res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
        res.write("<h2>사용자 리스트 조회 실패</h2>");
        res.end();
      }
    });
  } else {
    // DB 객체가 초기화되지 않았을 때, 실패 응답
    res.writeHead("200", { "Content-Type": "text/html; charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.end();
  }
});

// 라우터 객체 등록
app.use("/", router);

// 404 오류 페이지 처리
var errorHandler = expressErrorHandler({
  static: {
    404: "./public/404.html",
  },
});

// 오류 처리
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

// 서버 시작
http.createServer(app).listen(app.get("port"), function () {
  console.log("서버가 %d 포트에서 시작되었습니다.", app.get("port"));
  // DB 연결
  connectDB();
});
