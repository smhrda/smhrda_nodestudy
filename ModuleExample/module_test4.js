/* module.export에 함수만 할당하기 */

// require() 호출 -> module.exports에 할당된 익명 함수가 반환됨
var user = require("./user4");

function showUser() {
  return user().name + ", " + "No Group"; // user변수에 함수를 할당 -> user()로 실행 가능
}

console.log("사용자 정보 : %s", showUser());
