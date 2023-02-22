window.admin_category_detail_Ctrl = function (
  $location,
  $http,
  $scope,
  $rootScope,
  $routeParams,
  checkLogin,
  loadData,
  shareData
) {
  loadData.loadCategory();
  $scope.id = $routeParams.id;
  $scope.checkSlect = function () {
    if ($scope.id !== 0) {
      return "#/admin/category/" + $scope.id + "/update";
    }
  };
  $scope.urlAdmin = "pages/admin-category.html";
  if (checkLogin.checkRole()) {
    if ($routeParams.id !== 0) {
      $http.get(`${apiCategory}/${$routeParams.id}`).then(function (res) {
        if (res.statusText === "OK") {
          shareData.setDataCatefory(res.data);
          $rootScope.cate = shareData.getDataCatefory();
        }
      });
    }
  } else {
    $location.path("trang-chu");
  }
};
