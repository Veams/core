(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("services/http", [], factory);
	else if(typeof exports === 'object')
		exports["services/http"] = factory();
	else
		root["services/http"] = root["services/http"] || {}, root["services/http"]["services/http"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Represents a http service, which returns a promise.
	 * @module http
	 *
	 * Polyfills: npm install promise-polyfill --save-exact
	 *
	 * @author Sebastian Fitzner
	 */
	
	if (!window.Promise) {
		console.error('Veams-Http :: You should add a lightweight promise library like promise-polyfill!');
	}
	
	var VeamsHttp = function () {
		function VeamsHttp() {
			var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
			_classCallCheck(this, VeamsHttp);
	
			var options = {
				url: false,
				type: 'text',
				method: 'GET',
				fetchOnInit: false
			};
	
			this.options = Veams.helpers.defaults(opts, options);
			this.data = {};
	
			this.initialize();
		}
	
		_createClass(VeamsHttp, [{
			key: 'initialize',
			value: function initialize() {
				if (this.options.fetchOnInit) {
					return this.promiseRequest();
				}
			}
		}, {
			key: 'promiseRequest',
			value: function promiseRequest(obj) {
				var _this = this;
	
				if (obj) {
					this.options.method = obj.method || this.options.method;
					this.options.url = obj.url || this.options.url;
					this.options.type = obj.type || this.options.type;
				}
	
				return new Promise(function (resolve, reject) {
					var request = new XMLHttpRequest();
	
					request.open(_this.options.method, _this.options.url, true);
	
					request.onload = function () {
						if (request.status >= 200 && request.status < 400) {
							resolve(_this.parser({
								request: request,
								type: _this.options.type
							}));
						} else {
							reject({
								status: request.status,
								statusText: request.statusText
							});
						}
					};
	
					request.onerror = function () {
						reject({
							status: request.status,
							statusText: request.statusText
						});
					};
	
					request.send();
				});
			}
		}, {
			key: 'get',
			value: function get(obj) {
				if (obj) {
					this.options.method = 'GET';
					this.options.url = obj.url || this.options.url;
					this.options.type = obj.type || this.options.type;
				}
	
				return this.promiseRequest();
			}
		}, {
			key: 'post',
			value: function post(obj) {
				if (obj) {
					this.options.method = 'POST';
					this.options.url = obj.url || this.options.url;
					this.options.type = obj.type || this.options.type;
				}
	
				return this.promiseRequest();
			}
	
			/**
	   * The default parser, which returns the response text.
	   * This method can be overridden.
	   *
	   * @param {Object} obj - Generic object.
	   * @param {Object} obj.req - Request object.
	   * @param {String} obj.dataType - Define a type for the response text.
	   *
	   */
	
		}, {
			key: 'parser',
			value: function parser(obj) {
				this.data = obj.request.responseText;
	
				if (obj.type === 'json') {
					this.data = JSON.parse(this.data);
				}
	
				return this.data;
			}
		}]);
	
		return VeamsHttp;
	}();
	
	exports.default = VeamsHttp;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=http.js.map