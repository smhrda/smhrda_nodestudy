/* require() 메소드의 동작 방식 이해하기 */
// 가상으로 require() 함수를 정의해 내부적으로 처리되는 방식 이해하기
var require = function (path) {
  var exports = {
    getUser: function () {
      return { id: "test01", name: "콜라" };
    },
    group: { id: "group01", name: "사이다" },
  };
  return exports; // require 호출 시 exports에 할당된 객체 반환
};

var user = require("..."); // path - 모듈 파일의 이름 역할

function showUser() {
  return user.getUser().name + ", " + user.group.name;
}
console.log("사용자 정보 : %s", showUser());
