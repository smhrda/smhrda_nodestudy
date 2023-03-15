/* 배열 이해하기 4 */
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
];

console.log("push() 호출 전 배열 요소의 수 : %d", Users.length);
console.dir(Users);

Users.push({ name: "뻥이요", age: 23 }); // push(object): 배열 끝에 요소 추가
console.log("push() 호출 후 배열 요소의 수 : %d", Users.length);
console.dir(Users);

Users.pop(); // pop(): 배열 끝에 있는 요소 삭제
console.log("pop() 호출 후 배열 요소의 수 : %d", Users.length);
console.dir(Users);
