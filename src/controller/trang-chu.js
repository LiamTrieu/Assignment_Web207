window.trangChuCtrl = function (
  $scope,
  $http,
  checkLogin,
  addCart,
  $routeParams,
  loadData,
  $location
) {
  loadData.loadProduct();
  loadData.loadGH();
  // loadData.loadCategory();
  $scope.text = $routeParams.text;
  var idUser = checkLogin.getUser().id;
  var user = [];
  $scope.dc = {
    ten: "",
    sdt: "",
    dc: "",
  };
  $scope.slMua = 1;
  // $scope.sp = {
  //   price: 0,
  //   soluong: 0,
  // };
  $scope.updateSl = function (TG) {
    if (TG) {
      if ($scope.slMua < $scope.sp.soluong) {
        $scope.slMua++;
      }
    } else {
      if ($scope.slMua > 1) {
        $scope.slMua--;
      }
    }
  };
  $scope.showCart = function (id) {
    $http.get(apiProduct + "/" + id).then(function (response) {
      $scope.sp = response.data;
    });
  };
  $scope.addCart2 = function (id, check) {
    if (checkLogin.checkLogin()) {
      if ($scope.sp.soluong > 0) {
        if (check) {
          $http.get(apiProduct + "/" + id).then(function (r) {
            var cart = {
              user: idUser,
              product: [
                {
                  idsp: id,
                  name: r.data.name,
                  sl: $scope.slMua,
                  price: r.data.price,
                  img: r.data.img,
                  status: 1,
                },
              ],
              ten: $scope.dc.ten,
              sdt: $scope.dc.sdt,
              diachi: $scope.dc.dc,
            };
            $location.path("san-pham-da-mua");
            alert("Mua sản phẩm thành công");
            $http.post(apiCart, cart);
          });
        } else {
          alert("Thiếu thông tin");
        }
      } else {
        alert("Sản phẩm đã hết hàng");
      }
    } else {
      alert("Vui lòng đăng nhập");
    }
  };
  $scope.addCart = function (id) {
    if (checkLogin.checkLogin()) {
      console.log($scope.sp);
      if ($scope.sp.soluong > 0) {
        $http.get(apiAccount + "/" + idUser).then(function (response) {
          user = response.data;
          if (user.cart != []) {
            var flag = true;
            user.cart.forEach((e) => {
              if (id == e.idsp) {
                user.cart[user.cart.indexOf(e)].soluong += $scope.slMua;
                flag = false;
              }
            });
            if (flag) {
              user.cart.push({
                idsp: id,
                soluong: $scope.slMua,
              });
            }
          } else {
            user.cart.push({
              idsp: id,
              soluong: $scope.slMua,
            });
          }
          alert("Đã thêm sản phẩm vào giỏ hàng");
          addCart.add(user);
        });
      } else {
        alert("Sản phẩm đã hết hàng");
      }
    } else {
      alert("Vui lòng đăng nhập");
    }
  };
};
