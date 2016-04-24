"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _ = {
  generateOrigin: function () {
    return "" + window.location.protocol + "//" + window.location.host;
  }
};

var Router = (function () {
  function Router() {
    _classCallCheck(this, Router);
  }

  _createClass(Router, {
    replaceUrl: {
      value: function replaceUrl(url) {
        var title = arguments[1] === undefined ? "" : arguments[1];

        if (require("./utils/Debugging")._isTest()) {
          return;
        }try {
          window.history.replaceState({}, title, url);
        } catch (e) {}
      }
    },
    generateProfileUrl: {
      value: function generateProfileUrl(params) {
        return "" + _.generateOrigin() + "/" + params.username + "" + (params.search || "");
      }
    },
    generateBroadcastUrl: {
      value: function generateBroadcastUrl(params) {
        return "" + _.generateOrigin() + "/" + (params.username || "w") + "/" + params.id + "" + (params.search || "");
      }
    }
  });

  return Router;
})();

;

module.exports = new Router();
