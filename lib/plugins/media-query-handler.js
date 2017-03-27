(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("plugins/media-query-handler", [], factory);
	else if(typeof exports === 'object')
		exports["plugins/media-query-handler"] = factory();
	else
		root["plugins/media-query-handler"] = root["plugins/media-query-handler"] || {}, root["plugins/media-query-handler"]["plugins/media-query-handler"] = factory();
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
	 * Imports
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var VeamsMediaQueryHandler = {
		options: {
			mediaQueryProp: 'font-family',
			delay: 300
		},
		pluginName: 'MediaQueryHandler',
		initialize: function initialize(Veams, opts) {
			var _this = this;
	
			// Media Query
			var head = document.querySelectorAll('head');
	
			if (opts) {
				this.options = Veams.helpers.extend(this.options, opts || {});
			}
	
			/**
	   * Add current media query to Veams
	   */
			Veams.currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(this.options.mediaQueryProp);
	
			if (!Veams.Vent) {
				console.info('VeamsMediaQueryHandler :: In order to work properly with the VeamsMediaQueryHandler plugin you should add the VeamsVent plugin!');
			}
	
			// Trigger global resize event
			window.onresize = Veams.helpers.throttle(function (e) {
				var currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(_this.options.mediaQueryProp);
				var width = window.innerWidth;
	
				if (currentMedia !== Veams.currentMedia) {
					var oldMedia = Veams.currentMedia;
	
					Veams.currentMedia = currentMedia;
	
					console.info('VeamsMediaQueryHandler :: Current media is ' + Veams.currentMedia);
	
					if (Veams.Vent) {
						Veams.Vent.trigger(Veams.EVENTS.mediachange, {
							type: Veams.EVENTS.mediachange,
							currentMedia: currentMedia,
							oldMedia: oldMedia
						});
					}
				}
	
				if (width !== Veams.detections.width) {
					Veams.detections.width = width;
					Veams.Vent.trigger(Veams.EVENTS.resize, e);
				}
			}, this.options.delay);
		}
	};
	
	exports.default = VeamsMediaQueryHandler;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=media-query-handler.js.map