window.admin_category_update_Ctrl = function (
  $location,
  $http,
  $routeParams,
  checkLogin,
  loadData,
  shareData
) {
  if (checkLogin.checkRole()) {
    if (
      $routeParams.id !== 0 &&
      $routeParams.id == shareData.getDataCatefory().id
    ) {
      if (shareData.getDataCatefory().name.trim() == "") {
        $location.path("admin/category/detail/" + $routeParams.id);
      }
      $http
        .put(`${apiCategory}/${$routeParams.id}`, shareData.getDataCatefory())
        .then(function (r) {
          alert("Sửa loại sản phẩm thành công");
        })
        .catch(function () {
          alert("Sửa loại sản phẩm thất bại");
        });
    }
    $location.path("admin/category");
  } else {
    $location.path("trang-chu");
  }
};
