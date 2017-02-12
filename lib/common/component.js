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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _string = __webpack_require__(1);
	
	var _string2 = _interopRequireDefault(_string);
	
	var _getStringValue = __webpack_require__(2);
	
	var _getStringValue2 = _interopRequireDefault(_getStringValue);
	
	var _templateEngine = __webpack_require__(3);
	
	var _templateEngine2 = _interopRequireDefault(_templateEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	if (!window.Veams) {
		throw new Error('Please initialize Veams!');
	}
	
	if (!window.Veams.helpers.mixin || !window.Veams.helpers.defaults) {
		throw new Error('The mixin or defaults helper is missing!');
	}
	
	if (!window.Veams.$) {
		console.info('Please add a DOM handler like jQuery to the window object!');
	}
	
	/**
	 * Imports
	 */
	
	
	/**
	 * Variables
	 */
	var $ = window.Veams.$;
	
	var VeamsComponent = function () {
	
		/**
	  * Constructor
	  *
	  * to save standard elements like el and options and
	  * execute initialize as default method.
	  *
	  * @param {Object} obj [{}] - Object which contains el, options from the DOM and namespace.
	  * @param {Object} options [{}] - Object which contains options of the extended class.
	  */
		function VeamsComponent() {
			var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
			_classCallCheck(this, VeamsComponent);
	
			this.el = obj.el;
			this.options = options;
			this.namespace = null;
			this.evtNamespace = '.' + this.metaData.name;
			this._options = obj.options;
	
			if (window.Veams.$) {
				this.$el = $(obj.el);
			}
	
			if (!obj.namespace) {
				console.log('You should pass an object with a namespace for your component!');
			} else {
				this.namespace = obj.namespace;
			}
	
			this.initialize(obj, options);
			this._create();
		}
	
		// GETTER AND SETTER
	
		/**
	  * Return options
	  */
	
	
		_createClass(VeamsComponent, [{
			key: '_create',
	
	
			// STANDARD METHODS
	
			/**
	   * Private method to create all necessary elements and bindings.
	   *
	   * @private
	   */
			value: function _create() {
				this.preRender();
				this.registerEvents(this.events, false);
				this.registerEvents(this.subscribe, true);
				this.bindEvents();
			}
	
			/**
	   * Initialize your module class and
	   * save some references.
	   */
	
		}, {
			key: 'initialize',
			value: function initialize() {
				return this;
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
	   * Register multiple events which are saved in an object.
	   *
	   * TODO: Clean up global flag
	   *
	   * @param {Object} evts - Events object which contains an object with events as key and functions as value.
	   * @param {Boolean} global - Flag to switch between global and local events.
	   *
	   * @private
	   */
	
		}, {
			key: 'registerEvents',
			value: function registerEvents(evts) {
				var _this = this;
	
				var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
				if (evts) {
					Object.keys(evts).forEach(function (key) {
						_this.registerEvent(key, evts[key], global);
					});
				}
			}
	
			/**
	   * Register an event by using a simple template engine and
	   * a key/value pair.
	   *
	   * TODO: Clean up global flag
	   *
	   * @param {String} evtKey - Event key which contains event and additionally a delegated element.
	   * @param {String} fn - Function defined as string which will be bound to this.
	   * @param {Boolean} global - Flag if global or local event .
	   *
	   * @public
	   *
	   * @example:
	   *
	   * this.registerEvent('click .btn', 'render');
	   * this.registerEvent('click {{this.options.btn}}', 'render');
	   * this.registerEvent('{{App.EVENTS.custom.event', 'render');
	   */
	
		}, {
			key: 'registerEvent',
			value: function registerEvent(evtKey, fn) {
				var global = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
				var evtKeyArr = evtKey.split(' ');
				var arrlen = evtKeyArr.length;
				var evtType = _getStringValue2.default.apply(this, [(0, _templateEngine2.default)(evtKeyArr[0])]);
				var bindFn = this[fn].bind(this);
				var id = evtKeyArr.join('_') + '_' + fn;
	
				if (arrlen > 2) {
					throw new Error('It seems like you have more than two strings in your events object!');
				}
	
				// Bind on this.$el
				if (arrlen === 1 && !global) {
					this.$el.on(evtType + this.evtNamespace, bindFn);
	
					this._subscribers = {
						type: 'event',
						id: id,
						event: evtType,
						handler: bindFn
					};
				} else if (arrlen === 1 && global) {
					Veams.Vent.on(evtType, bindFn);
	
					this._subscribers = {
						type: 'globalEvent',
						id: id,
						event: evtType,
						handler: bindFn
					};
				} else {
					var delegate = _getStringValue2.default.apply(this, [(0, _templateEngine2.default)(evtKeyArr[1])]);
	
					this.$el.on(evtType + this.evtNamespace, delegate, bindFn);
	
					this._subscribers = {
						type: 'delegatedEvent',
						id: id,
						event: evtType,
						handler: bindFn
					};
				}
			}
	
			/**
	   * Bind local and global events
	   */
	
		}, {
			key: 'bindEvents',
			value: function bindEvents() {}
	
			/**
	   * Unbind events
	   *
	   * @public
	   *
	   */
	
		}, {
			key: 'unbindEvents',
			value: function unbindEvents() {
				for (var key in this._subscribers) {
					if (this._subscribers.hasOwnProperty(key)) {
						var obj = this._subscribers[key];
	
						if (obj.type === 'globalEvent') {
							Veams.Vent.off(obj.event, obj.handler);
						} else {
							this.$el.off(obj.event, obj.handler);
						}
					}
				}
			}
	
			/**
	   * Pre-Render templates
	   * which can be used to render content into it
	   */
	
		}, {
			key: 'preRender',
			value: function preRender() {
				return this;
			}
	
			/**
	   * Render template with data
	   *
	   * @param {String} tplName - Template name which gets returned as rendered element.
	   * @param {Object} data - Data which gets handled by the template.
	   */
	
		}, {
			key: 'renderTemplate',
			value: function renderTemplate(tplName, data) {
				if (!window[this.options.namespace].Templates || !window[this.options.namespace].Templates[tplName]) {
					console.error('It seems that you haven\'t defined any template ' + tplName + ' yet!');
				} else {
					return window[this.options.namespace].Templates[tplName](data);
				}
			}
	
			/**
	   * Render your module
	   */
	
		}, {
			key: 'render',
			value: function render() {
				return this;
			}
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
	
			/**
	   * Get module information
	   */
	
		}, {
			key: 'metaData',
			get: function get() {
				return {
					name: typeof this.namespace === 'string' ? _string2.default.capitalizeFirstLetter(_string2.default.toCamelCase(this.namespace)) : ''
				};
			}
	
			/**
	   * Get and set events object
	   */
	
		}, {
			key: 'events',
			set: function set(obj) {
				this._events = obj;
			},
			get: function get() {
				return this._events;
			}
	
			/**
	   * Get and set subscribe object
	   */
	
		}, {
			key: 'subscribe',
			set: function set(obj) {
				this._subscribe = obj;
			},
			get: function get() {
				return this._subscribe;
			}
		}, {
			key: '_subscribers',
			set: function set(obj) {
				if (!this.__subscribers) {
					this.__subscribers = {};
				}
	
				this.__subscribers[obj.id] = {
					type: obj.type,
					event: obj.event,
					handler: obj.handler
				};
			},
			get: function get() {
				return this.__subscribers;
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var stringHelpers = {};
	
	/**
	 * CamelCase strings by replacing hyphens, white space and points.
	 *
	 * @param {String} str - String which will be camelcased
	 */
	stringHelpers.toCamelCase = function (str) {
		// Lower cases the string
		return str.toLowerCase()
		// Replaces any - or _ characters with a space
		.replace(/[-_]+/g, ' ')
		// Removes any non alphanumeric characters
		.replace(/[^\w\s]/g, '')
		// Uppercases the first character in each group immediately following a space
		// (delimited by spaces)
		.replace(/ (.)/g, function ($1) {
			return $1.toUpperCase();
		})
		// Removes spaces
		.replace(/ /g, '');
	};
	
	/**
	 * String which will be hyphenated by replacing white space and lower case the characters.
	 * @param {String} str - String
	 */
	stringHelpers.hyphenate = function (str) {
		return str.replace(/\s/g, '-').toLowerCase();
	};
	
	/**
	 * String.
	 * @param {String} str - String where first char is upper cased
	 */
	stringHelpers.capitalizeFirstLetter = function (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	
	exports.default = stringHelpers;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Get value out of variable string.
	 *
	 * @param {String} str - String which is a reference to a var.
	 *
	 * @return String
	 */
	var getStringValue = function getStringValue(str) {
		if (str.indexOf('.') === -1) return str;
		var arr = str.split('.');
		var context = arr[0];
		var finalStr = context === 'this' ? this : window[context];
		var strReplacer = function strReplacer(el, prev) {
			return prev[el];
		};
	
		arr.shift();
		arr.forEach(function (item) {
			finalStr = strReplacer(item, finalStr);
			return finalStr;
		});
	
		if (typeof finalStr !== 'string') {
			throw new Error('The resulting variable out of your events object must be a string!');
		} else {
			return finalStr;
		}
	};
	
	exports.default = getStringValue;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	/**
	 * Simple template engine for event system.
	 *
	 * @param {String} tplStr - Template string.
	 *
	 * @return String
	 */
	var templateEngine = function templateEngine(tplStr) {
		var reg = new RegExp('(\{\{\s?)(.+)(\s?\}\})');
		var match = reg.exec(tplStr);
		var returnVal = '';
	
		if (match) {
			returnVal = match[2];
		} else {
			returnVal = tplStr;
		}
	
		return returnVal;
	};
	
	exports.default = templateEngine;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=component.js.map