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
	
	var defaultsHelper = __webpack_require__(7);
	var queryHelper = __webpack_require__(8);
	var forEachHelper = __webpack_require__(9);
	var _Veams = {};
	
	var Modules = function () {
		function Modules() {
			var VEAMS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.Veams;
			var opts = arguments[1];
	
			_classCallCheck(this, Modules);
	
			_Veams = VEAMS;
			var options = {
				attrPrefix: 'data-js',
				logs: false,
				useMutationObserver: false
			};
	
			this.options = _Veams.helpers.defaults(opts || {}, options);
			this.list = {}; // Module list
			this.modulesInContext = []; // Save modules on current page
	
			this.initialize();
		}
	
		_createClass(Modules, [{
			key: 'initialize',
			value: function initialize() {
				this.queryString = '[' + this.options.attrPrefix + '-module]';
				this.modulesInContext = queryHelper(this.queryString);
	
				if (this.options.useMutationObserver) {
					this.observe(document.body);
				}
	
				this.bindEvents();
			}
		}, {
			key: 'bindEvents',
			value: function bindEvents() {
				var _this = this;
	
				if (!_Veams.Vent && this.options.useMutationObserver === false) {
					console.info('In order to work with the the ajax handling in VeamsModulesHandler ' + 'you need to define "useMutationObserver" or use the VeamsVent plugin!');
	
					return;
				}
	
				if (_Veams.Vent) {
					_Veams.Vent.on(_Veams.EVENTS.DOMchanged, function (e, context) {
						_this.modulesInContext = _this.getModulesInContext(context);
	
						if (_this.options.logs) {
							console.info('Recording new context. When available new modules will be initialised in: ', context);
						}
	
						_this.registerAll();
					});
				}
			}
	
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
	
				if (_Veams.Vent) {
					_Veams.Vent.trigger(_Veams.EVENTS.moduleRegistered, {
						module: module,
						el: element
					});
				}
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
				this.registerAll();
			}
		}, {
			key: 'registerAll',
			value: function registerAll() {
				var _this2 = this;
	
				if (!this.modulesList) return;
	
				this.modulesList.forEach(function (module) {
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
			}
	
			/**
	   * Add mutation observer to observe new modules.
	   *
	   * @param {Object} context - Context for the mutation observer
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
										console.info('Recording new module: ', addedNode, domName);
									}
	
									var _iteratorNormalCompletion = true;
									var _didIteratorError = false;
									var _iteratorError = undefined;
	
									try {
										for (var _iterator = _this4.modulesList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
	
								if (_this4.getModulesInContext(addedNode)) {
									_this4.modulesInContext = _this4.getModulesInContext(addedNode);
	
									if (_this4.options.logs) {
										console.info('Recording new context. When available new modules will be initialised in: ', addedNode);
									}
	
									_this4.registerAll();
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
				return queryHelper(this.queryString, context);
			}
		}]);
	
		return Modules;
	}();
	
	/**
	 * Plugin object
	 */
	
	
	var VeamsModules = {
		pluginName: 'ModulesHandler',
		initialize: function initialize(Veams, opts) {
			Veams.modules = Veams.modules || new Modules(Veams, opts);
		}
	};
	
	exports.default = VeamsModules;
	module.exports = exports['default'];

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=modules.js.map