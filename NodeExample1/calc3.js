/* 이벤트 이해하기 3*/
/* 계산기 객체를 모듈로 만들기 */
var util = require("util");
var EventEmitter = require("events").EventEmitter; // EventEmitter은 events 모듈 안에 속성으로 정의되어 있음

// 계산기 객체(프로토타입 객체)
var Calc = function () {
  var self = this;

  this.on("stop", function () {
    console.log("Calc에 stop event 전달됨");
  });
};

util.inherits(Calc, EventEmitter); // util 모듈의 util.inherits() : 상속을 정의하는 메소드

Calc.prototype.add = function (a, b) {
  return a + b;
};
module.exports = Calc;
module.exports.title = "calculator";
