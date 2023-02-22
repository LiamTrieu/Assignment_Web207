window.admin_category_remove_Ctrl = function (
  $location,
  $http,
  $routeParams,
  checkLogin
) {
  if (checkLogin.checkRole()) {
    if ($routeParams.id !== 0) {
      let category = {};
      $http.get(`${apiCategory}/${$routeParams.id}`).then(function (res) {
        if (res.statusText === "OK") {
          category = res.data;
          if (!(Object.keys(category).length === 0)) {
            category.deleted = !category.deleted;
            $http
              .put(`${apiCategory}/${category.id}`, category)
              .then(function (r) {
                if (category.deleted) {
                  alert("Xóa loại sản phẩm thành công");
                } else {
                  alert("Khôi phục loại sản phẩm thành công");
                }
              })
              .catch(function () {
                if (category.deleted) {
                  alert("Xóa loại sản phẩm thất bại");
                } else {
                  alert("Khôi phục loại sản phẩm thất bại");
                }
              });
          }
        }
      });

      $location.path("admin/category");
    }
  } else {
    $location.path("trang-chu");
  }
};
