/* JS 함수 이해하기 3 */
var Person = [];

Person["age"] = 20;
Person["name"] = "smhrda";
// 객체의 속성으로 추가
Person.add = function (a, b) {
  return a + b;
};

console.log("더하기 : %d", Person.add(10, 10));
