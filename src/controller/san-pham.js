window.sanPhamCtrl = function (
  $scope,
  $http,
  getGH,
  checkLogin,
  loadData,
  $location,
  addCart
) {
  $scope.dc = {
    ten: "",
    sdt: "",
    dc: "",
  };
  loadData.loadProduct();
  loadData.loadCategory();
  loadData.loadGH();
  $scope.cateView = "Tất cả sản phẩm";
  var idUser = checkLogin.getUser().id;
  $scope.slMua = 1;
  $scope.sp = {
    price: 0,
    soluong: 0,
  };
  $scope.checkSP = function (id) {
    let flag = true;
    getGH.getGH().forEach((e) => {
      if (e.product == id && e.user == idUser && e.status == 0) {
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
  $scope.addCart2 = function (id, check) {
    if (checkLogin.checkLogin()) {
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
      alert("Vui lòng đăng nhập");
    }
  };
  $scope.addCart = function (id) {
    if (checkLogin.checkLogin()) {
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
      alert("Vui lòng đăng nhập");
    }
  };
  $scope.updateSl = function (TG) {
    if (TG) {
      $scope.slMua++;
    } else {
      $scope.slMua--;
    }
  };
};
