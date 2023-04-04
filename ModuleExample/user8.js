/* 모듈을 분리할 때 사용하는 코드 패턴 2
    : 인스턴스 객체를 할당하는 경우
        - 모듈을 불러온 후 해당 객체의 메소드를 호출하거나 속성을 사용
*/

// 사용 패턴 : module.exports에 인스턴스 객체를 만들어 할당

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

module.exports = new User("test01", "콜라"); // 인스턴스 객체를 직접 할당
