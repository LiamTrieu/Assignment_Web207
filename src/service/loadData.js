app.service("loadData", function ($rootScope, $http, checkLogin) {
  this.loadProduct = function () {
    $http.get(apiProduct).then(function (response) {
      $rootScope.product = response.data;
    });
  };
  this.loadCategory = function () {
    $http.get(apiCategory).then(function (response) {
      $rootScope.category = response.data;
    });
  };

  this.loadGH = function () {
    if (checkLogin.checkLogin()) {
      $http
        .get(apiAccount + "/" + checkLogin.getUser().id)
        .then(function (response) {
          var count = 0;
          response.data.cart.forEach((e) => {
            count++;
          });
          $rootScope.countCart = count;
        });
    } else {
      $rootScope.countCart = 0;
    }
  };
});
