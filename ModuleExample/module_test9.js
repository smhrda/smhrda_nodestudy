/* 모듈을 분리할 때 사용하는 코드 패턴 2 -1
   - user8.js와 달리, 모듈의 속성으로 인스턴스 객체를 추가하는 경우
   -> require() 호출 후 반환되는 객체 속성으로 인스턴스 객체를 참조
*/

// 사용 패턴 : exports의 속성 이름을 추가하되, 인스턴스 객체를 만들어 할당
var user = require("./user9").user;

user.printUser();
