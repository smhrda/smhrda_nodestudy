/* 콜백 함수 이해하기 3 */
function add(a, b, callback) {
  var result = a + b;
  callback(result); // 콜백 함수 호출

  var count = 0;

  var history = function () {
    count++; // history 함수를 몇 번 실행했는지 카운트하는 변수
    return count + " : " + a + "+" + b + "=" + result;
  };

  return history; // 함수 안에서 새로운 함수를 만들어 반환 -> 예외적으로 add 안의 count 변수에 접근 허용(클로저Closure)
}

var add_history = add(10, 10, function (result) {
  console.log("파라미터로 전달된 콜백 함수 호출됨");
  console.log("add(10,10)의 결과 : %d", result);
});

console.log("결과 값으로 받은 함수 실행 결과 : " + add_history());
console.log("결과 값으로 받은 함수 실행 결과 : " + add_history());
console.log("결과 값으로 받은 함수 실행 결과 : " + add_history());
