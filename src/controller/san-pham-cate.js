window.sanPhamCateCtrl = function (
  $scope,
  $http,
  getGH,
  checkLogin,
  $routeParams,
  $rootScope,
  loadData
) {
  loadData.loadProduct();
  loadData.loadCategory();
  $http.get(apiCategory + "/" + $routeParams.id).then(function (response) {
    $scope.cateView = response.data.name;
  });
  var idUser = checkLogin.getUser().id;
  $scope.slMua = 1;
  $scope.sp = {
    price: 0,
    soluong: 0,
  };
  $scope.checkSP = function (id) {
    let flag = true;
    getGH.getGH().forEach((e) => {
      if (e.product == id) {
        flag = false;
        $scope.idgh = e.id;
        $scope.slCo = e.soluong;
      }
    });
    return flag;
  };
  $scope.showCart = function (id) {
    $http.get(apiProduct + "/" + id).then(function (response) {
      $scope.sp = response.data;
    });
  };
  $scope.addCart = function (id) {
    var cart = {
      user: idUser,
      product: id,
      status: 0,
      soluong: $scope.slMua,
    };
    if ($scope.checkSP(id)) {
      $http.post(apiCart, cart).then(function () {});
    } else {
      console.log($scope.sp);
      var cart2 = {
        user: idUser,
        product: id,
        status: 0,
        soluong: $scope.slCo + $scope.slMua,
      };
      console.log(cart2);
      $http.put(apiCart + "/" + $scope.idgh, cart2).then(function () {});
    }
  };
  $scope.updateSl = function (TG) {
    if (TG) {
      $scope.slMua++;
    } else {
      $scope.slMua--;
    }
  };

  $http.get(apiProduct).then(function (response) {
    if (response.status === 200) {
      var prd = [];
      response.data.forEach(function (e) {
        if (e.category == $routeParams.id) {
          prd.push(e);
        }
      });
      $rootScope.product = prd;
    }
  });
};
