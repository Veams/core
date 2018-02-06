(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("veams-core", [], factory);
	else if(typeof exports === 'object')
		exports["veams-core"] = factory();
	else
		root["veams-core"] = root["veams-core"] || {}, root["veams-core"]["veams-core"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = methodExtend;

/**
 * Helper method to extend an already existing method.
 *
 * @param {Object} to - view which will be extended
 * @param {Object} from - methods which comes from mixin
 * @param {string} methodName - function name
 */
function methodExtend(to, from, methodName) {
    function isUndefined(value) {
        return typeof value === 'undefined';
    }
    if (from === undefined)
        return;
    // if the method is defined on from ...
    if (!isUndefined(from[methodName])) {
        var old_1 = to[methodName];
        // ... we create a new function on to
        to[methodName] = function () {
            // wherein we first call the method which exists on `to`
            var oldReturn = old_1.apply(this, arguments);
            // and then call the method on `from`
            from[methodName].apply(this, arguments);
            // and then return the expected result,
            // i.e. what the method on `to` returns
            return oldReturn;
        };
    }
}
;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = mixin;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__defaults__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__method_extend__ = __webpack_require__(0);



/**
 * Merge method functions.
 *
 * @param {Object} from - Mixin object which will be merged via Helpers.defaults with the methods of our class
 * @param {Array} methods - Array of method names which will be extended.
 */
function mixin(from, methods) {
    if (methods === void 0) { methods = ['initialize', 'render']; }
    if (from === undefined) {
        console.error("VeamsHelpers : Mixin :: Mixin not found!");
        return;
    }
    var to = this.prototype;
    /** Add those methods which exists on `from` but not on `to` to the latter */
    Object(__WEBPACK_IMPORTED_MODULE_0__defaults__["a" /* default */])({ to: to, from: from });
    /** we do the same for events */
    if (to.events) {
        var toEvents = to.events;
        var fromEvents = from.events;
        Object(__WEBPACK_IMPORTED_MODULE_0__defaults__["a" /* default */])({ toEvents: toEvents, fromEvents: fromEvents });
    }
    // Extend to's methods
    methods.forEach(function (method) {
        Object(__WEBPACK_IMPORTED_MODULE_1__method_extend__["a" /* default */])(to, from, method);
    });
}
;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = defaultsHelper;

/**
 * Simple extend method, which extends an object.
 *
 * @param {Object} obj - object which will be extended
 *
 * @return {Object} obj - extended object
 */
function defaultsHelper(obj) {
    [].slice.call(arguments, 1).forEach(function (item) {
        for (var key in item) {
            if (obj[key] === undefined)
                obj[key] = item[key];
        }
    });
    return obj;
}
;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeId;

/**
 * Generates numeric id.
 *
 * @param {Number} [segments=1] - number of segments of generated id (segments consist of 10 digits, separated by '-').
 *
 * @return {String} - generated id
 */
function makeId(segments) {
    if (segments === void 0) { segments = 1; }
    var crypto = window.crypto || window.msCrypto;
    var array = crypto.getRandomValues(new Uint32Array(segments));
    var id = '';
    var i = 0;
    for (; i < array.length; i++) {
        id += array[i] + '-';
    }
    return id.slice(0, -1);
}
;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

// Polyfill for custom events
(function () {
    if (typeof window.CustomEvent === 'function')
        return false;
    function CustomEvent(event, params) {
        var evt = document.createEvent('CustomEvent');
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__use__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_events__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_helpers__ = __webpack_require__(10);
/**
 * Represents VeamsCore.
 * @module VeamsCore
 *
 * @author Sebastian Fitzner
 */




var initState = false;
var VeamsCore = /** @class */ (function () {
    function VeamsCore(opts) {
        this._options = {
            namespace: 'Veams',
            addToGlobal: false
        };
        this.base = {
            name: 'Veams',
            version: '5.0.1'
        };
        this.use = __WEBPACK_IMPORTED_MODULE_1__use__["a" /* default */].bind(this);
        this.Plugins = {};
        this.EVENTS = __WEBPACK_IMPORTED_MODULE_2__utils_events__["a" /* default */];
        this.helpers = {};
        this.detections = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        initState = false;
        this.setup(opts);
    }
    Object.defineProperty(VeamsCore.prototype, "version", {
        get: function () {
            return this._version;
        },
        set: function (version) {
            this._version = version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsCore.prototype, "initialized", {
        get: function () {
            return this._initialized;
        },
        set: function (bool) {
            this._initialized = bool;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsCore.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (options) {
            this._options = this.helpers.extend(this.options, options || {});
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Setup Veams core
     * @param opts
     */
    VeamsCore.prototype.setup = function (opts) {
        this.use(__WEBPACK_IMPORTED_MODULE_3__plugins_helpers__["a" /* default */]);
        this.detections = this.helpers.extend({
            touch: this.helpers.isTouch()
        }, this.detections);
        this.options = opts;
    };
    /**
     * Initialize veams core
     * @param opts Options
     */
    VeamsCore.prototype.initialize = function (opts) {
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
    };
    /**
     * On init lifecyle hook
     * @param cb
     */
    VeamsCore.prototype.onInitialize = function (cb) {
        if (!cb || typeof cb !== 'function') {
            console.log('Veams :: Callback is not a function!');
            return;
        }
        if (initState === false) {
            this.initialize();
        }
        cb();
    };
    /**
     * On DOM ready livecycle hook
     * @param cb
     */
    VeamsCore.prototype.onDOMReady = function (cb) {
        if (typeof cb !== 'function') {
            console.log('Veams :: Callback is not a function!');
            return;
        }
        document.addEventListener('DOMContentLoaded', cb);
    };
    return VeamsCore;
}());
/* harmony default export */ __webpack_exports__["default"] = (VeamsCore);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Represents a simple plugin system in which `this` is Veams.
 * @module plugin
 *
 * @author Sebastian Fitzner
 */
/* harmony default export */ __webpack_exports__["a"] = (function (plugin) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (plugin.pluginName) {
        this.Plugins[plugin.pluginName] = plugin;
    }
    plugin.initialize.apply(plugin, [this].concat(args));
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Const for events (pub/sub)
 *
 * @author: Sebastian Fitzner
 */
/**
* Events Global
*/
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
/* harmony default export */ __webpack_exports__["a"] = (EVENTS);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers_extend__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helpers_mixin__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers_method_extend__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_helpers_is_touch__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_helpers_throttle__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_helpers_query_selector_array__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_helpers_for_each__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_helpers_make_id__ = __webpack_require__(3);









var VeamsHelpers = {
    pluginName: 'Helpers',
    initialize: function (Veams) {
        Veams.addHelper = function addHelper() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var params = args.slice();
            if (params.length === 1) {
                if (typeof params[0] !== 'object') {
                    console.error('VeamsHelpers :: You need to pass an object!');
                    return;
                }
                for (var key in params[0]) {
                    if (params[0].hasOwnProperty(key)) {
                        if (!Veams.helpers[key]) {
                            Veams.helpers[key] = params[0][key];
                        }
                        else {
                            console.info("VeamsHelpers :: The helper " + key + " is already defined! Please define a new name for: ", params[0][key]);
                        }
                    }
                }
            }
            else if (params.length === 2) {
                if (!Veams.helpers[params[0]]) {
                    if (typeof params[0] !== 'string' || typeof params[1] !== 'function') {
                        console.error('VeamsHelpers :: You need to pass a string as first argument and the helper function as second one.');
                        return;
                    }
                    Veams.helpers[params[0]] = params[1];
                }
                else {
                    console.info("VeamsHelpers :: The helper " + params[0] + " is already defined! Please define a new name for: ", params[1]);
                }
            }
        };
        this.addDefaultHelpers(Veams);
    },
    addDefaultHelpers: function (Veams) {
        Veams.addHelper('querySelectorArray', __WEBPACK_IMPORTED_MODULE_5__utils_helpers_query_selector_array__["a" /* default */]);
        Veams.addHelper('extend', __WEBPACK_IMPORTED_MODULE_0__utils_helpers_extend__["a" /* default */]);
        Veams.addHelper('isTouch', __WEBPACK_IMPORTED_MODULE_3__utils_helpers_is_touch__["a" /* default */]);
        Veams.addHelper('mixin', __WEBPACK_IMPORTED_MODULE_1__utils_helpers_mixin__["a" /* default */]);
        Veams.addHelper('methodExtend', __WEBPACK_IMPORTED_MODULE_2__utils_helpers_method_extend__["a" /* default */]);
        Veams.addHelper('throttle', __WEBPACK_IMPORTED_MODULE_4__utils_helpers_throttle__["a" /* default */]);
        Veams.addHelper('forEach', __WEBPACK_IMPORTED_MODULE_6__utils_helpers_for_each__["a" /* default */]);
        Veams.addHelper('makeId', __WEBPACK_IMPORTED_MODULE_7__utils_helpers_make_id__["a" /* default */]);
    }
};
/* harmony default export */ __webpack_exports__["a"] = (VeamsHelpers);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = extend;

/**
 * Simple extend method to extend the properties of an object.
 *
 * @param {Object} obj - object which will be extended
 *
 * @return {Object} obj - extended object
 */
function extend(obj) {
    [].slice.call(arguments, 1).forEach(function (item) {
        for (var key in item)
            obj[key] = item[key];
    });
    return obj;
}
;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isTouch;

/**
 * Touch Detection
 */
function isTouch() {
    return 'ontouchstart' in window;
}
;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = throttle;

/**
 * Throttle method for resize events and more
 *
 * @param {function} func - Function which will be executed.
 * @param {number} wait - number to wait in milliseconds.
 * @param {boolean} immediate - execute function immediately.
 */
function throttle(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this;
        var args = arguments;
        var callNow = immediate && !timeout;
        var later = function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(context, args);
    };
}
;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = querySelectorArray;

/**
 * Get dom elements in an array
 *
 * @param {String} elem - Required: selector
 * @param {Object} [context] - Optional: context
 *
 * @return {Array}
 */
function querySelectorArray(elem, context) {
    if (!elem)
        throw new Error('In order to work with querySelectorArray you need to define an element as string!');
    var el = elem;
    var customContext = context || document;
    return Array.prototype.slice.call((customContext).querySelectorAll(el));
}
;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = forEach;

/**
 * Simple forEach method
 *
 * @param {Array} array - array of objects
 * @param {function} callback - callback function
 * @param {string} scope - scope of function
 */
function forEach(array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
}
;


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ })
/******/ ]);
});