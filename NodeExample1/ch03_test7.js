/* JS 함수 이해하기 5 */
// 객체를 만드는 동시에 속성을 초기화
var Person = {
  age: 20,
  name: "smhrda",
  add: function (a, b) {
    return a + b;
  },
};

console.log("더하기 : %d", Person.add(10, 10));
