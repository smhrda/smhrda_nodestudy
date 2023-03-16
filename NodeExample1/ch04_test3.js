/* 이벤트 이해하기 2*/
process.on("tick", function (count) {
  console.log("tick 이벤트 발생함 : %s", count); // tick 이벤트 발생 시 호출되는 함수
});

setTimeout(function () {
  console.log("2초 후에 tick 이벤트 전달 시도함");

  process.emit("tick", "2"); // tick 이벤트를 process 객체로 전달
}, 2000);
