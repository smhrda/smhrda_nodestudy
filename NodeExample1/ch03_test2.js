/* JS 변수와 자료형 이해하기 2 */
var Person = []; // 변수 선언 및 빈 객체 할당

Person["age"] = 20; // 객체에 속성 넣기(대괄호 사용)
Person["name"] = "smhrda";
Person.mobile = "010-1234-5678"; // 객체에 속성 넣기(점 연산자 사용)

console.log("나이 : %d", Person.age);
console.log("이름 : %s", Person.name);
console.log("전화 : %s", Person["mobile"]);
