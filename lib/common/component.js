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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	if (!window.Veams) {
		throw new Error('Please initialize Veams!');
	}
	
	if (!window.Veams.helpers.mixin || !window.Veams.helpers.defaults) {
		throw new Error('The mixin or defaults helper is missing!');
	}
	
	if (!window.Veams.$) {
		throw new Error('Please add a Dom handler like jQuery to the window object!');
	}
	
	/**
	 * Imports
	 */
	
	
	/**
	 * Variables
	 */
	var $ = window.Veams.$;
	
	/**
	 * Local functions
	 */
	
	/**
	 * Get value out of variable string.
	 *
	 * @param {String} str - String which is a reference to a var.
	 *
	 * @return String
	 */
	var getStringVars = function getStringVars(str) {
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
			throw new Error('The resulting variable for your evnts must be a string!');
		} else {
			return finalStr;
		}
	};
	
	/**
	 * Simple template engine for event system.
	 *
	 * @param {String} tplStr - Template string.
	 *
	 * @return String
	 */
	var TemplateEngine = function TemplateEngine(tplStr) {
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
	
	var VeamsComponent = function () {
	
		/**
	  * Constructor
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
			this.evtNamespace = '.' + this.metaData.name;
	
			this.options = obj.options;
			this.initialize();
	
			if (window.Veams.modules) {
				Veams.modules.save(Veams.helpers.defaults(this.info || {}, this.metaData), this.el);
			}
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
				this.registerEvents(this.events, false);
				this.registerEvents(this.subscribe, true);
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
		}, {
			key: 'registerEvents',
			value: function registerEvents(evts, global) {
				var _this = this;
	
				if (evts) {
					Object.keys(evts).forEach(function (key) {
						_this.registerEvent(key, evts[key], global);
					});
				}
			}
		}, {
			key: 'registerEvent',
			value: function registerEvent(evtKey, fn, global) {
				var evtKeyArr = evtKey.split(' ');
				var arrlen = evtKeyArr.length;
				var evtType = getStringVars.apply(this, [TemplateEngine(evtKeyArr[0])]);
				var bindFn = this[fn].bind(this);
	
				if (arrlen > 2) {
					throw new Error('It seems like you have more than two strings in your events object!');
				}
	
				// Bind on this.$el
				if (arrlen === 1 && !global) {
					this.$el.on(evtType + this.evtNamespace, bindFn);
				} else if (arrlen === 1 && global) {
					Veams.Vent.on(evtType, bindFn);
				} else {
					var delegate = getStringVars.apply(this, [TemplateEngine(evtKeyArr[1])]);
	
					this.$el.on(evtType + this.evtNamespace, delegate, bindFn);
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
			value: function renderTemplate(tplName, data) {}
			// window[this.options.namespace].Templates[tplName](window[this.options.namespace].TemplateEngine)
	
	
			/**
	   * Render your module
	   */
	
		}, {
			key: 'render',
			value: function render() {}
		}, {
			key: 'options',
			get: function get() {
				return this._options;
			}
	
			/**
	   * Save options by merging default options with passed options
	   */
			,
			set: function set(options) {
				this._options = Veams.helpers.defaults(options || {}, this._options);
			}
	
			/**
	   * Get module information
	   */
	
		}, {
			key: 'metaData',
			get: function get() {
				return {
					name: _string2.default.capitalizeFirstLetter(_string2.default.toCamelCase(this.namespace))
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
	var internalHelpers = {};
	
	/**
	 * CamelCase strings by replacing hyphens, white space and points.
	 *
	 * @param {String} str - String which will be camelcased
	 */
	internalHelpers.toCamelCase = function (str) {
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
	internalHelpers.hyphenate = function (str) {
		return str.replace(/\s/g, '-').toLowerCase();
	};
	
	/**
	 * String.
	 * @param {String} str - String where first char is upper cased
	 */
	internalHelpers.capitalizeFirstLetter = function (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	
	exports.default = internalHelpers;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=component.js.map