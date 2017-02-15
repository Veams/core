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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var forEachHelper = __webpack_require__(4);
	var Veams = {};
	// let __cache = {};
	
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
			key: 'removeFromCache',
			value: function removeFromCache(node) {
				var deleteIndex = void 0;
	
				for (var i = 0; i < this._cache.length; i++) {
					var cacheItem = this._cache[i];
	
					if (cacheItem.element === node) {
						if (cacheItem.module.unbindEvents) cacheItem.module.unbindEvents();
	
						deleteIndex = i;
					}
				}
	
				this._cache.splice(deleteIndex, 1);
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
	
				this.modulesRegister = arr;
				this.registerAll();
			}
		}, {
			key: 'registerAll',
			value: function registerAll() {
				var _this2 = this;
	
				if (!this.modulesRegister) return;
	
				this.modulesRegister.forEach(function (module) {
					_this2.registerOne(module);
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
				if (!obj.domName) throw new Error('VeamsModules :: In order to work with register() you need to define the module name as string!');
				if (!obj.module) throw new Error('VeamsModules :: In order to work with register() you need to define a module!');
	
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
				var _this3 = this;
	
				forEachHelper(this.modulesInContext, function (i, el) {
					_this3.initModule(el, domName, Module, render, options, cb);
				});
			}
		}, {
			key: 'initModule',
			value: function initModule(el, domName, Module, render, options, cb) {
				var noRender = el.getAttribute(this.options.attrPrefix + '-no-render') || render === false || false;
				var dataModules = el.getAttribute(this.options.attrPrefix + '-module').split(' ');
	
				if (dataModules.indexOf(domName) !== -1) {
					var attrs = el.getAttribute('data-js-options');
					var mergedOptions = Veams.helpers.defaults(options || {}, JSON.parse(attrs));
	
					var module = new Module({
						el: el,
						options: mergedOptions,
						namespace: domName
					});
	
					this.addToCache({
						name: domName,
						module: module,
						element: el
					});
	
					// Render after initial module loading
					if (!noRender) module.render();
					// Provide callback function in which you can use module and options
					if (cb && typeof cb === 'function') cb(module, mergedOptions);
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
				var _this4 = this;
	
				var observer = new MutationObserver(function (mutations) {
					// look through all mutations that just occured
					for (var i = 0; i < mutations.length; ++i) {
						// look through all added nodes of this mutation
	
						for (var j = 0; j < mutations[i].addedNodes.length; ++j) {
							var addedNode = mutations[i].addedNodes[j];
	
							if (addedNode instanceof HTMLElement) {
								if (addedNode.getAttribute(_this4.options.attrPrefix + '-module')) {
									var domName = addedNode.getAttribute(_this4.options.attrPrefix + '-module');
	
									if (_this4.options.logs) {
										console.info('VeamsModules :: Recording new module: ', addedNode, domName);
									}
	
									var _iteratorNormalCompletion = true;
									var _didIteratorError = false;
									var _iteratorError = undefined;
	
									try {
										for (var _iterator = _this4.modulesRegister[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
											var module = _step.value;
	
											if (module.domName === domName) {
	
												_this4.initModule(addedNode, module.domName, module.module, module.render, module.options, module.cb);
	
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
	
								if (_this4.getModulesInContext(addedNode).length) {
									_this4.modulesInContext = _this4.getModulesInContext(addedNode);
	
									if (_this4.options.logs) {
										console.info('VeamsModules :: Recording new context. When available new modules will be initialised in: ', addedNode);
									}
	
									_this4.registerAll();
								}
							}
						}
	
						for (var _j = 0; _j < mutations[i].removedNodes.length; ++_j) {
							var removedNode = mutations[i].removedNodes[_j];
	
							if (removedNode instanceof HTMLElement) {
								if (removedNode.getAttribute(_this4.options.attrPrefix + '-module')) {
									var _domName = removedNode.getAttribute(_this4.options.attrPrefix + '-module');
	
									if (_this4.options.logs) {
										console.info('VeamsModules :: Recording deletion of module: ', removedNode, _domName);
									}
	
									_this4.removeFromCache(removedNode);
								}
	
								if (_this4.getModulesInContext(removedNode).length) {
									_this4.modulesInContext = _this4.getModulesInContext(removedNode);
	
									if (_this4.options.logs) {
										console.info('VeamsModules :: Recording deletion of DOM element. When available modules will be unbound in ', removedNode);
									}
	
									_this4.modulesInContext.forEach(function (node) {
										_this4.removeFromCache(node);
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
			this.options = Veams.helpers.defaults(opts || {}, this.options);
			Veams.modules = Veams.modules || new Modules(Veams, this.options);
		}
	};
	
	exports.default = VeamsModules;
	module.exports = exports['default'];

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Simple forEach method
	 *
	 * @param {Array} array - array of objects
	 * @param {function} callback - callback function
	 * @param {string} scope - scope of function
	 */
	module.exports = function forEach(array, callback, scope) {
	  for (var i = 0; i < array.length; i++) {
	    callback.call(scope, i, array[i]);
	  }
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=modules.js.map