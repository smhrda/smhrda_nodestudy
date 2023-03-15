/* process 객체 사용해보기 */
// process.argv : 프로세스를 실행할 때 전달되는 파라미터 정보
// argv 속성은 배열 객체 형태
console.log("argv 속성의 파라미터 수 : " + process.argv.length); // 2
console.dir(process.argv); // node.exe파일, js 파일의 경로 2개가 출력됨

if (process.argv.length > 2) {
  console.log("세 번째 파라미터의 값: %s", process.argv[2]);
}
process.argv.forEach(function (item, index) {
  console.log(index + " : ", item);
});
