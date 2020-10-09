/*
 *  Console.js
 *
 *  An interface to native console methods
 *  Avoids issues when browser does not have native support for console
 *
 *  @license OS
 *  @author Valérian Saliou <valerian@valeriansaliou.name>
 *  @url https://github.com/valeriansaliou/console.js
 */

var Console = (function () {

  var self = {};


  /* Variables */

  self._html_sel = document.getElementsByTagName('html')[0];
  self._environment = self._html_sel.getAttribute('data-environment');
  self._development = self._environment == 'development';
  self._available = typeof(window.console) != 'undefined';
  self._has = self._development && self._available;
  self._log_sink = function(level, ns, value) {};


  /* Methods */

  self.warn = function (ns, value) {
    if (self._has) {
      console.warn(ns, value);
    }

    self._log_sink('warn', ns, value);
  };

  self.error = function (ns, value) {
    if (self._has) {
      console.error(ns, value);
    }

    self._log_sink('error', ns, value);
  };

  self.info = function (ns, value) {
    if (self._has) {
      console.info(ns, value);
    }

    self._log_sink('info', ns, value);
  };

  self.log = function (ns, value) {
    if (self._has) {
      console.log(ns, value);
    }

    self._log_sink('log', ns, value);
  };

  self.debug = function (ns, value) {
    if (self._has) {
      if (typeof console.debug != "undefined") {
        console.debug(ns, value);
      } else {
        console.log(ns, value);
      }
    }

    self._log_sink('debug', ns, value);
  };


  /* Setters */

  self.set_log_sink = function(fn_log_sink_handler) {
    if (typeof fn_log_sink_handler != "function") {
      throw new Error("Invalid function");
    } else {
      self._log_sink = fn_log_sink_handler;
    }
  };


  return self;

})();
