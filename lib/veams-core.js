(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("veams-core", [], factory);
	else if(typeof exports === 'object')
		exports["veams-core"] = factory();
	else
		root["veams-core"] = root["veams-core"] || {}, root["veams-core"]["veams-core"] = factory();
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

	module.exports = __webpack_require__(13);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = mixin;
	
	var _defaults = __webpack_require__(4);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _methodExtend = __webpack_require__(5);
	
	var _methodExtend2 = _interopRequireDefault(_methodExtend);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Merge method functions.
	 *
	 * @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
	 * @param {Array} methods - Array of method names which will be extended.
	 */
	function mixin(from) {
		var methods = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ['initialize', 'render'];
	
		if (from === undefined) {
			console.error('VeamsHelpers : Mixin :: Mixin not found!');
	
			return;
		}
	
		var to = this.prototype;
	
		/** Add those methods which exists on `from` but not on `to` to the latter */
		(0, _defaults2.default)(to, from);
	
		/** we do the same for events */
		if (to.events) {
			(0, _defaults2.default)(to.events, from.events);
		}
	
		// Extend to's methods
		methods.forEach(function (method) {
			(0, _methodExtend2.default)(to, from, method);
		});
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Simple extend method, which extends an object.
	 *
	 * @param {Object} obj - object which will be extended
	 *
	 * @return {Object} obj - extended object
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = defaultsHelper;
	function defaultsHelper(obj) {
	  [].slice.call(arguments, 1).forEach(function (item) {
	    for (var key in item) {
	      if (obj[key] === undefined) obj[key] = item[key];
	    }
	  });
	  return obj;
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Helper method to extend an already existing method.
	 *
	 * @param {Object} to - view which will be extended
	 * @param {Object} from - methods which comes from mixin
	 * @param {string} methodName - function name
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = methodExtend;
	function methodExtend(to, from, methodName) {
		function isUndefined(value) {
			return typeof value === 'undefined';
		}
	
		if (from === undefined) return;
	
		// if the method is defined on from ...
		if (!isUndefined(from[methodName])) {
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
		}
	};
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Simple extend method to extend the properties of an object.
	 *
	 * @param {Object} obj - object which will be extended
	 *
	 * @return {Object} obj - extended object
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = extend;
	function extend(obj) {
	  [].slice.call(arguments, 1).forEach(function (item) {
	    for (var key in item) {
	      obj[key] = item[key];
	    }
	  });
	  return obj;
	};
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Generates numeric id.
	 *
	 * @param {Number} [segments=1] - number of segments of generated id (segments consist of 10 digits, separated by '-').
	 *
	 * @return {String} - generated id
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = makeId;
	function makeId() {
		var segments = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
		var crypto = window.crypto || window.msCrypto;
		var array = crypto.getRandomValues(new Uint32Array(segments));
		var id = '';
		var i = 0;
	
		for (; i < array.length; i++) {
			id += array[i] + '-';
		}
	
		return id.slice(0, -1);
	};
	module.exports = exports['default'];

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Represents VeamsCore.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module VeamsCore
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Sebastian Fitzner
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	__webpack_require__(12);
	
	var _use = __webpack_require__(14);
	
	var _use2 = _interopRequireDefault(_use);
	
	var _events = __webpack_require__(15);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _helpers = __webpack_require__(16);
	
	var _helpers2 = _interopRequireDefault(_helpers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var initState = false;
	
	var VeamsCore = function () {
		function VeamsCore(opts) {
			_classCallCheck(this, VeamsCore);
	
			this._options = {
				namespace: 'Veams',
				addToGlobal: false
			};
	
			this.base = {
				name: 'Veams',
				version: '5.0.0-rc16'
			};
	
			this.use = _use2.default.bind(this);
			this.Plugins = {};
			this.EVENTS = _events2.default;
			this.helpers = {};
			this.detections = {
				width: window.innerWidth,
				height: window.innerHeight
			};
	
			initState = false;
	
			this.setup(opts);
		}
	
		_createClass(VeamsCore, [{
			key: 'setup',
			value: function setup(opts) {
				this.use(_helpers2.default);
	
				this.detections = this.helpers.extend({
					touch: this.helpers.isTouch()
				}, this.detections);
	
				this.options = opts;
			}
		}, {
			key: 'initialize',
			value: function initialize(opts) {
				if (initState === true) {
					return console.info('Veams :: You already initialized Veams!');
				}
	
				/**
	    * Set global options on initialize
	    */
				this.options = opts;
	
				if (this.options.addToGlobal) {
					if (window && !window[this.options.namespace]) {
						window[this.options.namespace] = this || {};
					}
				}
	
				initState = true;
			}
		}, {
			key: 'onInitialize',
			value: function onInitialize(cb) {
				if (!cb || typeof cb !== 'function') {
					console.log('Veams :: Callback is not a function!');
					return;
				}
	
				if (initState === false) {
					this.initialize();
				}
	
				cb();
			}
		}, {
			key: 'onDOMReady',
			value: function onDOMReady(cb) {
				if (typeof cb !== 'function') {
					console.log('Veams :: Callback is not a function!');
					return;
				}
				document.addEventListener('DOMContentLoaded', cb);
			}
		}, {
			key: 'version',
			set: function set(version) {
				this._version = version;
			},
			get: function get() {
				return this._version;
			}
		}, {
			key: 'initialized',
			set: function set(bool) {
				this._initialized = bool;
			},
			get: function get() {
				return this._initialized;
			}
		}, {
			key: 'options',
			set: function set(options) {
				this._options = this.helpers.extend(this.options, options || {});
			},
			get: function get() {
				return this._options;
			}
		}]);
	
		return VeamsCore;
	}();
	
	exports.default = VeamsCore;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Represents a simple plugin system in which `this` is Veams.
	 * @module plugin
	 *
	 * @author Sebastian Fitzner
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (plugin) {
	  if (plugin.pluginName) {
	    this.Plugins[plugin.pluginName] = plugin;
	  }
	
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  plugin.initialize.apply(plugin, [this].concat(args));
	};
	
	module.exports = exports['default'];

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extend = __webpack_require__(6);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _mixin = __webpack_require__(3);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _methodExtend = __webpack_require__(5);
	
	var _methodExtend2 = _interopRequireDefault(_methodExtend);
	
	var _isTouch = __webpack_require__(17);
	
	var _isTouch2 = _interopRequireDefault(_isTouch);
	
	var _throttle = __webpack_require__(18);
	
	var _throttle2 = _interopRequireDefault(_throttle);
	
	var _querySelectorArray = __webpack_require__(19);
	
	var _querySelectorArray2 = _interopRequireDefault(_querySelectorArray);
	
	var _forEach = __webpack_require__(20);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	var _makeId = __webpack_require__(7);
	
	var _makeId2 = _interopRequireDefault(_makeId);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var VeamsHelpers = {
		pluginName: 'Helpers',
		initialize: function initialize(Veams) {
			Veams.addHelper = function addHelper() {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				var params = [].concat(args);
	
				if (params.length === 1) {
					if (_typeof(params[0]) !== 'object') {
						console.error('VeamsHelpers :: You need to pass an object!');
						return;
					}
	
					for (var key in params[0]) {
						if (params[0].hasOwnProperty(key)) {
							if (!Veams.helpers[key]) {
								Veams.helpers[key] = params[0][key];
							} else {
								console.info('VeamsHelpers :: The helper ' + key + ' is already defined! Please define a new name for: ', params[0][key]);
							}
						}
					}
				} else if (params.length === 2) {
	
					if (!Veams.helpers[params[0]]) {
						if (typeof params[0] !== 'string' || typeof params[1] !== 'function') {
							console.error('VeamsHelpers :: You need to pass a string as first argument and the helper function as second one.');
							return;
						}
						Veams.helpers[params[0]] = params[1];
					} else {
						console.info('VeamsHelpers :: The helper ' + params[0] + ' is already defined! Please define a new name for: ', params[1]);
					}
				}
			};
	
			this.addDefaultHelpers(Veams);
		},
	
		addDefaultHelpers: function addDefaultHelpers(Veams) {
			Veams.addHelper('querySelectorArray', _querySelectorArray2.default);
			Veams.addHelper('extend', _extend2.default);
			Veams.addHelper('isTouch', _isTouch2.default);
			Veams.addHelper('mixin', _mixin2.default);
			Veams.addHelper('methodExtend', _methodExtend2.default);
			Veams.addHelper('throttle', _throttle2.default);
			Veams.addHelper('forEach', _forEach2.default);
			Veams.addHelper('makeId', _makeId2.default);
		}
	};
	
	exports.default = VeamsHelpers;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Touch Detection
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = isTouch;
	function isTouch() {
	  return 'ontouchstart' in window;
	};
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Throttle method for resize events and more
	 *
	 * @param {function} func - Function which will be executed.
	 * @param {number} wait - number to wait in milliseconds.
	 * @param {boolean} immediate - execute function immediately.
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = throttle;
	function throttle(func, wait, immediate) {
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
	module.exports = exports['default'];

/***/ },
/* 19 */
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
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = querySelectorArray;
	function querySelectorArray(elem, context) {
	  if (!elem) throw new Error('In order to work with querySelectorArray you need to define an element as string!');
	  var el = elem;
	  var customContext = context || document;
	
	  return Array.prototype.slice.call(customContext.querySelectorAll(el));
	};
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Simple forEach method
	 *
	 * @param {Array} array - array of objects
	 * @param {function} callback - callback function
	 * @param {string} scope - scope of function
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = forEach;
	function forEach(array, callback, scope) {
	  for (var i = 0; i < array.length; i++) {
	    callback.call(scope, i, array[i]);
	  }
	};
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=veams-core.js.map