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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _events = __webpack_require__(5);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var throttleHelper = __webpack_require__(6); /**
	                                                              * Imports
	                                                              */
	
	
	var VeamsMediaQueryHandler = {
		pluginName: 'MediaQueryHandler',
		initialize: function initialize(Veams) {
			var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
				mediaQueryProp: 'font-family',
				delay: 300
			};
	
			// Media Query
			var head = document.querySelectorAll('head');
			var delay = opts.delay || 300;
			var mediaQueryProp = opts.mediaQueryProp || 'font-family';
	
			/**
	   * Add current media query to Veams
	   */
			Veams.currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(mediaQueryProp);
	
			if (!Veams.Vent) {
				console.info('In order to work properly with the VeamsMediaQueryHandler plugin you should add the VeamsVent plugin!');
			}
	
			// Trigger global resize event
			window.onresize = throttleHelper(function (e) {
				var currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(mediaQueryProp);
				var width = window.innerWidth;
	
				if (currentMedia !== Veams.currentMedia) {
					var oldMedia = Veams.currentMedia;
	
					Veams.currentMedia = currentMedia;
	
					console.log('Veams.currentMedia: ', Veams.currentMedia);
	
					if (Veams.Vent) {
						Veams.Vent.trigger(_events2.default.mediachange, {
							type: _events2.default.mediachange,
							currentMedia: currentMedia,
							oldMedia: oldMedia
						});
					}
				}
	
				if (width !== Veams.screenSize.width) {
					Veams.screenSize.width = width;
					Veams.Vent.trigger(_events2.default.resize, e);
				}
			}, delay);
		}
	};
	
	exports.default = VeamsMediaQueryHandler;
	module.exports = exports['default'];

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';
	/**
	 * Const for events (pub/sub)
	 *
	 * @author: Sebastian Fitzner
	 */
	
	/**
	 * Events Global
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var EVENTS = {
		blur: 'blur',
		change: 'change',
		click: 'click',
		dblclick: 'dblclick',
		DOMchanged: 'dom:changed',
		DOMredirect: 'dom:redirect',
		hashchange: 'hashchange',
		input: 'input',
		keydown: 'keydown',
		keypress: 'keypress',
		keyup: 'keyup',
		mediachange: 'mediachange',
		moduleRegistered: 'module:registered',
		mousedown: 'mousedown',
		mouseenter: 'mouseenter',
		mouseleave: 'mouseleave',
		mouseout: 'mouseout',
		mouseover: 'mouseover',
		mouseup: 'mouseup',
		reset: 'reset',
		resize: 'resize',
		scroll: 'scroll',
		submit: 'submit',
		swipe: 'swipe'
	};
	
	exports.default = EVENTS;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	if (!window.Veams) {
		window.Veams = {};
	}
	
	if (!window.Veams.helpers) {
		window.Veams.helpers = {};
	}
	
	var helpers = window.Veams.helpers;
	
	/**
	 * Throttle method for resize events and more
	 *
	 * @param {function} func - Function which will be executed.
	 * @param {number} wait - number to wait in milliseconds.
	 * @param {boolean} immediate - execute function immediately.
	 */
	helpers.throttle = function throttle(func, wait, immediate) {
		var timeout = void 0;
	
		return function () {
			var context = this;
			var args = arguments;
			var callNow = immediate && !timeout;
			var later = function later() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
	
			clearTimeout(timeout);
	
			timeout = setTimeout(later, wait);
	
			if (callNow) func.apply(context, args);
		};
	};
	module.exports = helpers.throttle;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=media-query-handler.js.map