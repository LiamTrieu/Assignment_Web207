window.gioHangCtrl = function (
  $scope,
  $rootScope,
  $http,
  checkLogin,
  $location,
  loadData,
  addCart
) {
  // loadData.loadProduct();
  // loadData.loadCategory();
  loadData.loadGH();
  var user = checkLogin.getUser();
  // var prd = $rootScope.product;
  var idUser = checkLogin.getUser().id;
  var sanPham = [];
  $scope.ck = false;
  if (!checkLogin.checkLogin()) {
    alert("Vui lòng đăng nhập để sử dụng");
    $location.path("/dang-nhap");
  }
  $scope.selectAll = true;
  $scope.dc = {
    ten: "",
    sdt: "",
    dc: "",
  };
  $scope.idSelect = [];
  $scope.getCheckbox = function (value) {
    let index = $scope.idSelect.indexOf(value);
    if (index !== -1) {
      $scope.idSelect.splice(index, 1);
    } else {
      $scope.idSelect.push(value);
    }
  };
  $scope.checkAll = function () {
    $scope.ck = !$scope.ck;
    if ($scope.ck) {
      $scope.idSelect = [];
      $scope.sp.forEach(function (e) {
        $scope.idSelect.push(e);
      });
    } else {
      $scope.idSelect = [];
    }
  };
  $http.get(apiAccount + "/" + idUser).then(function (response) {
    var gh = response.data.cart;
    gh.forEach(function (e) {
      $http.get(apiProduct + "/" + e.idsp).then(function (response) {
        sanPham.push({
          idsp: response.data.id,
          name: response.data.name,
          sl: e.soluong,
          price: response.data.price,
          img: response.data.img,
        });
      });
    });
    $scope.sp = sanPham;
  });

  $scope.getTong = function () {
    var tong = 0;
    sanPham.forEach(function (e) {
      tong += e.price * e.sl;
    });
    return tong;
  };
  $scope.getTong2 = function () {
    var tong = 0;
    $scope.idSelect.forEach(function (e) {
      tong += e.price * e.sl;
    });
    return tong;
  };

  $scope.removeTong = function () {
    if (confirm("Xác nhận xóa tất cả sản phẩm")) {
      // var tempSp = $scope.sp;
      // var tempSp2 = $scope.sp;
      // var tempSp3 = [];
      // tempSp.forEach(function (e) {
      //   tempSp2.splice(tempSp2.indexOf(e), 1);
      // });
      // tempSp2.forEach(function (e) {
      //   tempSp3.push({ idsp: e.idsp, soluong: e.sl });
      // });
      // console.log(tempSp3);
      $scope.sp = [];
      user.cart = [];
      addCart.add(user);
    }
  };
  $scope.removeselect = function () {
    if ($scope.idSelect.length > 0) {
      if (confirm("Xác nhận xóa tất cả sản phẩm đã chọn")) {
        user.cart = [];
        $scope.idSelect.forEach(function (e) {
          $scope.sp.splice($scope.sp.indexOf(e), 1);
        });
        $scope.sp.forEach(function (e) {
          user.cart.push({ idsp: e.idsp, soluong: e.sl });
        });
        // console.log(user);
        addCart.add(user);
      }
    }
  };
  $scope.remove = function (id) {
    user.cart = [];
    if (confirm("Xác nhận xóa sản phẩm")) {
      $scope.sp.forEach(function (e) {
        if (e.idsp == id) {
          $scope.sp.splice($scope.sp.indexOf(e), 1);
        }
      });
      $scope.sp.forEach(function (e) {
        user.cart.push({ idsp: e.idsp, soluong: e.sl });
      });
      addCart.add(user);
    }
  };

  $scope.update = function () {
    user.cart = [];
    $scope.sp.forEach(function (e) {
      var cart = {
        soluong: e.sl,
        idsp: e.idsp,
      };
      user.cart.push(cart);
    });
    $http.get(apiProduct).then(function (response) {
      var check = false;
      response.data.forEach(function (e) {
        user.cart.forEach(function (e2) {
          if (e2.idsp == e.id) {
            if (e2.soluong <= 0 || e2.soluong > e.soluong) {
              check = true;
            }
          }
        });
      });
      if (check) {
        alert("Số lượng không hợp lệ");
      } else {
        alert("Cập nhập giỏ hàng thành công");
        addCart.add(user);
      }
    });
  };

  $scope.thanhToan = function (event, check) {
    event.preventDefault();
    var cartgh = $scope.sp;
    if ($scope.idSelect.length > 0) {
      if (check) {
        user.cart = [];
        var cart = {
          user: idUser,
          product: [],
          ten: $scope.dc.ten,
          sdt: $scope.dc.sdt,
          diachi: $scope.dc.dc,
        };
        $scope.idSelect.forEach(function (e) {
          cart.product.push({
            idsp: e.idsp,
            name: e.name,
            sl: e.sl,
            price: e.price,
            img: e.img,
            status: 1,
          });
          if (cartgh.indexOf(e) > -1) {
            cartgh.splice($scope.sp.indexOf(e), 1);
          }
        });
        user.product = cartgh;
        $http.post(apiCart, cart);
        addCart.add(user);
        alert("Đặt hàng thành công");
        $location.path("san-pham-da-mua");
      } else {
        alert("Thiếu thông tin");
      }
    }
  };
};
