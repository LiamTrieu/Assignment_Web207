window.admin_product_add_Ctrl = function (
  $location,
  $http,
  shareData,
  checkLogin
) {
  var product = {
    name: shareData.getDataProduct().name,
    price: shareData.getDataProduct().price,
    soluong: shareData.getDataProduct().soluong,
    soluongban: 0,
    img: shareData.getDataProduct().img,
    dis: shareData.getDataProduct().dis,
    category: shareData.getDataProduct().category,
    deleted: false,
    date: new Date(),
  };
  if (checkLogin.checkRole()) {
    if (!(Object.keys(product).length === 0)) {
      if (
        !(
          product.name.trim() == "" ||
          !(product.price > 0) ||
          product.dis.trim() == ""
        )
      ) {
        $http
          .post(apiProduct, product)
          .then(function (r) {
            var realPath = product.img;
            var duoiFile = realPath.name.split(".").pop();
            var name = "san-pham-" + r.data.id + "." + duoiFile;
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
            $http.put(apiProduct + "/" + r.data.id, product).then(function () {
              alert("Thêm sản phẩm thành công");
            });
          })
          .catch(function () {
            alert("Thêm sản phẩm thất bại");
          });
      } else {
        alert("Vui lòng điền đầy đủ thông tin");
      }
      $location.path("admin/product");
    }
  } else {
    $location.path("trang-chu");
  }
};
