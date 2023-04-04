/* exports 객체의 속성으로 함수와 객체 추가하기 */

// require() 메소드 사용 => exports 객체를 반환
var user1 = require("./user1");

function showUser() {
  return user1.getUser().name + ", " + user1.group.name;
}

console.log("사용자 정보 : %s", showUser());
