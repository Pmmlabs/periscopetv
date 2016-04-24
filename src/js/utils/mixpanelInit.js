"use strict";

var Debugging = require("../utils/Debugging");

var DEV_TOKEN = "e13f1cc1f642ef3b03540efe5cb7a6dc";
var PROD_TOKEN = "2cfafc1b9adfdecf0504ffceb44e4e55";

var NOOP = function () {};
var NOOP_MIXPANEL = {
  track: NOOP,
  alias: NOOP,
  disable: NOOP,
  identify: NOOP,
  init: NOOP,
  register: NOOP,
  register_once: NOOP,
  set_config: NOOP,
  track_forms: NOOP,
  track_links: NOOP,
  track_pageview: NOOP,
  unregister: NOOP
};

if (Debugging._isApp()) {
  if (Debugging._isDev() || Debugging._isProd()) {
    (function (f, b) {
      if (!b.__SV) {
        var a, e, i, g;window.mixpanel = b;b._i = [];b.init = function (a, e, d) {
          function f(b, h) {
            var a = h.split(".");2 == a.length && (b = b[a[0]], h = a[1]);b[h] = function () {
              b.push([h].concat(Array.prototype.slice.call(arguments, 0)));
            };
          }var c = b;"undefined" !== typeof d ? c = b[d] = [] : d = "mixpanel";c.people = c.people || [];c.toString = function (b) {
            var a = "mixpanel";"mixpanel" !== d && (a += "." + d);b || (a += " (stub)");return a;
          };c.people.toString = function () {
            return c.toString(1) + ".people (stub)";
          };i = "disable track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
          for (g = 0; g < i.length; g++) f(c, i[g]);b._i.push([a, e, d]);
        };b.__SV = 1.2;a = f.createElement("script");a.type = "text/javascript";a.async = !0;a.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";e = f.getElementsByTagName("script")[0];e.parentNode.insertBefore(a, e);
      }
    })(document, window.mixpanel || []);
  }

  if (Debugging._isDev()) {
    window.mixpanel.init(DEV_TOKEN);
  } else if (Debugging._isProd()) {
    window.mixpanel.init(PROD_TOKEN);
  } else {
    window.mixpanel = NOOP_MIXPANEL;
  }
} else {
  window.mixpanel = NOOP_MIXPANEL;
}

module.exports = window;
