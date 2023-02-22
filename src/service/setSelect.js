app.service("setSelect", function () {
  var select = [];

  return {
    getSelect: function () {
      return select;
    },
    setSelect: function (data) {
      select = data;
    },
  };
});
