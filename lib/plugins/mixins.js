(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("plugins/mixins", [], factory);
	else if(typeof exports === 'object')
		exports["plugins/mixins"] = factory();
	else
		root["plugins/mixins"] = root["plugins/mixins"] || {}, root["plugins/mixins"]["plugins/mixins"] = factory();
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
	
	/**
	 * Represents a mixin plugin.
	 * This plugin gives you the possibility to extend your methods in components as long as you provide Veams.helpers.mixin();
	 *
	 * @module VeamsMixins
	 *
	 * @author Sebastian Fitzner
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var VeamsMixins = {
		pluginName: 'Mixins',
		initialize: function initialize(Veams) {
			if (!Veams.mixins) {
				Veams.mixins = {};
			}
	
			Veams.addMixin = function addMixin() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				var params = [].concat(args);
	
				if (params.length === 1) {
					if (_typeof(params[0]) !== 'object') {
						console.error('VeamsMixins :: You need to pass an object!');
						return;
					}
	
					for (var key in params[0]) {
						if (params[0].hasOwnProperty(key)) {
							if (!Veams.mixins[key]) {
								Veams.mixins[key] = params[0][key](Veams);
							} else {
								console.info('VeamsMixins :: It seems that you have already defined a mixin called ' + key + '!\'');
							}
						}
					}
				} else if (params.length === 2) {
	
					if (!Veams.mixins[params[0]]) {
						if (typeof params[0] !== 'string' || typeof params[1] !== 'function') {
							console.error('VeamsMixins :: You need to pass a string as first argument and the helper function as second one.');
							return;
						}
						Veams.mixins[params[0]] = params[1](Veams);
					} else {
						console.info('VeamsMixins :: The mixin ' + params[0] + ' is already defined! Please define a new name for: ', params[1]);
					}
				}
			};
		}
	};
	
	exports.default = VeamsMixins;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mixins.js.map