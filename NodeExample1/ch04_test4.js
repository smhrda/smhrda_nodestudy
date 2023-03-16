/* 이벤트 이해하기 3*/
/* calc3.js 의 계산기 모듈 사용하기 */
var Calc = require("./calc3");

// 인스턴스 객체 생성
var calc = new Calc();

// stop 이벤트 전달(Calc 객체는 EventEmitter를 상속 -> on, emit 사용 OK)
calc.emit("stop");

console.log(Calc.title + "에 stop 이벤트를 전달함");
