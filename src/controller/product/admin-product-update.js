window.admin_product_update_Ctrl = function (
  $location,
  $http,
  $routeParams,
  checkLogin,
  shareData,
) {
  if (checkLogin.checkRole()) {
    if (
      $routeParams.id !== 0 &&
      $routeParams.id == shareData.getDataProduct().id
    ) {
      if (shareData.getDataProduct().name.trim() == "") {
        $location.path("admin/product/detail/" + $routeParams.id);
      }
      var product = shareData.getDataProduct();
      if (
        !(
          product.name.trim() == "" ||
          !(product.price > 0) ||
          product.dis.trim() == "" ||
          product.category == ""
        )
      ) {
        $http.get(apiProduct).then(function (response) {
          if (product.img.name != undefined) {
            var realPath = product.img;
            var duoiFile = realPath.name.split(".").pop();
            var name = "san-pham-" + product.id + "." + duoiFile;
            product.img = name;
            var data = new FormData();
            data.append("file", realPath);
            data.append("name", name);
            $http.post("http://localhost:8080/fileupload/upload", data, {
              transformResponse: [
                function (data) {
                  return data;
                },
              ],
              headers: {
                "Content-Type": undefined,
              },
            });
          }
          $http
            .put(`${apiProduct}/${$routeParams.id}`, product)
            .then(function () {
              $location.path("admin/product");
              alert("Sửa sản phẩm thành công");
            })
            .catch(function () {
              alert("Sửa sản phẩm thất bại");
            });
        });
      } else {
        alert("Vui lòng điền đầy đủ thông tin");
      }
    }
    $location.path("admin/product/detail/" + $routeParams.id);
  } else {
    $location.path("trang-chu");
  }
};
