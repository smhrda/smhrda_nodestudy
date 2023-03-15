/* 배열 이해하기 7 */
// slice(index, copyCount) : 여러 개의 요소를 복사하여 새로운 배열 객체로 만드는 메소드
// - index : 배열의 몇 번째 요소부터 처리할 것인지 지정
// - copyCount : 끝 위치
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
  { name: "뻥이요", age: 23 },
  { name: "아이셔", age: 34 },
];

console.log("배열 요소의 수 : %d", Users.length);
console.log("원본 Users");
console.dir(Users);

var Users2 = Users.slice(1, 3);

console.log("slice()로 잘라낸 후 Users2");
console.dir(Users2);

var Users3 = Users2.slice(1);
console.log("slice()로 잘라낸 후 Users3");
console.dir(Users3);

console.log("원본 Users 확인");
console.dir(Users); // slice()를 사용해도 기존 배열에는 변화 X
