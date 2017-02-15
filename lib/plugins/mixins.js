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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Represents a mixin plugin.
	 * This plugin gives you the possibility to extend your methods in components as long as you provide Veams.helpers.mixin();
	 *
	 * @module mixin
	 *
	 * @author Sebastian Fitzner
	 */
	
	var VeamsMixins = {
		pluginName: 'Mixins',
		initialize: function initialize(Veams, mixins) {
	
			if (!mixins || !Array.isArray(mixins)) {
				console.error('VeamsMixins :: You need to pass a mixin array which contains objects with key and value!');
				return;
			}
			if (!Veams.mixins) {
				Veams.mixins = {};
			}
	
			for (var i = 0; i < mixins.length; i++) {
				var arrElem = mixins[i];
				var name = arrElem.name;
	
				if (typeof arrElem !== 'function' || !name) {
					console.error('VeamsMixins :: You need to export a mixin as function with a function name which returns an object!');
					return;
				}
	
				if (Veams.mixins[name]) {
					console.error('VeamsMixins :: It seems that you have already defined a mixin called ' + name + '!\'');
					return;
				}
	
				Veams.mixins[name] = arrElem(Veams);
			}
		}
	};
	
	exports.default = VeamsMixins;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=mixins.js.map