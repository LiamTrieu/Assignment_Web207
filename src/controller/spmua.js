window.spmua = function (
  $scope,
  loadData,
  $http,
  checkLogin,
  $rootScope,
  $location
) {
  // loadData.loadProduct();
  // loadData.loadCategory();
  loadData.loadGH();
  $scope.prds = [];
  $rootScope.isLogin = checkLogin.checkLogin();
  var user = checkLogin.getUser();
  if (!$rootScope.isLogin) {
    $location.path("/trang-chu");
  }

  $scope.trangThai = "";
  $http.get(apiCart + "?" + "user" + "=" + user.id).then(function (response) {
    var prd = {};
    response.data.forEach((e) => {
      e.product.forEach(function (e2) {
        prd = {
          id: e.id,
          idsp: e2.idsp,
          name: e2.name,
          img: e2.img,
          price: e2.price,
          soluong: e2.sl,
          tong: e2.price * e2.sl,
          trangthai: e2.status,
          diachi: `${e.ten} - ${e.sdt} - ${e.diachi}`,
        };
        $scope.prds.push(prd);
      });
    });
  });

  $scope.remove = function (id, idsp) {
    var cart = {};
    var product = {};
    $http.get(apiCart + "/" + id).then(function (response) {
      cart = response.data;
      cart.product.forEach(function (e) {
        if (e.idsp === idsp) {
          if (e.status > 1) {
            $http.get(apiProduct + "/" + idsp).then(function (response) {
              product = response.data;
              product.soluong += e.sl;
              $http.put(apiProduct + "/" + product.id, product);
            });
          }
          e.status = 5;
          $http.put(apiCart + "/" + id, cart);
        }
      });
    });
  };
};
