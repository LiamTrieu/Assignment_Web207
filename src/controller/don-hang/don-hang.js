window.donhang = function ($scope, $http, shareData) {
  $scope.trangThai = "1";
  $scope.urlAdmin = "pages/admin-hoadon.html";
  var carts = [];
  var products = [];
  var dh = [];
  var dh2 = [];

  $http.get(apiCart).then(function (response) {
    response.data.forEach(function (e) {
      carts = e;
      carts.product.forEach(function (e2) {
        products.push(e);
        dh = {
          id: e.id,
          idsp: e2.idsp,
          sanPham: e2.name + " x" + e2.sl,
          thongTin: e.ten + " - " + e.sdt + " - " + e.diachi,
          trangthai: e2.status,
        };
        dh2.push(dh);
      });
    });
  });
  $scope.donHang = dh2;

  $scope.chage = function (trangthai, id, idsp, event) {
    event.preventDefault();
    var cart = {};
    var product = {};
    $http.get(apiCart + "/" + id).then(function (response) {
      cart = response.data;
      cart.product.forEach(function (e) {
        if (e.idsp == idsp) {
          $http.get(apiProduct + "/" + idsp).then(function (r) {
            product = r.data;
            cart.product.forEach(function (e2) {
              if (e2.idsp == idsp) {
                if (trangthai == 2) {
                  product.soluong -= cart.product.sl;
                  $http.put(apiProduct + "/" + product.id, product);
                }
                if (trangthai == 4) {
                  product.soluongban += cart.product.sl;
                  $http.put(apiProduct + "/" + product.id, product);
                }
                if (trangthai == 5) {
                  if (cart.status > 1) {
                    product.soluong += cart.product.sl;
                  }
                  $http.put(apiProduct + "/" + product.id, product);
                }
                e2.status = trangthai;
                $http.put(apiCart + "/" + id, cart).then(function (r) {
                  alert("Đã đổi trạng thái đơn hàng");
                });
              }
            });
          });
        }
      });
    });
  };
};
