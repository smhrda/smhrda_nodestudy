/* 배열 이해하기 3 */
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
  { name: "뻥이요", age: 23 },
];

console.log("배열 요소의 수 : %d", Users.length);

// 요소 하나씩 확인하기 - 반복문 사용
for (var i = 0; i < Users.length; i++) {
  console.log("배열 요소 #" + i + " : %s", Users[i].name);
}
// 요소 하나씩 확인하기 - forEach 사용
console.log("\nforEach 구문 사용하기");
Users.forEach(function (item, index) {
  // item - 배열의 각 요소, index - 각 요소의 인덱스 값
  console.log("배열 요소 #" + index + " : %s", item.name);
});
