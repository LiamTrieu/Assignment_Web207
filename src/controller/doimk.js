window.doiMK = function (
  $scope,
  checkLogin,
  $http,
  $location,
  $cookies,
  $rootScope,
  loadData
) {
  // loadData.loadProduct();
  // loadData.loadCategory();
  loadData.loadGH();
  $rootScope.isLogin = checkLogin.checkLogin();
  if (!$rootScope.isLogin) {
    $location.path("/trang-chu");
  }
  $scope.hidePass = true;
  $scope.hidePass2 = true;
  $scope.hidePass3 = true;
  user = checkLogin.getUser();
  $scope.userRes = {
    password: "",
    password2: "",
    password3: "",
  };
  $scope.showPass = function () {
    $scope.hidePass = !$scope.hidePass;
    console.log($scope.userRes);
  };
  $scope.showPass2 = function () {
    $scope.hidePass2 = !$scope.hidePass2;
  };
  $scope.showPass3 = function () {
    $scope.hidePass3 = !$scope.hidePass3;
  };

  $scope.doi = function () {
    if (
      $scope.userRes.password == "" ||
      $scope.userRes.password2 == "" ||
      $scope.userRes.password3 == ""
    ) {
      alert("Không được trống");
    } else {
      if ($scope.userRes.password != user.password) {
        alert("Mật khẩu không đúng");
      }
      if ($scope.userRes.password.length < 8) {
        alert("Mật khẩu phải trên 8 khí tự");
      } else {
        if ($scope.userRes.password2 != $scope.userRes.password3) {
          alert("Mật khẩu mới không trùng khớp");
        } else {
          user.password = $scope.userRes.password2;
          $cookies.putObject("user", user);
          $http.put(apiAccount + "/" + user.id, user).then(function (response) {
            alert("Đổi mật khẩu thành công");
            $location.path("trang-chu");
          });
        }
      }
    }
  };
};
