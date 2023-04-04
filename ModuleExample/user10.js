/* 모듈을 분리할 때 사용하는 코드 패턴 3
    : 프로토타입 객체를 할당하는 패턴
    - 인스턴스를 객체를 만든 후 할당하는 것이 아니라, 객체 자체를 할당
    -> 필요시 직접 인스턴스 객체를 만들어 사용할 수 있다는 장점
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

// 사용 패턴 : module.exports에 프로토타입 객체를 정의한 후 할당함
module.exports = User;
