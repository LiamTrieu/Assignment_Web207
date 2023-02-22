app.service("addCart", function ($http, checkLogin, $rootScope) {
  var user = $rootScope.user;
  var cart = [];
  return {
    add: function (cart) {
      $http.patch(apiAccount + "/" + user.id, cart);
    },
    checkSL: function (sl, slsp) {
      console.log(sl);
      return sl > 0 && sl <= slsp;
    },
  };
});
