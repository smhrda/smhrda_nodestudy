/* 배열 이해하기 2 */
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
];

var add = function (a, b) {
  return a + b;
};
Users.push(add); // 배열에 함수 넣기

Users.push({ name: "뻥이요", age: 23 });

console.log("배열 요소의 수 : %d", Users.length);
console.log("세 번째 요소로 추가된 함수 실행: %d", Users[2](10, 10));
