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

	module.exports = __webpack_require__(8);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
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
	
	var _base = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./base\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	
	var _base2 = _interopRequireDefault(_base);
	
	var _getStringValue = __webpack_require__(9);
	
	var _getStringValue2 = _interopRequireDefault(_getStringValue);
	
	var _templateEngine = __webpack_require__(10);
	
	var _templateEngine2 = _interopRequireDefault(_templateEngine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Custom Functions
	 */
	function buildEvtId(evtKeyArr, fnName) {
		return evtKeyArr.join('_') + '_' + fnName;
	}
	
	var VeamsComponent = function (_VeamsBase) {
		_inherits(VeamsComponent, _VeamsBase);
	
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
	
			var _this = _possibleConstructorReturn(this, (VeamsComponent.__proto__ || Object.getPrototypeOf(VeamsComponent)).call(this, obj, options));
	
			_this.appInstance = obj.appInstance || window.Veams;
	
			if (!_this.appInstance) {
				throw new Error('VeamsComponent :: Please provide your app instance!');
			}
	
			if (!_this.appInstance.$) {
				console.info('VeamsComponent :: Please add a DOM handler like jQuery to the app instance!');
			}
	
			if (_this.appInstance.$) {
				_this.$el = _this.appInstance.$(obj.el);
			}
	
			_this.initialize(obj, options);
			_this._create();
			return _this;
		}
	
		// ----------------------------------------------------------
		// GETTER & SETTERS
		// ----------------------------------------------------------
	
		/**
	  * Get and set events object
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
				var _this2 = this;
	
				var global = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	
				if (evts) {
					Object.keys(evts).forEach(function (key) {
						_this2.registerEvent(key, evts[key], global);
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
				var evtType = _getStringValue2.default.apply(this, [(0, _templateEngine2.default)(evtKeyArr[0]), this.appInstance]);
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
	}(_base2.default);
	
	exports.default = VeamsComponent;
	module.exports = exports['default'];

/***/ },
/* 9 */
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
	var getStringValue = function getStringValue(str, instanceObject) {
		if (str.indexOf('.') === -1) return str;
		var arr = str.split('.');
		var context = arr[0];
		var finalStr = context === 'this' ? this : instanceObject ? instanceObject : window[context];
	
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
/* 10 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=component.js.map