/* exports 객체의 속성으로 함수와 객체 추가하기 */

// exports 객체 속성으로 함수 추가
exports.getUser = function () {
  return { id: "test01", name: "함수 추가" };
};

// exports 객체 속성으로 객체 추가
exports.group = { id: "group01", name: "객체 추가" };
