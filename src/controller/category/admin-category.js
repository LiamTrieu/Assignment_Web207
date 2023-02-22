window.admin_category_Ctrl = function (
  $location,
  checkLogin,
  $scope,
  $rootScope,
  shareData,
  loadData
) {
  loadData.loadCategory();
  $rootScope.urlHeader = "layout/header-admin.html";
  $rootScope.urlFooter = "";
  $scope.checkSlected = function () {
    if (!$scope.id > 0) {
      alert("Chưa chọn loại sản phẩm cần sửa");
    }
  };
  $rootScope.cate = {
    name: "",
  };
  $scope.urlAdmin = "pages/admin-category.html";
  if (!checkLogin.checkLogin() || !checkLogin.checkRole()) {
    $location.path("/trang-chu");
  }
  shareData.setDataCatefory($scope.cate);
};
