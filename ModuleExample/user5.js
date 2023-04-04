/* module.exports와 exports 함께 사용하기 */
// modules.exports가 우선적으로 적용됨
// -> module.exports에 할당된 객체, 속성 참조 가능
//    / exports 전역 변수는 무시됨
// => module.exports 사용 권장

module.exports = {
  getUser: function () {
    return { id: "test01", name: "콜라" };
  },
  group: { id: "group01", name: "사이다" },
};

exports.group = { id: "group02", name: "환타" };
