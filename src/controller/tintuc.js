window.tintucCtrl = function ($scope, $http, loadData) {
  loadData.loadProduct();
  loadData.loadCategory();
  loadData.loadGH();
  $scope.danhSachTinTuc = [];

  $http.get(apiTT).then(function (response) {
    if (response.statusText === "OK") {
      $scope.danhSachTinTuc = response.data;
    }
  });
};
