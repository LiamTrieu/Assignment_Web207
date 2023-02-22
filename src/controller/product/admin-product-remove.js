window.admin_product_remove_Ctrl = function (
  $location,
  $http,
  $routeParams,
  checkLogin
) {
  if (checkLogin.checkRole()) {
    if ($routeParams.id !== 0) {
      let product = {};
      $http.get(`${apiProduct}/${$routeParams.id}`).then(function (res) {
        if (res.statusText === "OK") {
          product = res.data;
          if (!(Object.keys(product).length === 0)) {
            product.deleted = !product.deleted;
            $http
              .put(`${apiProduct}/${product.id}`, product)
              .then(function (r) {
                if (product.deleted) {
                  alert("Xóa sản phẩm thành công");
                } else {
                  alert("Khôi phục sản phẩm thành công");
                }
              })
              .catch(function () {
                if (product.deleted) {
                  alert("Xóa sản phẩm thất bại");
                } else {
                  alert("Khôi phục sản phẩm thất bại");
                }
              });
          }
        }
      });

      $location.path("admin/product");
    }
  } else {
    $location.path("trang-chu");
  }
};
