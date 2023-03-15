/* 콘솔 메소드 사용해보기 */
var result = 0;

console.time("duration_sum"); // console.time(id) : 실행 시간 측정을 위한 시작 시간 기록

for (var i = 1; i <= 100000; i++) {
  result += i;
}

console.timeEnd("duration_sum"); // console.timeEnd(id) : 실행 시간 측정을 위한 끝 시간 기록
console.log("1부터 100000까지 더한 결과 : %d", result);

var Person = { name: "smhrda", age: 25 };
console.dir(Person); // console.dir(object) : 객체의 속성들 출력

/* 전역 변수 사용해보기 */
console.log("현재 실행한 파일의 이름 : %s", __filename); // 파일의 전체 경로 출력
console.log("현재 실행한 파일의 경로 : %s", __dirname); // 폴더의 전체 경로 출력
