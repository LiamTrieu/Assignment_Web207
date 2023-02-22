window.admin_product_detail_Ctrl = function (
  $location,
  $http,
  $scope,
  $rootScope,
  $routeParams,
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
  $scope.id = $routeParams.id;
  $scope.checkSelect = function () {
    if ($scope.id !== "") {
      if (document.getElementById("fileInput").value != "") {
        var prd = shareData.getDataProduct();
        var img = document.getElementById("fileInput").files[0];
        prd.img = img;
        console.log(img);
        shareData.setDataProduct(prd);
      }
      return "#/admin/product/" + $scope.id + "/update";
    }
  };
  $scope.urlAdmin = "pages/admin-product.html";
  if (checkLogin.checkRole()) {
    if ($routeParams.id !== "") {
      $http.get(`${apiProduct}/${$routeParams.id}`).then(function (res) {
        if (res.statusText === "OK") {
          shareData.setDataProduct(res.data);
          $rootScope.getProduct = shareData.getDataProduct();
        }
      });
    }
  } else {
    $location.path("trang-chu");
  }
};
