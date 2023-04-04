/* 모듈을 분리할 때 사용하는 코드 패턴 2 -1
   - user8.js와 달리, 모듈의 속성으로 인스턴스 객체를 추가하는 경우
   -> require() 호출 후 반환되는 객체 속성으로 인스턴스 객체를 참조
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

// 모듈의 속성으로 인스턴스 객체를 추가하는 경우
exports.user = new User("test01", "콜라");
