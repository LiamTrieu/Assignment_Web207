window.admin_product_Ctrl = function (
  $location,
  $scope,
  $rootScope,
  checkLogin,
  shareData,
  $filter,
  loadData
) {
  loadData.loadProduct();
  loadData.loadCategory();
  $scope.getCate = function (id) {
    var filteredCategories = $filter("filter")($rootScope.category, {
      id: id,
    });
    if (filteredCategories !== undefined) {
      if (filteredCategories.length > 0) {
        return filteredCategories[0].name;
      }
    }
    return "";
  };

  $rootScope.getProduct = {
    name: "",
    price: "",
    soluong: "",
    img: "",
    dis: "",
    category: "1",
  };
  $scope.urlAdmin = "pages/admin-product.html";
  if (!checkLogin.checkLogin() || !checkLogin.checkRole()) {
    $location.path("/trang-chu");
  }
  $rootScope.urlHeader = "layout/header-admin.html";
  $rootScope.urlFooter = "";
  shareData.setDataProduct($scope.getProduct);
  $scope.uploadFile = function () {
    $scope.getProduct.img = document.getElementById("fileInput").files[0];
  };
};
