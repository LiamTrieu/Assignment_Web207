app.controller(
  "headerCtrl",
  function (checkLogin, $scope, $rootScope, $cookies, $location) {
    $scope.search = "";
    $rootScope.isAdmin = checkLogin.checkRole();
    $rootScope.user = checkLogin.getUser();

    $scope.logout = function () {
      $rootScope.countCart = 0;
      $cookies.remove("user");
      $rootScope.isLogin = false;
      $location.path("dang-nhap");
    };
  }
);
