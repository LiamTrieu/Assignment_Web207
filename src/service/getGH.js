app.service("getGH", function ($http) {
  var gh = [];
  this.setGH = function (g) {
    gh = g;
  };
  this.getGH = function () {
    return gh;
  };
});
