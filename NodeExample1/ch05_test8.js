/* 간단한 웹서버 만들기 8 */
/* 서버에서 다른 웹 사이트의 데이터를 가져와 응답하기(POST 방식 -> request() 사용) */
var http = require("http");

// 다른 사이트의 정보를 담고 있는 객체 생성
var options = {
  host: "www.google.com",
  port: 80,
  path: "/",
  headers: {}, // request() 사용 시 요청 헤더 직접 설정
};

// POST 방식으로 요청 => request() 메소드 사용
// 다른 서버로부터 응답을 받을 때 data 이벤트 발생
var resData = "";
var req = http.request(options, function (res) {
  // 응답 처리
  res.on("data", function (chunk) {
    resData += chunk; // 받은 데이터를 resData에 담기
  });

  res.on("end", function () {
    // 데이터 수신이 완료되면 end 이벤트 발생
    // 응답 데이터를 모두 받은 후에 출력
    console.log(resData);
  });
});

// request() 메소드 사용 시 요청 헤더와 본문 직접 설정
options.headers["Content-Type"] = "application/x-www-form-urlencoded";
req.data = "q=actor";
options.headers["Content=Length"] = req.data.length;

req.on("error", function (err) {
  console.log("오류 발생 : " + err.message);
});

// 요청 전송
req.write(req.data);
req.end();
