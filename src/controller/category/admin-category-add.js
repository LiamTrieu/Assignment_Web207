window.admin_category_add_Ctrl = function (
  $location,
  $http,
  shareData,
  loadData,
  checkLogin
) {
  loadData.loadCategory();
  let d = new Date();
  var category = {
    name: shareData.getDataCatefory().name,
    date: `${d.getDate()} - ${d.getMonth() + 1} - ${d.getFullYear()}`,
    deleted: false,
  };
  if (checkLogin.checkRole()) {
    if (!(Object.keys(category).length === 0)) {
      if (!(category.name.trim() == "")) {
        $http
          .post(apiCategory, category)
          .then(function (r) {
            alert("Thêm loại sản phẩm thành công");
          })
          .catch(function () {
            alert("Thêm loại sản phẩm thất bại");
          });
      }
      $location.path("admin/category");
    }
  } else {
    $location.path("trang-chu");
  }
};
