/* process 객체 사용해보기 */
// process.env : 환경 변수 정보(사용자 정의 환경 변수와 시스템 환경 변수 모두 접근 가능)
console.dir(process.env);
console.log("OS 환경 변수의 값 : " + process.env["OS"]);
