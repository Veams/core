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
			_classCallCheck(this, VeamsHttp);
		}
	
		_createClass(VeamsHttp, [{
			key: 'promiseRequest',
			value: function promiseRequest(options) {
				var _this = this;
	
				return new Promise(function (resolve, reject) {
					var request = new XMLHttpRequest();
	
					request.open(options.type, options.url, true);
	
					request.onload = function () {
						if (request.status >= 200 && request.status < 400) {
							resolve(_this.parser(request, options.dataType));
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
				return this.promiseRequest({
					type: 'GET',
					url: obj.url,
					dataType: obj.dataType || 'text'
				});
			}
		}, {
			key: 'post',
			value: function post(obj) {
				return this.promiseRequest({
					type: 'POST',
					url: obj.url,
					dataType: obj.dataType || 'text'
				});
			}
	
			/**
	   * The default parser, which you can override.
	   * This method can be overridden by you.
	   *
	   * @param {Object} req - Request object.
	   * @param {String} dataType - Define a type for the response text.
	   *
	   */
	
		}, {
			key: 'parser',
			value: function parser(req, dataType) {
				if (dataType === 'json') {
					return JSON.parse(req.responseText);
				} else {
					return req.responseText;
				}
			}
		}]);
	
		return VeamsHttp;
	}();
	
	/**
	 * Add mixin functionality to extend module class
	 */
	
	var http = new VeamsHttp();
	
	exports.http = http;
	exports.VeamsHttp = VeamsHttp;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=http.js.map