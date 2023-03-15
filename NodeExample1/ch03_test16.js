/* 콜백 함수 이해하기 2 */
function add(a, b, callback) {
  var result = a + b;
  callback(result); // 콜백 함수 호출

  var history = function () {
    return a + "+" + b + "=" + result;
  };

  return history; // 함수 안에서 새로운 함수 객체를 만들어 반환
}

var add_history = add(10, 10, function (result) {
  console.log("파라미터로 전달된 콜백 함수 호출됨");
  console.log("add(10,10)의 결과 : %d", result);
});

console.log("결과 값으로 받은 함수 실행 결과 : " + add_history());
