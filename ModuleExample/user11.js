/* 모듈을 분리할 때 사용하는 코드 패턴 3 -1
   - user10.js 와 달리, exports 객체에 속성으로 추가하는 방법
*/

// 생성자 함수
function User(id, name) {
  this.id = id; // 전달받은 파라미터를 객체의 속성으로 추가
  this.name = name;
}

User.prototype.getUser = function () {
  return { id: this.id, name: this.name };
};

User.prototype.group = { id: "group01", name: "사이다" };

User.prototype.printUser = function () {
  console.log("user 이름 : %s, group 이름 : %s", this.name, this.group.name);
};

// exports에 User 속성을 추가한 후 프로토타입 객체를 지정
exports.User = User;
