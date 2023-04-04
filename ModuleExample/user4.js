/* module.export에 함수만 할당하기 */
// 인터페이스(함수 객체)를 그대로 할당할 수 있음
module.exports = function () {
  return { id: "test01", name: "콜라" };
};
