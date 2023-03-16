/* 주소 문자열과 요청 파라미터 다루기 */
/* 주소 문자열을 URL 객체로 변환하기 */
var url = require("url");

// 주소 문자열을 URL 객체로 만들기
var curURL = url.parse(
  // parse() : 주소 문자열을 파싱하여 URL 객체로 만듦
  "https://m.search.naver.com/search.naver?query=steve+jobs&where=m&sm=mtp_hty"
);
console.dir(curURL);

// URL 객체를 주소 문자열로 만들기
var curStr = url.format(curURL); // format() : URL 객체를 문자열로 변환
console.log("주소 문자열 : %s", curStr);

// 요청 파라미터 구분하기(query 속성의 여러 개의 파라미터를 각각 분리)
var querystring = require("querystring");
var param = querystring.parse(curURL.query); // parse() : 요청 파라미터 문자열을 파싱하여 요청 파라미터 객체로 만듦

console.log("요청 파라미터 중 query의 값 : %s", param.query); // -> steve jobs
console.log("원본 요청 파라미터 : %s", querystring.stringify(param)); // stringfy() : 요청 파라미터 객체를 문자열로 변환
