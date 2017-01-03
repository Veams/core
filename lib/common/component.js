(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("common/component", [], factory);
	else if(typeof exports === 'object')
		exports["common/component"] = factory();
	else
		root["common/component"] = root["common/component"] || {}, root["common/component"]["common/component"] = factory();
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
	
	if (!window.Veams) {
		throw new Error('Please initialize Veams!');
	}
	
	if (!window.Veams.helpers.mixin || !window.Veams.helpers.defaults) {
		throw new Error('The mixin or defaults helper is missing!');
	}
	
	if (!window.Veams.$) {
		throw new Error('Please add a Dom handler like jQuery or Veams-Query to the window object!');
	}
	
	var $ = window.Veams.$;
	
	var VeamsComponent = function () {
	
		/**
	  * Contructor
	  *
	  * to save standard elements like el and options and
	  * execute initialize as default method
	  */
		function VeamsComponent() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
			_classCallCheck(this, VeamsComponent);
	
			this.el = obj.el;
			this.$el = $(obj.el);
			this.options = options;
			this.namespace = obj.namespace;
			this.evtNamespace = '.' + this.namespace;
	
			this._options = obj.options;
			this.initialize();
		}
	
		// GETTER AND SETTER
	
		/**
	  * Return options
	  */
	
	
		_createClass(VeamsComponent, [{
			key: 'initialize',
	
	
			// STANDARD METHODS
	
			/**
	   * Initialize your module class,
	   * save some references,
	   * optionally scaffold some templates and
	   * bind your events
	   */
			value: function initialize() {
				this.preRender();
				this.bindEvents();
			}
	
			/**
	   * Destroy component by unbinding events and
	   * removing element from dom
	   */
	
		}, {
			key: 'destroy',
			value: function destroy() {
				this.unbindEvents();
				this.$el.remove();
			}
	
			/**
	   * Bind global and local events
	   */
	
		}, {
			key: 'bindEvents',
			value: function bindEvents() {}
	
			/**
	   * Unbind events
	   */
	
		}, {
			key: 'unbindEvents',
			value: function unbindEvents() {
				this.$el.off(this.evtNamespace);
			}
	
			/**
	   * Pre-Render templates
	   * which can be used to render content into it
	   */
	
		}, {
			key: 'preRender',
			value: function preRender() {}
	
			/**
	   * Render template with data
	   */
	
		}, {
			key: 'renderTemplate',
			value: function renderTemplate(tpl, data) {}
	
			/**
	   * Render your module
	   */
	
		}, {
			key: 'render',
			value: function render() {}
		}, {
			key: '_options',
			get: function get() {
				return this.options;
			}
	
			/**
	   * Save options by merging default options with passed options
	   */
			,
			set: function set(options) {
				this.options = Veams.helpers.defaults(options || {}, this.options);
			}
		}]);
	
		return VeamsComponent;
	}();
	
	/**
	 * Add mixin functionality to extend module class
	 */
	
	
	VeamsComponent.mixin = Veams.helpers.mixin;
	
	exports.default = VeamsComponent;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=component.js.map