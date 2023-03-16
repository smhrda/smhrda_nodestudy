/* 이벤트 이해하기 */
// process 객체는 노드에서 언제든지 사용 가능 + 내부적으로 EventEmitter를 상속 -> on()과 emit() 바로 사용 OK
process.on("exit", function () {
  // on(event, listener) : 지정한 이벤트의 리스너를 추가하는 메소드
  console.log("exit 이벤트 발생함");
});

setTimeout(function () {
  console.log("2초 후에 시스템 종료 시도함");

  process.exit();
}, 2000);
