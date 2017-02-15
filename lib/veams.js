(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("veams", [], factory);
	else if(typeof exports === 'object')
		exports["veams"] = factory();
	else
		root["veams"] = root["veams"] || {}, root["veams"]["veams"] = factory();
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
	
	module.exports = __webpack_require__(5);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _generals = __webpack_require__(6);
	
	var _generals2 = _interopRequireDefault(_generals);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Variables
	 */
	
	exports.default = _generals2.default; /**
	                                       * Imports
	                                       */

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(7);
	
	var _use = __webpack_require__(8);
	
	var _use2 = _interopRequireDefault(_use);
	
	var _events = __webpack_require__(9);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _core = __webpack_require__(10);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _helpers = __webpack_require__(11);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @namespace Veams
	 */
	var defaults = {
		EVENTS: _events2.default,
		helpers: {},
		options: {
			global: false,
			namespace: 'App',
			attrPrefix: 'data-js'
		},
		plugins: {},
		detections: {
			width: window.innerWidth,
			height: window.innerHeight
		},
		version: '5.0.0-rc1'
	};
	
	/**
	 * Imports
	 */
	/**
	 * Polyfills
	 */
	
	var Veams = Veams || defaults;
	
	Veams.use = _use2.default.bind(Veams);
	
	/**
	 * Standard plugins
	 */
	Veams.use(_core2.default);
	Veams.use(_helpers2.default);
	
	exports.default = Veams;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	// Polyfill for custom events
	(function () {
		if (typeof window.CustomEvent === 'function') return false;
	
		function CustomEvent(event, params) {
			var evt = document.createEvent('CustomEvent');
	
			params = params || { bubbles: false, cancelable: false, detail: undefined };
	
			evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
			return evt;
		}
	
		CustomEvent.prototype = window.Event.prototype;
	
		window.CustomEvent = CustomEvent;
	})();

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (plugin) {
	
	  if (plugin.pluginName) {
	    this.plugins[plugin.pluginName] = plugin;
	  }
	
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  plugin.initialize.apply(plugin, [this].concat(args));
	};
	
	module.exports = exports['default']; /**
	                                      * Represents a simple plugin system in which `this` is Veams.
	                                      * @module plugin
	                                      *
	                                      * @author Sebastian Fitzner
	                                      */

/***/ },
/* 9 */
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
		moduleCached: 'module:cached',
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
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VEAMS = {};
	
	var Core = function () {
		function Core(Veams) {
			_classCallCheck(this, Core);
	
			VEAMS = Veams;
		}
	
		_createClass(Core, [{
			key: "initialize",
			value: function initialize(opts) {
				/**
	    * Set global options on initialize
	    */
				this.options = opts;
				VEAMS.options = this.options;
	
				/**
	    * Set Veams to the global object
	    */
				window.Veams = VEAMS;
	
				/**
	    * Namespace of application
	    */
				if (!window[VEAMS.options.namespace]) {
					window[VEAMS.options.namespace] = window[VEAMS.options.namespace] || {};
					window[VEAMS.options.namespace].Templates = window[VEAMS.options.namespace].Templates || {};
				}
	
				/**
	    * Support Detection
	    */
				VEAMS.detections = VEAMS.helpers.defaults(this.detections || {}, {
					touch: VEAMS.helpers.isTouch()
				});
			}
		}, {
			key: "options",
			set: function set(options) {
				this._options = VEAMS.helpers.defaults(options || {}, VEAMS.options);
			},
			get: function get() {
				return this._options;
			}
		}]);
	
		return Core;
	}();
	
	/**
	 * Plugin object
	 */
	
	
	var VeamsCore = {
		initialize: function initialize(Veams) {
			Veams.core = Veams.core || new Core(Veams);
		}
	};
	
	exports.default = VeamsCore;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _defaults = __webpack_require__(12);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _extend = __webpack_require__(13);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _mixin = __webpack_require__(14);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _methodExtend = __webpack_require__(15);
	
	var _methodExtend2 = _interopRequireDefault(_methodExtend);
	
	var _isTouch = __webpack_require__(16);
	
	var _isTouch2 = _interopRequireDefault(_isTouch);
	
	var _throttle = __webpack_require__(17);
	
	var _throttle2 = _interopRequireDefault(_throttle);
	
	var _querySelectorArray = __webpack_require__(18);
	
	var _querySelectorArray2 = _interopRequireDefault(_querySelectorArray);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VeamsHelpers = {
		pluginName: 'Helpers',
		initialize: function initialize(Veams) {
			Veams.addHelper = function addHelper(helper) {
				if (typeof helper !== 'function') {
					console.error('Passed helper ' + helper + ' ist not a function!');
					return;
				}
	
				if (!Veams.helpers[helper.name]) {
					Veams.helpers[helper.name] = helper;
				}
			};
	
			this.addDefaultHelpers(Veams);
		},
	
		addDefaultHelpers: function addDefaultHelpers(Veams) {
			Veams.addHelper(_querySelectorArray2.default);
			Veams.addHelper(_defaults2.default);
			Veams.addHelper(_extend2.default);
			Veams.addHelper(_isTouch2.default);
			Veams.addHelper(_mixin2.default);
			Veams.addHelper(_methodExtend2.default);
			Veams.addHelper(_throttle2.default);
		}
	};
	
	exports.default = VeamsHelpers;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Simple extend method, which extends an object.
	 *
	 * @param {Object} obj - object which will be extended
	 *
	 * @return {Object} obj - extended object
	 */
	module.exports = function defaults(obj) {
	  [].slice.call(arguments, 1).forEach(function (item) {
	    for (var key in item) {
	      if (obj[key] === undefined) obj[key] = item[key];
	    }
	  });
	  return obj;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Simple extend method to extend the properties of an object.
	 *
	 * @param {Object} obj - object which will be extended
	 *
	 * @return {Object} obj - extended object
	 */
	module.exports = function extend(obj) {
	  [].slice.call(arguments, 1).forEach(function (item) {
	    for (var key in item) {
	      obj[key] = item[key];
	    }
	  });
	  return obj;
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultsHelper = __webpack_require__(12);
	var methodExtendHelper = __webpack_require__(15);
	
	/**
	 * Merge method functions.
	 *
	 * @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
	 * @param {Array} methods - Array of method names which will be extended.
	 */
	module.exports = function mixin(from) {
		var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['initialize', 'render'];
	
		if (from === undefined) return;
	
		var to = this.prototype;
	
		/** Add those methods which exists on `from` but not on `to` to the latter */
		defaultsHelper(to, from);
	
		/** we do the same for events */
		if (to.events) {
			defaultsHelper(to.events, from.events);
		}
	
		// Extend to's methods
		methods.forEach(function (method) {
			methodExtendHelper(to, from, method);
		});
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Helper method to extend an already existing method.
	 *
	 * @param {Object} to - view which will be extended
	 * @param {Object} from - methods which comes from mixin
	 * @param {string} methodName - function name
	 */
	module.exports = function methodExtend(to, from, methodName) {
		function isUndefined(value) {
			return typeof value === 'undefined';
		}
	
		if (from === undefined) return;
	
		// if the method is defined on from ...
		if (!isUndefined(from[methodName])) {
			(function () {
				var old = to[methodName];
	
				// ... we create a new function on to
				to[methodName] = function () {
	
					// wherein we first call the method which exists on `to`
					var oldReturn = old.apply(this, arguments);
	
					// and then call the method on `from`
					from[methodName].apply(this, arguments);
	
					// and then return the expected result,
					// i.e. what the method on `to` returns
					return oldReturn;
				};
			})();
		}
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Touch Detection
	 */
	module.exports = function isTouch() {
	  return 'ontouchstart' in window;
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Throttle method for resize events and more
	 *
	 * @param {function} func - Function which will be executed.
	 * @param {number} wait - number to wait in milliseconds.
	 * @param {boolean} immediate - execute function immediately.
	 */
	module.exports = function throttle(func, wait, immediate) {
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

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Get dom elements in an array
	 *
	 * @param {String} elem - Required: selector
	 * @param {Object} [context] - Optional: context
	 *
	 * @return {Array}
	 */
	module.exports = function querySelectorArray(elem, context) {
	  if (!elem) throw new Error('In order to work with querySelectorArray you need to define an element as string!');
	  var el = elem;
	  var customContext = context || document;
	
	  return Array.prototype.slice.call(customContext.querySelectorAll(el));
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=veams.js.map