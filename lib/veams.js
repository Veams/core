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
	
	module.exports = __webpack_require__(9);
	__webpack_require__(6);
	__webpack_require__(16);
	__webpack_require__(17);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
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
	 * Simple extend method, which extends an object.
	 *
	 * @param {Object} obj - object which will be extended
	 *
	 * @return {Object} obj - extended object
	 */
	helpers.defaults = function defaults(obj) {
		[].slice.call(arguments, 1).forEach(function (item) {
			for (var key in item) {
				if (obj[key] === undefined) obj[key] = item[key];
			}
		});
		return obj;
	};
	
	module.exports = helpers.defaults;

/***/ },
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(10);
	
	/**
	 * Variables
	 */
	
	exports.default = window.Veams; /**
	                                 * Imports
	                                 */

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(11);
	
	var _use = __webpack_require__(12);
	
	var _use2 = _interopRequireDefault(_use);
	
	var _events = __webpack_require__(13);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _core = __webpack_require__(14);
	
	var _core2 = _interopRequireDefault(_core);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * @namespace Veams
	 */
	
	
	/**
	 * Imports
	 */
	/**
	 * Polyfills
	 */
	var Veams = Veams || {
		EVENTS: _events2.default,
		core: _core2.default,
		helpers: {},
		plugins: {},
		detections: {
			width: window.innerWidth,
			height: window.innerHeight
		},
		version: '5.0.0-beta.1'
	};
	
	(function (window, document, undefined) {
		'use strict';
	
		window.Veams = Veams;
		Veams.use = _use2.default.bind(Veams);
	})(window, document);
	
	exports.default = Veams;
	module.exports = exports['default'];

/***/ },
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultsHelper = __webpack_require__(6);
	var isTouchHelper = __webpack_require__(15);
	
	var Core = function () {
		function Core() {
			_classCallCheck(this, Core);
	
			// General options
			this.options = {
				namespace: 'App',
				attrPrefix: 'data-js'
			};
			this.pluginName = 'Core';
		}
	
		_createClass(Core, [{
			key: 'initialize',
			value: function initialize(opts) {
				/**
	    * Set global options on initialize
	    */
				this.options = opts;
	
				if (!Veams) {
					Veams = window.Veams = {};
				}
	
				Veams.options = this.options;
	
				/**
	    * Namespace of application
	    */
				if (!window[this.options.namespace]) {
					window[this.options.namespace] = window[this.options.namespace] || {};
					window[this.options.namespace].Templates = window[this.options.namespace].Templates || {};
				}
	
				/**
	    * Support Detection
	    */
				Veams.detections = defaultsHelper(Veams.detections || {}, {
					touch: isTouchHelper()
				});
			}
		}, {
			key: 'options',
			set: function set(options) {
				this._options = defaultsHelper(options || {}, this._options);
			},
			get: function get() {
				return this._options;
			}
		}]);
	
		return Core;
	}();
	
	var core = new Core();
	
	exports.default = core;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	if (!window.Veams) {
		window.Veams = {};
	}
	
	if (!window.Veams.helpers) {
		window.Veams.helpers = {};
	}
	
	var helpers = window.Veams.helpers;
	
	/**
	 * Touch Detection
	 */
	helpers.isTouch = function isTouch() {
		return 'ontouchstart' in window;
	};
	
	module.exports = helpers.isTouch;

/***/ },
/* 16 */
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
	 * Simple extend method to extend the properties of an object.
	 *
	 * @param {Object} obj - object which will be extended
	 *
	 * @return {Object} obj - extended object
	 */
	helpers.extend = function extend(obj) {
	  [].slice.call(arguments, 1).forEach(function (item) {
	    for (var key in item) {
	      obj[key] = item[key];
	    }
	  });
	  return obj;
	};
	
	module.exports = helpers.extend;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaultsHelper = __webpack_require__(6);
	var methodExtendHelper = __webpack_require__(18);
	
	if (!window.Veams) {
		window.Veams = {};
	}
	
	if (!window.Veams.helpers) {
		window.Veams.helpers = {};
	}
	
	var helpers = window.Veams.helpers;
	
	/**
	 * Merge method functions.
	 *
	 * @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
	 * @param {Array} methods - Array of method names which will be extended.
	 */
	helpers.mixin = function mixin(from) {
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
	
	module.exports = helpers.mixin;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	if (!window.Veams) {
		window.Veams = {};
	}
	
	if (!window.Veams.helpers) {
		window.Veams.helpers = {};
	}
	var helpers = window.Veams.helpers;
	
	/**
	 * Helper method to extend an already existing method.
	 *
	 * @param {Object} to - view which will be extended
	 * @param {Object} from - methods which comes from mixin
	 * @param {string} methodName - function name
	 */
	helpers.methodExtend = function methodExtend(to, from, methodName) {
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
	
	module.exports = helpers.methodExtend;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=veams.js.map