(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("common/base", [], factory);
	else if(typeof exports === 'object')
		exports["common/base"] = factory();
	else
		root["common/base"] = root["common/base"] || {}, root["common/base"]["common/base"] = factory();
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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Represents a base constructor which supports
	 * options merging and
	 * saving of standard stuff.
	 *
	 * @module VeamsBase
	 * @author Sebastian Fitzner
	 */
	
	/**
	 * Imports
	 */
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _string = __webpack_require__(2);
	
	var _string2 = _interopRequireDefault(_string);
	
	var _mixin = __webpack_require__(3);
	
	var _mixin2 = _interopRequireDefault(_mixin);
	
	var _extend = __webpack_require__(6);
	
	var _extend2 = _interopRequireDefault(_extend);
	
	var _makeId = __webpack_require__(7);
	
	var _makeId2 = _interopRequireDefault(_makeId);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VeamsBase = function () {
	
		/**
	  * Constructor
	  *
	  * to save standard elements like el and options and
	  * execute initialize as default method.
	  *
	  * @param {String} namespace - Add custom namespace to your class.
	  * @param {Object} el - Save element in class.
	  * @param {Object} options - Options passed by init process.
	  * @param {Object} opts [{}] - Object which contains options of the extended class.
	  */
		function VeamsBase(_ref) {
			var namespace = _ref.namespace,
			    el = _ref.el,
			    options = _ref.options;
			var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
			_classCallCheck(this, VeamsBase);
	
			this.namespace = namespace || 'base';
			this.instanceId = this.namespace;
			this.options = opts;
			this._options = options;
	
			console.log('opts: ', options);
	
			if (el) {
				this.el = el;
			}
		}
	
		// ----------------------------------------------------------
		// GETTER & SETTERS
		// ----------------------------------------------------------
	
		_createClass(VeamsBase, [{
			key: 'initialize',
	
	
			// ----------------------------------------------------------
			// STANDARD METHODS
			// ----------------------------------------------------------
	
			/**
	   * Initialize your module class and
	   * save some references.
	   */
			value: function initialize() {
				return this;
			}
		}, {
			key: 'namespace',
			set: function set(namespace) {
				this._namespace = namespace;
			},
			get: function get() {
				return this._namespace;
			}
		}, {
			key: 'instanceId',
			get: function get() {
				return this._instanceId;
			},
			set: function set(id) {
				this._instanceId = id + '_' + Date.now() + '_' + (0, _makeId2.default)();
			}
		}, {
			key: '_options',
			get: function get() {
				return this.options;
			},
			set: function set(options) {
				this.options = (0, _extend2.default)(this.options, options || {});
			}
		}, {
			key: 'el',
			set: function set(element) {
				this._el = element;
			},
			get: function get() {
				return this._el;
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
		}]);
	
		return VeamsBase;
	}();
	
	/**
	 * Add mixin functionality to extend module class by using simple objects
	 */
	
	
	VeamsBase.mixin = _mixin2.default;
	
	exports.default = VeamsBase;
	module.exports = exports['default'];

/***/ },
/* 2 */
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=base.js.map