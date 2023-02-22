window.dangKyCtrl = function (
  $scope,
  $http,
  $cookies,
  $location,
  $rootScope,
  loadData,
  checkLogin
) {
  // loadData.loadProduct();
  // loadData.loadCategory();
  $scope.hidePass = true;
  $scope.hidePass2 = true;
  $scope.checkbox = false;
  $scope.checkFrom = false;
  $scope.pass2 = "";
  $scope.userRes = {
    name: "",
    email: " ",
    password: "",
    role: false,
  };
  $rootScope.isLogin = checkLogin.checkLogin();
  if ($rootScope.isLogin) {
    $location.path("/trang-chu");
  }
  $scope.showPass = function () {
    $scope.hidePass = !$scope.hidePass;
  };
  $scope.showPass2 = function () {
    $scope.hidePass2 = !$scope.hidePass2;
  };
  var u = {};
  $scope.dangKy = function (e, checkmail) {
    e.preventDefault();
    if (
      $scope.userRes.name == "" ||
      $scope.userRes.email == "" ||
      $scope.userRes.password == ""
    ) {
      alert("Không được để trống");
    } else {
      if (checkmail) {
        alert("Mail không đúng định dạng");
      } else {
        if ($scope.userRes.password.length < 8) {
          alert("Mật khẩu phải trên 8 khí tự");
        } else {
          console.log("test");
          $http.post(apiAccount, $scope.userRes).then(function (response) {
            let email = $scope.userRes.email;
            let password = $scope.userRes.password;
            let user = {};
            $http.get(apiAccount).then(function (response) {
              response.data.forEach((e) => {
                if (e.email == email && e.password == password) {
                  user = e;
                }
              });
              $rootScope.isLogin = true;
              $cookies.putObject("user", user);
              console.log(user);
              $location.path("trang-chu");
              alert("Đăng ký thành công");
              $location.path("trang-chu");
            });
          });
        }
      }
    }
  };
};
