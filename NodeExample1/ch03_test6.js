/* JS 함수 이해하기 4 */
var Person = [];

Person["age"] = 20;
Person["name"] = "smhrda";

var oper = function (a, b) {
  return a + b;
};

Person["add"] = oper; // 변수에 함수 할당 후 객체의 속성으로 추가

console.log("더하기 : %d", Person.add(10, 10));
