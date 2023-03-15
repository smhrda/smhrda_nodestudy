/* 외장 모듈 사용하기 */
var nconf = require("nconf"); // nconf : 시스템 환경 변수에 접근
nconf.env();

console.log("OS 환경 변수의 값 : %s", nconf.get("OS"));
