/* 배열 이해하기 6 */
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
  { name: "뻥이요", age: 23 },
];

console.log(
  "delete 키워드로 배열 요소 삭제 전 배열 요소의 수 : %d", // 3
  Users.length
);

delete Users[1];
console.log(
  "delete 키워드로 배열 요소 삭제 후 배열 요소의 수 : %d", // 삭제 후에도 그대로 3
  Users.length
);
console.dir(Users); // delete 사용 시, 빈 공간은 그대로 있고 객체만 삭제됨 -> undefined로 남음 주의!!!  => splice() 사용 권장

// splice(index, removeCount, [Object]): 여러 개의 객체를 요소로 추가하거나 삭제하는 메소드
// - index : 배열의 몇 번째 요소부터 처리할 것인지 지정
// - removeCount : 삭제할 요소의 개수를 지정(값을 추가하고 싶다면 0으로)
// - [Object] : 추가하려는 객체
var Users = [
  { name: "쿠크다스", age: 25 },
  { name: "프링글스", age: 22 },
  { name: "뻥이요", age: 23 },
];

console.log("기존 배열 : ");
console.dir(Users);

Users.splice(1, 0, { name: "아이셔", age: 34 });
console.log("splice()로 요소를 인덱스 1에 추가한 후 : ");
console.dir(Users);

Users.splice(2, 1);
console.log("splice()로 인덱스 2의 요소를 1개 삭제한 후 : ");
console.dir(Users);
