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
	
	module.exports = __webpack_require__(10);
	__webpack_require__(7);
	__webpack_require__(16);
	__webpack_require__(17);

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

/***/ },
/* 7 */
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
/* 8 */
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
	 * Get dom elements in an array
	 *
	 * @param {String} elem - Required: selector
	 * @param {Object} [context] - Optional: context
	 *
	 * @return {Array}
	 */
	helpers.querySelectorArray = helpers.$ = function querySelectorArray(elem, context) {
	  if (!elem) throw new Error('In order to work with querySelectorArray you need to define an element as string!');
	  var el = elem;
	  var customContext = context || document;
	
	  return Array.prototype.slice.call(customContext.querySelectorAll(el));
	};
	
	module.exports = helpers.querySelectorArray;

/***/ },
/* 9 */
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
	 * Simple forEach method
	 *
	 * @param {Array} array - array of objects
	 * @param {function} callback - callback function
	 * @param {string} scope - scope of function
	 */
	helpers.forEach = function forEach(array, callback, scope) {
	  for (var i = 0; i < array.length; i++) {
	    callback.call(scope, i, array[i]);
	  }
	};
	
	module.exports = helpers.forEach;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(11);
	
	/**
	 * Variables
	 */
	
	exports.default = window.Veams; /**
	                                 * Imports
	                                 */

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(12);
	
	var _events = __webpack_require__(5);
	
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
	var Veams = window.Veams = window.Veams || {}; /**
	                                                * Polyfills
	                                                */
	
	
	(function (window, document, undefined) {
		'use strict';
		// Version
	
		Veams.version = '5.0.0-alpha.2';
		// Dom handler
		Veams.$ = Veams.$ || window.VeamsQuery || window.jQuery;
		// Global events
		Veams.EVENTS = _events2.default;
		/**
	  * Helper functions object
	  * @memberof Veams
	  */
		Veams.helpers = Veams.helpers || {};
		// Screen Size
		Veams.screenSize = Veams.screenSize || {
			width: window.innerWidth,
			height: window.innerHeight
		};
		// Feature detection
		Veams.support = Veams.support || {};
		// Current Media Query
		Veams.currentMedia = Veams.currentMedia || '';
		// Core
		Veams.core = Veams.core || _core2.default;
	})(window, document);
	
	exports.default = Veams;
	module.exports = exports['default'];

/***/ },
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
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _modules = __webpack_require__(19);
	
	var _modules2 = _interopRequireDefault(_modules);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultsHelper = __webpack_require__(7);
	var isTouchHelper = __webpack_require__(15);
	var mediaQueryHandler = __webpack_require__(20);
	var logger = __webpack_require__(21);
	
	/**
	 * Imports
	 *
	 * TODO: Clean up bindings
	 */
	
	var Core = function () {
		function Core() {
			_classCallCheck(this, Core);
	
			// General options
			this.options = {
				$: false,
				namespace: 'App',
				attrPrefix: 'data-js',
				mediaQueryProp: 'font-family'
			};
		}
	
		_createClass(Core, [{
			key: 'initialize',
			value: function initialize(opts) {
				/**
	    * Set global options on initialize
	    */
				this.options = Veams.options = opts;
	
				if (!window.Veams) {
					window.Veams = {};
				}
	
				/**
	    * Namespace of application
	    */
				if (!window[this.options.namespace]) {
					window[this.options.namespace] = window[this.options.namespace] || {};
					window[this.options.namespace].Templates = window[this.options.namespace].Templates || {};
				}
	
				/**
	    * Reference to Veams-query.js or jQuery instance
	    * @memberof Veams
	    */
				if (!this.options.$) {
					throw new Error('You need to pass a dom handler like jQuery or Veams-Query to VeamsCore by providing the option "$"!');
				} else {
					window.Veams.$ = this.options.$;
				}
	
				/**
	    * Veams Module Handling
	    */
				Veams.modules = Veams.modules || new _modules2.default();
	
				/**
	    * Veams Global Pub/Sub System
	    * @memberof Veams
	    */
				Veams.Vent = Veams.Vent || Veams.$(document);
	
				/**
	    * Media Query Handler
	    */
				mediaQueryHandler(this.options);
	
				/**
	    * Logger functionality
	    */
				logger();
	
				/**
	    * Support
	    */
				Veams.support.touch = isTouchHelper();
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
	
	var defaultsHelper = __webpack_require__(7);
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

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultsHelper = __webpack_require__(7);
	var queryHelper = __webpack_require__(8);
	var forEachHelper = __webpack_require__(9);
	
	var Modules = function () {
		function Modules() {
			var Veams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.Veams;
	
			_classCallCheck(this, Modules);
	
			this.list = {}; // Module list
			this.modulesInContext = []; // Save modules on current page
			this.queryString = '[' + Veams.options.attrPrefix + '-module]';
			this.references = [];
	
			this.initialize();
		}
	
		_createClass(Modules, [{
			key: 'initialize',
			value: function initialize() {
				this.modulesInContext = queryHelper(this.queryString);
				this.observe(document.body);
	
				this.bindEvents();
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {}
	
			/**
	   * Save the module in Veams.modules.list.
	   * @param {Object} module - module metadata object (@see VeamsComponent.metaData())
	   * @param {Object} element - module element (this.el)
	   */
	
		}, {
			key: 'save',
			value: function save(module, element) {
				if (!this.list[module.name]) {
					this.list[module.name] = module;
					this.list[module.name].nodes = [element];
				} else {
					this.list[module.name].nodes.push(element);
				}
	
				Veams.Vent.trigger(Veams.EVENTS.moduleRegistered, {
					module: module,
					el: element
				});
			}
	
			/**
	   * Register multiple modules.
	   *
	   * @param {Array} arr - Array which contains the modules as object.
	   */
	
		}, {
			key: 'register',
			value: function register(arr) {
				if (!Array.isArray(arr)) {
					throw new Error('You need to pass an array to register()!');
				}
	
				this.modulesList = arr;
			}
		}, {
			key: 'registerAll',
			value: function registerAll() {
				var _this = this;
	
				this.modulesList.forEach(function (module) {
					_this.registerOne(module);
				});
			}
	
			/**
	   * Initialize a module and render it and/or provide a callback function
	   *
	   * @param {Object} obj - Definition of our module
	   * @param {string} obj.el - Required: element
	   * @param {Object} obj.module - Required: class which will be used to render your module
	   * @param {boolean} [obj.render=true] - Optional: render the class, if false the class will only be initialized
	   * @param {function} [obj.cb] - Optional: provide a function which will be executed after initialisation
	   * @param {Object} [obj.context] - Optional: context of module
	   * @param {Object} [obj.options] - Optional: You can pass options to the module via JS (Useful for DOMChanged)
	   *
	   */
	
		}, {
			key: 'registerOne',
			value: function registerOne(obj) {
				if (!obj.domName) throw new Error('In order to work with register() you need to define the module name as string!');
				if (!obj.module) throw new Error('In order to work with register() you need to define a module!');
	
				this.initModules(obj.domName, obj.module, obj.render, obj.options, obj.cb);
			}
	
			/**
	   * Initialize a module and render it and/or provide a callback function
	   *
	   * @param {string} domName - Required: dom name of the element
	   * @param {Object} Module - Required: class which will be used to render your module
	   * @param {boolean} [render=true] - Optional: render the class, if false the class will only be initialized
	   * @param {Object} [options] - Optional: You can pass options to the module via JS (Useful for DOMChanged)
	   * @param {function} [cb] - Optional: provide a function which will be executed after initialisation
	   *
	   */
	
		}, {
			key: 'initModules',
			value: function initModules(domName, Module, render, options, cb) {
				forEachHelper(this.modulesInContext, function (i, el) {
					var noRender = el.getAttribute(Veams.options.attrPrefix + '-no-render') || render === false || false;
					var dataModules = el.getAttribute(Veams.options.attrPrefix + '-module').split(' ');
	
					if (dataModules.indexOf(domName) !== -1) {
						var attrs = el.getAttribute('data-js-options');
						var mergedOptions = defaultsHelper(options || {}, JSON.parse(attrs));
	
						var module = new Module({
							el: el,
							options: mergedOptions,
							namespace: domName
						});
	
						// Render after initial module loading
						if (!noRender) module.render();
						// Provide callback function in which you can use module and options
						if (cb && typeof cb === 'function') cb(module, mergedOptions);
					}
				});
			}
	
			/**
	   * Add mutation observer to observe new modules.
	   *
	   * @param {Object} context - Context for the mutation observer
	   */
	
		}, {
			key: 'observe',
			value: function observe(context) {
				var _this2 = this;
	
				var observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						var entry = {
							mutation: mutation,
							el: mutation.target,
							value: mutation.target.textContent,
							oldValue: mutation.oldValue
						};
	
						if (entry.el instanceof HTMLElement) {
							console.log('Recording mutation in ', entry.el);
	
							_this2.modulesInContext = _this2.getModulesInContext(entry.el);
							_this2.registerAll();
						}
					});
				});
	
				observer.observe(context, {
					attributes: true,
					childList: true,
					subtree: true
				});
			}
	
			/**
	   * Get Modules in a specific context.
	   *
	   * @param {Object} context - Context for query specific string
	   */
	
		}, {
			key: 'getModulesInContext',
			value: function getModulesInContext(context) {
				return queryHelper(this.queryString, context);
			}
		}]);
	
		return Modules;
	}();
	
	exports.default = Modules;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	exports.default = function (opts) {
		if (!window.Veams) {
			window.Veams = {};
		}
		// Media Query
		var head = document.querySelectorAll('head');
	
		/**
	  * Add current media query to Veams
	  */
		Veams.currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(opts.mediaQueryProp);
	
		// Trigger global resize event
		window.onresize = throttleHelper(function (e) {
			var currentMedia = window.getComputedStyle(head[0], null).getPropertyValue(opts.mediaQueryProp);
			var width = window.innerWidth;
	
			if (currentMedia !== Veams.currentMedia) {
				var oldMedia = Veams.currentMedia;
	
				Veams.currentMedia = currentMedia;
	
				console.log('Veams.currentMedia: ', Veams.currentMedia);
	
				Veams.Vent.trigger(_events2.default.mediachange, {
					type: _events2.default.mediachange,
					currentMedia: currentMedia,
					oldMedia: oldMedia
				});
			}
	
			if (width !== Veams.screenSize.width) {
				Veams.screenSize.width = width;
				Veams.Vent.trigger(_events2.default.resize, e);
			}
		}, 300);
	};
	
	var _events = __webpack_require__(5);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var throttleHelper = __webpack_require__(6);
	
	/**
	 * Imports
	 */
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var logger = function logger() {
		if (!window.Veams) {
			console.error('Veams is not defined!');
	
			window.Veams = {};
	
			return;
		}
	
		/**
	  * Devmode and logger
	  */
		Veams.devmode = false;
		Veams.logger = false;
	
		if (document.location.search.indexOf('devmode') > -1) {
			Veams.devmode = true;
		}
	
		if (document.location.search.indexOf('logger') > -1) {
			Veams.logger = true;
		}
	
		// hide all warnings and logs if not in devmode
		if (!Veams.devmode) {
			console.log = console.warn = function () {};
		}
	
		// add console output element (triggered by parameter 'devmode' and 'logger' in url)
		if (Veams.devmode && Veams.logger) {
			(function () {
				var logger = document.createElement('pre');
	
				logger.setAttribute('id', 'logger');
				document.body.appendChild(logger);
	
				console.write = function () {
					for (var i = 0; i < arguments.length; i++) {
						if (_typeof(arguments[i]) === 'object') {
							logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
						} else {
							logger.innerHTML += arguments[i] + '<br />';
						}
					}
	
					logger.innerHTML += '<br />';
					logger.scrollTop = logger.scrollHeight;
				};
	
				console.error = function () {
					logger.innerHTML += '[Error]<br />';
					console.write.apply(this, arguments);
				};
	
				console.warn = function () {
					logger.innerHTML += '[Warn]<br />';
					console.write.apply(this, arguments);
				};
	
				console.log = function () {
					logger.innerHTML += '[Log]<br />';
					console.write.apply(this, arguments);
				};
			})();
		}
	};
	
	module.exports = logger;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=veams.js.map