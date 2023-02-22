app.run(function (checkLogin, loadData, $rootScope, getGH, $http) {
  // var gioHang = [];
  // var idUser = checkLogin.getUser().id;
  // $http.get(apiCart).then(function (response) {
  //   if (response.status === 200) {
  //     response.data.forEach(function (e) {
  //       if (e.user == idUser) {
  //         if (gioHang.length == 0) {
  //           gioHang[0] = e;
  //         } else {
  //           gioHang.push(e);
  //         }
  //       }
  //     });
  //     getGH.setGH(gioHang);
  //   }
  // });
  // $http.get(apiCart).then(function (response) {
  //   var count = 0;
  //   response.data.forEach((e) => {
  //     if (e.user == idUser && e.status == 0) {
  //       count++;
  //     }
  //   });
  //   $rootScope.countCart = count;
  // });
  $rootScope.$on("$routeChangeStart", function (event, next, current) {
    if (next && next.$$route) {
      var path = next.$$route.originalPath;
      if (path.startsWith("/admin")) {
        $rootScope.urlHeader = "";
        $rootScope.urlFooter = "";
      } else {
        $rootScope.urlHeader = "layout/header.html";
        $rootScope.urlFooter = "layout/footer.html";
      }
    }
  });
  $rootScope.fomatMoney = function (money) {
    if (money > 0) {
      return money.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      });
    }
  };
  $rootScope.user = checkLogin.getUser();
  $rootScope.isLogin = checkLogin.checkLogin();
  // loadData.loadProduct();
  // loadData.loadCategory();
});
