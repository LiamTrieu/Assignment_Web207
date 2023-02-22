app.service("checkLogin", function ($cookies) {
  return {
    checkLogin: function () {
      if (
        $cookies.getObject("user") === undefined ||
        $cookies.getObject("user") === null ||
        $cookies.getObject("user") === ""
      ) {
        return false;
      } else {
        return true;
      }
    },
    checkRole: function () {
      if (
        $cookies.getObject("user") === undefined ||
        $cookies.getObject("user") === null ||
        $cookies.getObject("user") === ""
      ) {
        return false;
      } else {
        return $cookies.getObject("user").role;
      }
    },
    getUser: function () {
      if (
        $cookies.getObject("user") === undefined ||
        $cookies.getObject("user") === null ||
        $cookies.getObject("user") === ""
      ) {
        return {};
      } else {
        return $cookies.getObject("user");
      }
    },
  };
});
