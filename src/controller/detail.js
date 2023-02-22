window.detailCtrl = function (
  $http,
  $routeParams,
  $scope,
  checkLogin,
  getGH,
  loadData,
  $location,
  addCart
) {
  loadData.loadProduct();
  loadData.loadGH();
  // loadData.loadCategory();
  var idUser = checkLogin.getUser().id;
  var id = $routeParams.id;
  $scope.detailSp = {};
  $scope.slMua = 1;
  $scope.dc = {
    ten: "",
    sdt: "",
    dc: "",
  };
  $http.get(apiProduct + "/" + $routeParams.id).then(function (response) {
    $scope.detailSp = response.data;
  });
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
  $scope.checkSP = function () {
    let flag = true;
    getGH.getGH().forEach((e) => {
      if (e.product == $scope.detailSp.id) {
        flag = false;
        $scope.idgh = e.id;
        $scope.slCo = e.soluong;
      }
    });
    return flag;
  };
  $scope.addCart = function () {
    if (checkLogin.checkLogin()) {
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
  $scope.addCart2 = function (check) {
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
            $http.post(apiCart, cart).then(function () {});
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
};
