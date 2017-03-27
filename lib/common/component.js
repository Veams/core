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
	
	/**
	 * Represents a component constructor which supports
	 * options merging,
	 * binding and unbinding of events and subscriptions with template strings,
	 * rendering of templates
	 * and a destroy behaviour.
	 *
	 * Keep in mind, that this class is a dependent of Veams.
	 *
	 * TODO: Make a native one which does not need any Veams specific stuff.
	 *
	 * @module VeamsComponent
	 * @author Sebastian Fitzner
	 */
	
	/**
	 * Imports
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _getStringValue = __webpack_require__(1);
	
	var _getStringValue2 = _interopRequireDefault(_getStringValue);
	
	var _templateEngine = __webpack_require__(2);
	
	var _templateEngine2 = _interopRequireDefault(_templateEngine);
	
	var _string = __webpack_require__(3);
	
	var _string2 = _interopRequireDefault(_string);
	
	var _mixin = __webpack_require__(4);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Custom Functions
	 */
	function buildEvtId(evtKeyArr, fnName) {
		return evtKeyArr.join('_') + '_' + fnName;
	}
	
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
	
			if (!obj.appInstance) {
				throw new Error('VeamsComponent :: Please provide your app instance!');
			}
	
			this.appInstance = obj.appInstance;
	
			if (!this.appInstance.helpers.mixin || !this.appInstance.helpers.extend || !this.appInstance.helpers.makeId) {
				throw new Error('VeamsComponent :: The mixin, makeId or extend helper is missing!');
			}
	
			if (!this.appInstance.$) {
				console.info('VeamsComponent :: Please add a DOM handler like jQuery to the app instance!');
			}
	
			if (!obj.namespace) {
				console.log('You should pass an object with a namespace for your component!');
			} else {
				this.namespace = obj.namespace;
			}
	
			this.instanceId = this.namespace;
			this.el = obj.el;
			this.options = options;
			this.namespace = null;
			this.evtNamespace = '.' + this.metaData.name;
			this._options = obj.options;
	
			if (this.appInstance.$) {
				this.$el = this.appInstance.$(obj.el);
			}
	
			this.initialize(obj, options);
			this._create();
		}
	
		// ----------------------------------------------------------
		// GETTER & SETTERS
		// ----------------------------------------------------------
	
		/**
	  * Return options
	  */
	
	
		_createClass(VeamsComponent, [{
			key: '_create',
	
	
			// ----------------------------------------------------------
			// STANDARD METHODS
			// ----------------------------------------------------------
	
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
	   * Bind local and global events
	   *
	   * @public
	   */
	
		}, {
			key: 'bindEvents',
			value: function bindEvents() {}
	
			/**
	   * Unbind events
	   *
	   * @public
	   */
	
		}, {
			key: 'unbindEvents',
			value: function unbindEvents() {}
	
			/**
	   * Pre-Render templates
	   * which can be used to render content into it
	   *
	   * @public
	   */
	
		}, {
			key: 'preRender',
			value: function preRender() {
				return this;
			}
	
			/**
	   * Render your module
	   *
	   * @public
	   */
	
		}, {
			key: 'render',
			value: function render() {
				return this;
			}
	
			/**
	   * Destroy component by unbinding events and
	   * removing element from DOM
	   */
	
		}, {
			key: 'destroy',
			value: function destroy() {
				this.unregisterEvents();
				this.unbindEvents();
				this.$el.remove();
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
				if (!this.appInstance.templater) {
					console.error('\n\t\t\t\tVeamsComponent :: It seems that you haven\'t added the VeamsTemplater plugin. In order to work with \'renderTemplate()\' you need to add it!\n\t\t\t');
				} else {
					return this.appInstance.templater.render(tplName, data);
				}
			}
	
			// ----------------------------------------------------------
			// MOUNT PROCESS METHODS
			// Mount process methods will be handled by the VeamsModules plugin
			// ----------------------------------------------------------
	
			/**
	   * This method will be executed after initialise
	   */
	
		}, {
			key: 'willMount',
			value: function willMount() {}
	
			/**
	   * This method will be executed before unregistering events
	   */
	
		}, {
			key: 'willUnmount',
			value: function willUnmount() {}
	
			/**
	   * This method will be executed after render
	   */
	
		}, {
			key: 'didMount',
			value: function didMount() {}
	
			/**
	   * This method will be executed after unregistering events
	   */
	
		}, {
			key: 'didUnmount',
			value: function didUnmount() {}
	
			// ----------------------------------------------------------
			// EVENTS METHODS
			// ----------------------------------------------------------
	
			/**
	   * Register multiple events which are saved in an object.
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
	   * @param {String} evtKey - Event key which contains event and additionally a delegated element.
	   * @param {String} fn - Function defined as string which will be bound to this.
	   * @param {Boolean} global - Flag if global or local event .
	   *
	   * @public
	   *
	   * @example
	   * this.registerEvent('click .btn', 'render');
	   * this.registerEvent('click {{this.options.btn}}', 'render');
	   * this.registerEvent('{{App.EVENTS.custom.event', 'render');
	   * this.registerEvent('{{App.EVENTS.resize', 'render', true);
	   */
	
		}, {
			key: 'registerEvent',
			value: function registerEvent(evtKey, fn) {
				var global = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
	
				if (typeof evtKey !== 'string') {
					console.error('VeamsComponent :: Your event is not a string!');
					return;
				}
	
				if (typeof fn !== 'string') {
					console.error('VeamsComponent :: Your event handler function is not a string!');
					return;
				}
	
				var evtKeyArr = evtKey.split(' ');
				var arrlen = evtKeyArr.length;
				var evtType = _getStringValue2.default.apply(this, [(0, _templateEngine2.default)(evtKeyArr[0])]);
				var bindFn = this[fn].bind(this);
				var id = buildEvtId(evtKeyArr, fn);
	
				if (arrlen > 2) {
					throw new Error('It seems like you have more than two strings in your events object!');
				}
	
				// Bind on this.$el
				if (arrlen === 1 && !global) {
					this.$el.on(evtType, bindFn);
	
					this._subscribers = {
						type: 'event',
						id: id,
						event: evtType,
						handler: bindFn
					};
				} else if (arrlen === 1 && global) {
					this.appInstance.Vent.subscribe(evtType, bindFn);
	
					this._subscribers = {
						type: 'globalEvent',
						id: id,
						event: evtType,
						handler: bindFn
					};
				} else {
					var delegate = _getStringValue2.default.apply(this, [(0, _templateEngine2.default)(evtKeyArr[1])]);
	
					this.$el.on(evtType, delegate, bindFn);
	
					this._subscribers = {
						type: 'delegatedEvent',
						delegate: delegate,
						id: id,
						event: evtType,
						handler: bindFn
					};
				}
			}
	
			/**
	   * Delete all registered events.
	   */
	
		}, {
			key: 'unregisterEvents',
			value: function unregisterEvents() {
				for (var key in this._subscribers) {
					if (this._subscribers.hasOwnProperty(key)) {
						var obj = this._subscribers[key];
	
						if (obj.type === 'globalEvent') {
							this.appInstance.Vent.unsubscribe(obj.event, obj.handler);
						} else if (obj.type === 'delegatedEvent') {
							this.$el.off(obj.event, obj.delegate, obj.handler);
						} else {
							this.$el.off(obj.event, obj.handler);
						}
					}
				}
			}
	
			/**
	   * Unregister an event by using the saved subscribers and
	   * a key/value pair.
	   *
	   *
	   * @param {String} evtKey - Event key which contains event and additionally a delegated element.
	   * @param {String} fn - Function defined as string which will be unbound to this.
	   *
	   * @public
	   *
	   * @example
	   * this.unregisterEvent('click .btn', 'render');
	   * this.unregisterEvent('click {{this.options.btn}}', 'render');
	   * this.unregisterEvent('{{App.EVENTS.custom.event', 'render');
	   * this.unregisterEvent('{{App.EVENTS.resize', 'render');
	   */
	
		}, {
			key: 'unregisterEvent',
			value: function unregisterEvent(evtKey, fn) {
				var evtKeyArr = evtKey.split(' ');
				var id = buildEvtId(evtKeyArr, fn);
	
				if (this._subscribers[id]) {
					var obj = this._subscribers[id];
	
					if (obj.type === 'globalEvent') {
						this.appInstance.Vent.unsubscribe(obj.event, obj.handler);
					} else if (obj.type === 'delegatedEvent') {
						this.$el.off(obj.event, obj.delegate, obj.handler);
					} else {
						this.$el.off(obj.event, obj.handler);
					}
				}
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
				this.options = this.appInstance.helpers.extend(this.options, options || {});
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
		}, {
			key: 'instanceId',
			get: function get() {
				return this._instanceId;
			},
			set: function set(id) {
				this._instanceId = id + '_' + Date.now() + '_' + this.appInstance.helpers.makeId();
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
					delegate: obj.delegate,
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
	 * Add mixin functionality to extend module class by using simple objects
	 */
	
	
	VeamsComponent.mixin = _mixin2.default;
	
	exports.default = VeamsComponent;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Get value out of variable string.
	 *
	 * @param {String} str - String which is a reference to a var.
	 *
	 * @return String
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Simple template engine for event system.
	 *
	 * @param {String} tplStr - Template string.
	 *
	 * @return String
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
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

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = mixin;
	
	var _defaults = __webpack_require__(5);
	
	var _defaults2 = _interopRequireDefault(_defaults);
	
	var _methodExtend = __webpack_require__(6);
	
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
/* 5 */
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
/* 6 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=component.js.map