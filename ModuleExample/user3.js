/* module.exports를 사용해서 객체를 그대로 할당하기 */
var user = {
  getUser: function () {
    return { id: "test01", name: "콜라" };
  },
  group: { id: "group01", name: "사이다" },
};

// module.exports에서는 객체를 그대로 할당할 수 있음
module.exports = user;
