window.app = angular.module("myApp", ["ngRoute", "ngCookies"]);
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "pages/trang-chu.html",
      controller: trangChuCtrl,
    })
    .when("/tin-tuc", {
      templateUrl: "pages/tintuc.html",
      controller: tintucCtrl,
    })
    .when("/gioi-thieu", { templateUrl: "pages/gioi-thieu.html" })
    .when("/lien-he", { templateUrl: "pages/lien-he.html" })
    .when("/dang-nhap", {
      templateUrl: "pages/dang-nhap.html",
      controller: dangNhapCtrl,
    })
    .when("/gio-hang", {
      templateUrl: "pages/gio-hang.html",
      controller: gioHangCtrl,
    })
    .when("/dang-ky", {
      templateUrl: "pages/dang-ky.html",
      controller: dangKyCtrl,
    })
    .when("/admin/product", {
      templateUrl: "pages/admin.html",
      controller: admin_product_Ctrl,
    })
    .when("/san-pham-da-mua", {
      templateUrl: "pages/sanpham-mua.html",
      controller: spmua,
    })

    .when("/admin/product/add", {
      templateUrl: "pages/admin.html",
      controller: admin_product_add_Ctrl,
    })
    .when("/admin/don-hang", {
      templateUrl: "pages/admin.html",
      controller: donhang,
    })
    .when("/admin/product/detail/:id", {
      templateUrl: "pages/admin.html",
      controller: admin_product_detail_Ctrl,
    })
    .when("/admin/product/:id/update", {
      templateUrl: "pages/admin.html",
      controller: admin_product_update_Ctrl,
    })
    .when("/admin/product/remove/:id", {
      templateUrl: "pages/admin.html",
      controller: admin_product_remove_Ctrl,
    })
    .when("/admin/product/restore/:id", {
      templateUrl: "pages/admin.html",
      controller: admin_product_remove_Ctrl,
    })

    .when("/admin/category", {
      templateUrl: "pages/admin.html",
      controller: admin_category_Ctrl,
    })
    .when("/admin/category/add", {
      templateUrl: "pages/admin.html",
      controller: admin_category_add_Ctrl,
    })
    .when("/admin/category/remove/:id", {
      templateUrl: "pages/admin.html",
      controller: admin_category_remove_Ctrl,
    })
    .when("/admin/category/restore/:id", {
      templateUrl: "pages/admin.html",
      controller: admin_category_remove_Ctrl,
    })
    .when("/admin/category/detail/:id", {
      templateUrl: "pages/admin.html",
      controller: admin_category_detail_Ctrl,
    })
    .when("/admin/category/:id/update", {
      templateUrl: "pages/admin.html",
      controller: admin_category_update_Ctrl,
    })
    .when("/san-pham", {
      templateUrl: "pages/san-pham.html",
      controller: sanPhamCtrl,
    })
    .when("/san-pham/loai/:id", {
      templateUrl: "pages/san-pham.html",
      controller: sanPhamCateCtrl,
    })
    .when("/san-pham/:id", {
      templateUrl: "pages/detail.html",
      controller: detailCtrl,
    })
    .when("/tim-kiem/:text", {
      templateUrl: "pages/tim-kiem.html",
      controller: trangChuCtrl,
    })
    .when("/quen-mat-khau", { templateUrl: "pages/quen-mat-khau.html" })
    .when("/doi-mat-khau", {
      templateUrl: "pages/doi-mat-khau.html",
      controller: doiMK,
    })

    .otherwise({ redirectTo: "/trang-chu" });
});
