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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _base = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../common/base\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _base2 = _interopRequireDefault(_base);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Represents a http service, which returns a promise.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module http
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Sebastian Fitzner
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	// Imports
	
	
	var VeamsHttp = function (_VeamsBase) {
		_inherits(VeamsHttp, _VeamsBase);
	
		function VeamsHttp() {
			var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
			_classCallCheck(this, VeamsHttp);
	
			var namespace = 'http';
			var opts = {
				url: false,
				type: 'text',
				method: 'GET',
				fetchOnInit: false
			};
	
			var _this = _possibleConstructorReturn(this, (VeamsHttp.__proto__ || Object.getPrototypeOf(VeamsHttp)).call(this, { namespace: namespace, options: options }, opts));
	
			_this.data = {};
			_this.initialize();
			return _this;
		}
	
		_createClass(VeamsHttp, [{
			key: 'initialize',
			value: function initialize() {
				if (!window.Promise) {
					console.error('Veams-Http :: You should add a lightweight promise library like promise-polyfill!');
				}
	
				if (this.options.fetchOnInit) {
					return this.promiseRequest();
				}
			}
		}, {
			key: 'requestWillOpen',
	
	
			// Request lifecycle
			value: function requestWillOpen(request, obj) {}
		}, {
			key: 'requestDidOpen',
			value: function requestDidOpen(request, obj) {}
		}, {
			key: 'requestWillLoad',
			value: function requestWillLoad(request, obj) {}
		}, {
			key: 'requestDidLoad',
			value: function requestDidLoad(request, obj) {}
		}, {
			key: 'requestWillSend',
			value: function requestWillSend(request, obj) {}
		}, {
			key: 'requestDidSend',
			value: function requestDidSend(request, obj) {}
	
			// Request function
	
		}, {
			key: 'promiseRequest',
			value: function promiseRequest(obj) {
				var _this2 = this;
	
				return new Promise(function (resolve, reject) {
					var request = new XMLHttpRequest();
	
					_this2.requestWillOpen(request, obj);
					request.open(obj.method, obj.url, true);
					_this2.requestDidOpen(request, obj);
	
					_this2.requestWillLoad(request, obj);
					request.onload = function () {
						if (request.status >= 200 && request.status < 400) {
							resolve(_this2.parser({
								request: request,
								type: obj.type
							}));
	
							_this2.requestDidLoad(request, obj);
						} else {
							reject({
								status: request.status,
								statusText: request.statusText
							});
	
							_this2.requestDidLoad(request, obj);
						}
					};
	
					request.onerror = function () {
						reject({
							status: request.status,
							statusText: request.statusText
						});
					};
	
					_this2.requestWillSend(request, obj);
					request.send(obj.data);
					_this2.requestDidSend(request, obj);
				});
			}
		}, {
			key: 'get',
			value: function get(obj) {
				var requestObject = {};
	
				requestObject.data = obj.data ? obj.data : null;
	
				if (obj) {
					this.options.method = requestObject.method = 'GET';
					this.options.url = requestObject.url = obj.url || this.options.url;
					this.options.type = requestObject.type = obj.type || this.options.type;
				}
	
				return this.promiseRequest(requestObject);
			}
		}, {
			key: 'post',
			value: function post(obj) {
				var requestObject = {};
	
				requestObject.data = obj.data ? obj.data : null;
	
				if (obj) {
					this.options.method = requestObject.method = 'POST';
					this.options.url = requestObject.url = obj.url || this.options.url;
					this.options.type = requestObject.type = obj.type || this.options.type;
				}
	
				return this.promiseRequest(requestObject);
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
	}(_base2.default);
	
	exports.default = VeamsHttp;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=http.js.map