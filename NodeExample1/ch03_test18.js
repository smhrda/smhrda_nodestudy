/* 프로토타입 객체 만들기 */
// 생성자 함수 만들기(프로토타입 객체 만들기)
function Person(name, age) {
  this.name = name; // this : 함수를 호출한 객체
  this.age = age;
}

// Person 객체는 틀 -> prototype 속성에 함수나 데이터를 추가하면 인스턴스 생성 시 메모리를 효율적으로 관리할 수 있음
Person.prototype.walk = function (speed) {
  console.log(speed + "km 속도로 걸어갑니다.");
};

// new 연산자를 사용하여 인스턴스 객체 만들기
var person01 = new Person("smhrda", 20);
var person02 = new Person("smhrdb", 25);

console.log(person01.name + "객체의 walk(10)을 호출합니다.");
person01.walk(10);
