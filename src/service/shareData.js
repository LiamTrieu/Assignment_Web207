app.service("shareData", function () {
  var category = {};
  var product = {};
  var dh = [];

  return {
    getDataCatefory: function () {
      return category;
    },
    setDataCatefory: function (data) {
      category = data;
    },
    getDataProduct: function () {
      return product;
    },
    setDataProduct: function (data) {
      product = data;
    },
    getDataDH: function () {
      return dh;
    },
    setDataDH: function (data) {
      dh = data;
    },
  };
});
