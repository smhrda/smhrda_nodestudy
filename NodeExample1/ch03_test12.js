/* 배열 이해하기 5 */
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
];

console.log("unshift() 호출 전 배열 요소의 수 : %d", Users.length);
console.dir(Users);

Users.unshift({ name: "뻥이요", age: 23 }); // unshift(): 배열 앞에 요소 추가
console.log("push() 호출 후 배열 요소의 수 : %d", Users.length);
console.dir(Users);

Users.shift(); // shift(): 배열 앞에 있는 요소 삭제
console.log("pop() 호출 후 배열 요소의 수 : %d", Users.length);
console.dir(Users);
