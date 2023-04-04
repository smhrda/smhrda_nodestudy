/* 모듈을 분리할 때 사용하는 코드 패턴 3 -1
   - user10.js 와 달리, exports 객체에 속성으로 추가하는 방법
*/

// 사용 패턴 : exports의 속성 이름을 주면서 추가하되, 프로토타입 객체를 정의한 후 할당
var User = require("./user11").User;

var user = new User("test01", "콜라");

user.printUser();
