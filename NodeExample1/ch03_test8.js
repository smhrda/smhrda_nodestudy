/* 배열 이해하기 */
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
];

Users.push({ name: "뻥이요", age: 23 });

console.log("사용자 수 : %d", Users.length);
console.log("첫 번째 사용자 이름 : %s", Users[0].name);
