window.dangNhapCtrl = function (
  $scope,
  $http,
  $location,
  $cookies,
  checkLogin,
  $rootScope,
  loadData
) {
  // loadData.loadProduct();
  // loadData.loadCategory();
  $scope.showpass = false;
  $rootScope.isLogin = checkLogin.checkLogin();
  if ($rootScope.isLogin) {
    $location.path("/trang-chu");
  }
  $scope.dangNhap = function (e) {
    e.preventDefault();
    let email = $scope.email_dang_nhap;
    let password = $scope.password_dang_nhap;
    let user = {};
    $http.get(apiAccount).then(function (response) {
      response.data.forEach((e) => {
        if (e.email === email && e.password === password) {
          user = e;
        }
      });
      // $http.get(apiCart).then(function (response) {
      //   var count = 0;
      //   response.data.forEach((e) => {
      //     if (e.user == user.id && e.status == 0) {
      //       count++;
      //     }
      //   });
      //   $rootScope.countCart = count;
      // });
      if (Object.keys(user).length === 0) {
        alert("Tai khoan mat khau khong chinh xac");
      } else {
        $rootScope.isLogin = true;
        $cookies.putObject("user", user);
        $rootScope.user = checkLogin.getUser();
        if (user.role) {
          $location.path("admin/product");
        } else {
          $location.path("trang-chu");
        }
      }
    });
  };
};
