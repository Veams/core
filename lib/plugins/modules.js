(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("plugins/modules", [], factory);
	else if(typeof exports === 'object')
		exports["plugins/modules"] = factory();
	else
		root["plugins/modules"] = root["plugins/modules"] || {}, root["plugins/modules"]["plugins/modules"] = factory();
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
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Veams = {};
	// let __cache = {};
	
	/**
	 * TODO: Clean up of class
	 *
	 * Make it more pure!!! It is work in progress but it works, yeah!
	 *
	 */
	
	/**
	 * - Get modules in DOM
	 * - Get Classes and options from init process
	 * - Split up conditional modules from other modules
	 * - Init other modules
	 * - Bind events when available from conditional modules
	 * -
	 */
	
	var Modules = function () {
		function Modules() {
			var VEAMS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.Veams;
			var opts = arguments[1];
	
			_classCallCheck(this, Modules);
	
			Veams = VEAMS;
	
			this.options = opts;
			this._cache = []; // Module list
			this.modulesInContext = []; // Save modules on current page
			this.modulesRegister = [];
			this.modulesOnInit = [];
			this.modulesOnConditions = [];
	
			this.initialize();
		}
	
		_createClass(Modules, [{
			key: 'initialize',
			value: function initialize() {
				this.queryString = '[' + this.options.attrPrefix + '-module]';
				this.modulesInContext = Veams.helpers.querySelectorArray(this.queryString);
	
				if (this.options.useMutationObserver) {
					this.observe(document.body);
				}
	
				this.bindEvents();
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {
				var _this = this;
	
				if (!Veams.Vent && this.options.useMutationObserver === false) {
					console.info('VeamsModules :: In order to work with the the ajax handling in VeamsModulesHandler ' + 'you need to define "useMutationObserver" or use the VeamsVent plugin!');
	
					return;
				}
	
				if (Veams.Vent && this.options.useMutationObserver === false) {
					Veams.Vent.on(Veams.EVENTS.DOMchanged, function (e, context) {
						_this.modulesInContext = _this.getModulesInContext(context);
	
						if (_this.options.logs) {
							console.info('VeamsModules :: Recording new context. When available new modules will be initialised in: ', context);
						}
	
						_this.registerAll();
					});
				}
			}
	
			/**
	   * Save the module in Veams.modules._cache.
	   *
	   * @param {Object} obj.module - module metadata object (@see VeamsComponent.metaData())
	   * @param {Object} obj.element - module element (this.el)
	   */
	
		}, {
			key: 'addToCache',
			value: function addToCache(obj) {
				this._cache.push(obj);
	
				if (Veams.Vent) {
					Veams.Vent.trigger(Veams.EVENTS.moduleCached, {
						module: obj.module,
						el: obj.element
					});
				}
			}
		}, {
			key: 'removeFromCacheByKey',
			value: function removeFromCacheByKey(obj) {
				var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'element';
	
				var deleteIndex = void 0;
	
				for (var i = 0; i < this._cache.length; i++) {
					var cacheItem = this._cache[i];
	
					if (cacheItem[key] === obj) {
						if (cacheItem.instance.willUnmount) cacheItem.instance.willUnmount();
						if (cacheItem.instance.unregisterEvents) cacheItem.instance.unregisterEvents();
						if (cacheItem.instance.didUnmount) cacheItem.instance.didUnmount();
	
						deleteIndex = i;
					}
				}
	
				if (deleteIndex) this._cache.splice(deleteIndex, 1);
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
					throw new Error('VeamsModules :: You need to pass an array to register()!');
				}
	
				this.modulesRegister = this.modulesRegister.concat(arr);
	
				this.splitUpModules();
				this.bindConditions();
				this.registerAll();
			}
		}, {
			key: 'registerAll',
			value: function registerAll() {
				if (!this.modulesRegister) return;
	
				this.registerInitialModules();
				this.registerConditionalModules();
			}
		}, {
			key: 'registerConditionalModules',
			value: function registerConditionalModules() {
				var _this2 = this;
	
				this.modulesOnConditions.forEach(function (module) {
					_this2.registerOne(module);
				});
			}
		}, {
			key: 'registerInitialModules',
			value: function registerInitialModules() {
				var _this3 = this;
	
				this.modulesOnInit.forEach(function (module) {
					_this3.registerOne(module);
				});
			}
		}, {
			key: 'splitUpModules',
			value: function splitUpModules() {
				var _this4 = this;
	
				this.modulesRegister.forEach(function (module) {
					if (_this4.isCondition(module)) {
						_this4.modulesOnConditions.push(module);
					} else {
						_this4.modulesOnInit.push(module);
					}
				});
			}
		}, {
			key: 'isCondition',
			value: function isCondition(obj) {
				return obj.conditions && typeof obj.conditions === 'function';
			}
		}, {
			key: 'makeConditionCheck',
			value: function makeConditionCheck(obj) {
				if (obj.conditions && typeof obj.conditions === 'function') {
					return obj.conditions();
				}
			}
		}, {
			key: 'checkModuleInCache',
			value: function checkModuleInCache(obj) {
				var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'element';
	
				var state = false;
	
				this._cache.forEach(function (module) {
					if (module[key] === obj) state = true;
				});
	
				return state;
			}
		}, {
			key: 'checkModule',
			value: function checkModule(node) {
				var state = false;
	
				this._cache.forEach(function (module) {
					if (module.element === node) state = true;
				});
	
				return state;
			}
		}, {
			key: 'bindConditions',
			value: function bindConditions() {
				var _this5 = this;
	
				this.modulesOnConditions.forEach(function (module) {
					if (module.conditionsListenOn && module.conditionsListenOn.length) {
						_this5.registerCondition(module);
					}
				});
			}
		}, {
			key: 'registerCondition',
			value: function registerCondition(module) {
				var _this6 = this;
	
				var globalEvts = module.conditionsListenOn.join(' ');
	
				if (Veams.Vent) {
					Veams.Vent.subscribe(globalEvts, function () {
						if (_this6.makeConditionCheck(module)) {
							_this6.registerOne(module);
						} else {
							_this6.unregisterOne(module);
						}
					});
				}
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
				if (!obj.domName) throw new Error('VeamsModules :: In order to work with register() you need to define the module name as string!');
				if (!obj.module) throw new Error('VeamsModules :: In order to work with register() you need to define a module!');
	
				this.initModules(obj);
			}
		}, {
			key: 'unregisterOne',
			value: function unregisterOne(obj) {
				if (this.checkModuleInCache(obj.module, 'module') === true) {
					this.removeFromCacheByKey(obj.module, 'module');
				}
			}
	
			/**
	   * Initialize a module and render it and/or provide a callback function
	   *
	   * @param {string} obj.domName - Required: dom name of the element
	   * @param {Object} obj.Module - Required: class which will be used to render your module
	   * @param {boolean} [obj.render=true] - Optional: render the class, if false the class will only be initialized
	   * @param {Object} [obj.options] - Optional: You can pass options to the module via JS (Useful for DOMChanged)
	   * @param {function} [obj.cb] - Optional: provide a function which will be executed after initialisation
	   *
	   */
	
		}, {
			key: 'initModules',
			value: function initModules(obj) {
				var _this7 = this;
	
				Veams.helpers.forEach(this.modulesInContext, function (i, el) {
					_this7.initModule(Veams.helpers.extend({
						el: el
					}, obj));
				});
			}
		}, {
			key: 'initModule',
			value: function initModule(obj) {
				var noRender = obj.el.getAttribute(this.options.attrPrefix + '-no-render') || obj.render === false || false;
				var dataModules = obj.el.getAttribute(this.options.attrPrefix + '-module').split(' ');
	
				if (dataModules.indexOf(obj.domName) !== -1) {
	
					// Check condition
					if (obj.conditions && typeof obj.conditions === 'function' && obj.conditions() !== true) {
						return;
					}
	
					// Check init state
					if (this.checkModule(obj.el) === true) {
						console.info('VeamsModules :: Element is already in cache and initialized: ');
						console.log(obj.el);
						return;
					}
	
					// Go ahead when condition is true
					var attrs = obj.el.getAttribute('data-js-options');
					var mergedOptions = Veams.helpers.extend(JSON.parse(attrs), obj.options || {});
					var Module = obj.module;
					var module = new Module({
						el: obj.el,
						namespace: obj.domName,
						options: mergedOptions
					});
	
					this.addToCache({
						element: obj.el,
						module: obj.module,
						instance: module,
						name: obj.domName
					});
	
					// Mount process
					if (module.willMount) module.willMount();
	
					// Render after initial module loading
					if (!noRender) module.render();
	
					// Provide callback function in which you can use module and options
					if (obj.cb && typeof obj.cb === 'function') obj.cb(module, mergedOptions);
	
					// Mount process
					if (module.didMount) module.didMount();
				}
			}
	
			/**
	   * Add mutation observer to observe new modules.
	   *
	   * @param {Object} context - Context for the mutation observer
	   *
	   * TODO: Improve for loops
	   */
	
		}, {
			key: 'observe',
			value: function observe(context) {
				var _this8 = this;
	
				var observer = new MutationObserver(function (mutations) {
					// look through all mutations that just occured
					for (var i = 0; i < mutations.length; ++i) {
						// look through all added nodes of this mutation
	
						for (var j = 0; j < mutations[i].addedNodes.length; ++j) {
							var addedNode = mutations[i].addedNodes[j];
	
							if (addedNode instanceof HTMLElement) {
								if (addedNode.getAttribute(_this8.options.attrPrefix + '-module')) {
									var domName = addedNode.getAttribute(_this8.options.attrPrefix + '-module');
	
									if (_this8.options.logs) {
										console.info('VeamsModules :: Recording new module: ', addedNode, domName);
									}
	
									var _iteratorNormalCompletion = true;
									var _didIteratorError = false;
									var _iteratorError = undefined;
	
									try {
										for (var _iterator = _this8.modulesRegister[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
											var module = _step.value;
	
											if (module.domName === domName) {
												var obj = Veams.helpers.extend({
													el: addedNode
												}, module);
	
												_this8.initModule(obj);
	
												break;
											}
										}
									} catch (err) {
										_didIteratorError = true;
										_iteratorError = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion && _iterator.return) {
												_iterator.return();
											}
										} finally {
											if (_didIteratorError) {
												throw _iteratorError;
											}
										}
									}
								}
	
								if (_this8.getModulesInContext(addedNode).length) {
									_this8.modulesInContext = _this8.getModulesInContext(addedNode);
	
									if (_this8.options.logs) {
										console.info('VeamsModules :: Recording new context. When available new modules will be initialised in: ', addedNode);
									}
	
									_this8.registerAll();
								}
							}
						}
	
						for (var _j = 0; _j < mutations[i].removedNodes.length; ++_j) {
							var removedNode = mutations[i].removedNodes[_j];
	
							if (removedNode instanceof HTMLElement) {
								if (removedNode.getAttribute(_this8.options.attrPrefix + '-module')) {
									var _domName = removedNode.getAttribute(_this8.options.attrPrefix + '-module');
	
									if (_this8.options.logs) {
										console.info('VeamsModules :: Recording deletion of module: ', removedNode, _domName);
									}
	
									_this8.removeFromCacheByKey(removedNode);
								}
	
								if (_this8.getModulesInContext(removedNode).length) {
									_this8.modulesInContext = _this8.getModulesInContext(removedNode);
	
									if (_this8.options.logs) {
										console.info('VeamsModules :: Recording deletion of DOM element. When available modules will be unbound in ', removedNode);
									}
	
									_this8.modulesInContext.forEach(function (node) {
										_this8.removeFromCacheByKey(node);
									});
								}
							}
						}
					}
				});
	
				observer.observe(context, {
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
				return Veams.helpers.querySelectorArray(this.queryString, context);
			}
		}]);
	
		return Modules;
	}();
	
	/**
	 * Plugin object
	 */
	
	
	var VeamsModules = {
		options: {
			DEBUG: false,
			attrPrefix: 'data-js',
			logs: false,
			useMutationObserver: false
		},
		pluginName: 'ModulesHandler',
		initialize: function initialize(Veams, opts) {
			this.options = Veams.helpers.extend(this.options, opts || {});
			Veams.modules = Veams.modules || new Modules(Veams, this.options);
		}
	};
	
	exports.default = VeamsModules;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=modules.js.map