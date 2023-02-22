app.service("addCart", function ($http, checkLogin, $rootScope) {
  var user = $rootScope.user;
  var cart = [];
  return {
    add: function (cart) {
      $http.patch(apiAccount + "/" + user.id, cart);
    },
  };
});
