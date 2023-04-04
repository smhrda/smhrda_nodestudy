/* exports에 객체 지정하기 */

// user2.js 파일에서 exports에 객체를 할당
//  -> exports는 모듈 처리 시 속성으로 인식되므로 객체를 할당하면 전역 변수가 아닌 단순 변수로 인식됨
//  -> require()를 호출할 때 자바스크립트에서 새로운 변수로 처리함
//  => 아무 속성도 없는 {} 객체가 반환됨

var user = require("./user2");

console.dir(user); // => {} 객체가 반환됨

function showUser() {
  return user.getUser().name + ", " + user.group.name;
  // user.getUser is not a function 오류 발생!
}

console.log(showUser());

/* ==> 객체를 그대로 할당하기 위해서는 module.exports를 사용해야 함! */
