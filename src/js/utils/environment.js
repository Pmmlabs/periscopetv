"use strict";

var is = require("is_js");

var Environment = (function () {
  var canaryClassName = "canary-element";

  var appendCanaryElement = function (tag) {
    var type = arguments[1] === undefined ? "application/x-shockwave-flash" : arguments[1];

    var canary = document.createElement(tag);
    canary.setAttribute("class", canaryClassName);
    canary.setAttribute("type", type);
    document.body && document.body.appendChild(canary);
  };

  var removeCanaryElements = function () {
    var canaryElements = document.getElementsByClassName(canaryClassName);
    for (var i = 0; i < canaryElements.length; i++) {
      var canaryEl = canaryElements[i];
      if (canaryEl && canaryEl.parentNode) {
        canaryEl.parentNode.removeChild(canaryEl);
      }
    }
  };

  var determineFlashAvailability = (function () {
    // Return 0 if Flash is available
    // Return 1 if Flash is not installed
    // Return 2 if Flash is installed but disabled by browser
    // Return 3 if Flash is installed but disabled by extension

    if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] != undefined && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {

      var blockedByExtension = false;

      var objects = document.getElementsByTagName("object");
      var embeds = document.getElementsByTagName("embed");

      if (embeds.length === 0 && objects.length === 0) {
        // Insert dummy object/embed element to trigger flash blocker
        appendCanaryElement("object");
      }

      if (objects.length > 0 || embeds.length > 0) {
        /* Mac / Chrome using FlashBlock + Mac / Safari using AdBlock */

        for (var _i = 0; _i < objects.length; _i++) {
          if (window.getComputedStyle(objects[_i], null).getPropertyValue("display") === "none") {
            blockedByExtension = true;
          }
        }

        for (var _i2 = 0; _i2 < embeds.length; _i2++) {
          if (window.getComputedStyle(embeds[_i2], null).getPropertyValue("display") === "none") {
            blockedByExtension = true;
          }
        }
      } else {
        /* Mac / Firefox using FlashBlock */
        if (document.getElementsByTagName("div[bginactive]").length > 0) {
          blockedByExtension = true;
        }
      }

      removeCanaryElements();
      if (blockedByExtension) return 3;
    } else if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] === undefined) {
      // If Flash is not available as a MIME-type, the user has manually
      // disabled Flash in settings

      // TODO: Handle case where Flash version is below v18.0.0.232
      // but enabled as a plugin. Safari now blocks this version without
      // telling you anything.
      return 2;
    } else {
      // If Flash is not available as a MIME-type,
      // attempt to create a new ActiveX object, and if that errors,
      // Flash is not available
      try {
        new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
      } catch (e) {
        return 1;
      }
    }
    return 0;
  })();

  var getFlashAvailability = function () {
    return determineFlashAvailability;
  };

  var isFlashAvailable = function () {
    switch (getFlashAvailability()) {
      case 0:
        return true;
      default:
        return false;
    }
  };

  var isFlashBlocked = function () {
    switch (getFlashAvailability()) {
      case 2:
      case 3:
        return true;
      default:
        return false;
    }
  };

  var isVideoCapableEnvironment = function () {
    return !isUnsupportedBrowser() && !isDevice();
  };

  var isVideoSupported = function () {
    return isFlashVideoSupported() || isHTMLVideoSupported();
  };

  var isFlashVideoSupported = function () {
    return isVideoCapableEnvironment() && isFlashAvailable() && !isFlashBlocked();
  };

  var isHTMLVideoSupported = function () {
    return isVideoCapableEnvironment() && is.safari();
  };

  var isUnsupportedEnv = function () {
    return !isFlashAvailable() && is.not.safari() && is.desktop();
  };

  var isUnsupportedBrowser = function () {
    return is.ie() || is.edge();
  };

  var isDevice = function () {
    return is.mobile() || is.tablet();
  };

  var isIframe = (function () {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  })();

  return {
    getFlashAvailability: getFlashAvailability,
    isFlashAvailable: isFlashAvailable,
    isFlashBlocked: isFlashBlocked,
    isVideoCapableEnvironment: isVideoCapableEnvironment,
    isVideoSupported: isVideoSupported,
    isFlashVideoSupported: isFlashVideoSupported,
    isHTMLVideoSupported: isHTMLVideoSupported,
    isUnsupportedEnv: isUnsupportedEnv,
    isUnsupportedBrowser: isUnsupportedBrowser,
    isDevice: isDevice,
    isIframe: isIframe,
    is: is
  };
})();

module.exports = Environment;
