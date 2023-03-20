/* 간단한 웹서버 만들기 7 */
/* 서버에서 다른 웹 사이트의 데이터를 가져와 응답하기(GET 방식) */
var http = require("http");

// 다른 사이트의 정보를 담고 있는 객체 생성
var options = {
  host: "www.google.com",
  port: 80,
  path: "/",
};

// GET 방식 사용
// 다른 서버로부터 응답을 받을 때 data 이벤트 발생
var req = http.get(options, function (res) {
  // 응답 처리
  var resData = "";
  res.on("data", function (chunk) {
    resData += chunk; // 받은 데이터를 resData에 담기
  });

  res.on("end", function () {
    // 데이터 수신이 완료되면 end 이벤트 발생
    // 응답 데이터를 모두 받은 후에 출력
    console.log(resData);
  });
});

req.on("error", function (err) {
  console.log("오류 발생 : " + err.message);
});
