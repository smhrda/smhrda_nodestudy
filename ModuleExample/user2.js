/* exports에 객체 지정하기 */
// exports는 속성 -> exports에 속성을 추가하면 모듈에서 접근 /
//                   exports에 객체를 지정하면 자바스크립트에서 새로운 단순 변수로 처리함

exports = {
  getUser: function () {
    return { id: "test01", name: "콜라" };
  },
  group: { id: "group01", name: "사이다" },
};
