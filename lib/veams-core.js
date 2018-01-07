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
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
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
        let old = to[methodName];
        // ... we create a new function on to
        to[methodName] = function () {
            // wherein we first call the method which exists on `to`
            let oldReturn = old.apply(this, arguments);
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
function mixin(from, methods = ['initialize', 'render']) {
    if (from === undefined) {
        console.error(`VeamsHelpers : Mixin :: Mixin not found!`);
        return;
    }
    let to = this.prototype;
    /** Add those methods which exists on `from` but not on `to` to the latter */
    Object(__WEBPACK_IMPORTED_MODULE_0__defaults__["a" /* default */])({ to, from });
    /** we do the same for events */
    if (to.events) {
        const toEvents = to.events;
        const fromEvents = from.events;
        Object(__WEBPACK_IMPORTED_MODULE_0__defaults__["a" /* default */])({ toEvents, fromEvents });
    }
    // Extend to's methods
    methods.forEach((method) => {
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
    [].slice.call(arguments, 1).forEach((item) => {
        for (let key in item) {
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
function makeId(segments = 1) {
    let crypto = window.crypto || window.msCrypto;
    let array = crypto.getRandomValues(new Uint32Array(segments));
    let id = '';
    let i = 0;
    for (; i < array.length; i++) {
        id += array[i] + '-';
    }
    return id.slice(0, -1);
}
;


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__use__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_events__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__plugins_helpers__ = __webpack_require__(16);
/**
 * Represents VeamsCore.
 * @module VeamsCore
 *
 * @author Sebastian Fitzner
 */




let initState = false;
class VeamsCore {
    constructor(opts) {
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
    set version(version) {
        this._version = version;
    }
    get version() {
        return this._version;
    }
    set initialized(bool) {
        this._initialized = bool;
    }
    get initialized() {
        return this._initialized;
    }
    set options(options) {
        this._options = this.helpers.extend(this.options, options || {});
    }
    get options() {
        return this._options;
    }
    /**
     * Setup Veams core
     * @param opts
     */
    setup(opts) {
        this.use(__WEBPACK_IMPORTED_MODULE_3__plugins_helpers__["a" /* default */]);
        this.detections = this.helpers.extend({
            touch: this.helpers.isTouch()
        }, this.detections);
        this.options = opts;
    }
    /**
     * Initialize veams core
     * @param opts Options
     */
    initialize(opts) {
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
    }
    /**
     * On init lifecyle hook
     * @param cb
     */
    onInitialize(cb) {
        if (!cb || typeof cb !== 'function') {
            console.log('Veams :: Callback is not a function!');
            return;
        }
        if (initState === false) {
            this.initialize();
        }
        cb();
    }
    /**
     * On DOM ready livecycle hook
     * @param cb
     */
    onDOMReady(cb) {
        if (typeof cb !== 'function') {
            console.log('Veams :: Callback is not a function!');
            return;
        }
        document.addEventListener('DOMContentLoaded', cb);
    }
}
/* harmony default export */ __webpack_exports__["default"] = (VeamsCore);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Represents a simple plugin system in which `this` is Veams.
 * @module plugin
 *
 * @author Sebastian Fitzner
 */
/* harmony default export */ __webpack_exports__["a"] = (function (plugin, ...args) {
    if (plugin.pluginName) {
        this.Plugins[plugin.pluginName] = plugin;
    }
    plugin.initialize(this, ...args);
});


/***/ }),
/* 15 */
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
const EVENTS = {
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
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_helpers_extend__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helpers_mixin__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers_method_extend__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_helpers_is_touch__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_helpers_throttle__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_helpers_query_selector_array__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_helpers_for_each__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__utils_helpers_make_id__ = __webpack_require__(3);









const VeamsHelpers = {
    pluginName: 'Helpers',
    initialize: function (Veams) {
        Veams.addHelper = function addHelper(...args) {
            let params = [...args];
            if (params.length === 1) {
                if (typeof params[0] !== 'object') {
                    console.error('VeamsHelpers :: You need to pass an object!');
                    return;
                }
                for (let key in params[0]) {
                    if (params[0].hasOwnProperty(key)) {
                        if (!Veams.helpers[key]) {
                            Veams.helpers[key] = params[0][key];
                        }
                        else {
                            console.info(`VeamsHelpers :: The helper ${key} is already defined! Please define a new name for: `, params[0][key]);
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
                    console.info(`VeamsHelpers :: The helper ${params[0]} is already defined! Please define a new name for: `, params[1]);
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
/* 17 */
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
    [].slice.call(arguments, 1).forEach((item) => {
        for (let key in item)
            obj[key] = item[key];
    });
    return obj;
}
;


/***/ }),
/* 18 */
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
/* 19 */
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
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        let callNow = immediate && !timeout;
        let later = function () {
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
/* 20 */
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
    let el = elem;
    let customContext = context || document;
    return Array.prototype.slice.call((customContext).querySelectorAll(el));
}
;


/***/ }),
/* 21 */
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
    for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
}
;


/***/ }),
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYjI3OTQwMjUyYjUyNTc4MmY4OSIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvdXRpbHMvaGVscGVycy9tZXRob2QtZXh0ZW5kLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL21peGluLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL2RlZmF1bHRzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL21ha2UtaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3V0aWxzL3BvbHlmaWxscy9jdXN0b20tZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2dlbmVyaWNzL2NvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2dlbmVyaWNzL3VzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvdXRpbHMvZXZlbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9wbHVnaW5zL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvZXh0ZW5kLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL2lzLXRvdWNoLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL3Rocm90dGxlLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL3F1ZXJ5LXNlbGVjdG9yLWFycmF5LnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL2Zvci1lYWNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0M7QUFDL0MsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFD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TyxHQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFbEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQztBQUFBLENBQUM7Ozs7Ozs7OztBQzNCVztBQUViOzs7Ozs7O0dBT0c7QUFDVyw0QkFBNkIsSUFBSSxFQUFFLE9BQU87SUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLG1GQUFtRixDQUFDLENBQUM7SUFDaEgsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQ2QsSUFBSSxhQUFhLEdBQUcsT0FBTyxJQUFJLFFBQVEsQ0FBQztJQUV4QyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBQUEsQ0FBQzs7Ozs7Ozs7O0FDaEJXO0FBRWI7Ozs7OztHQU1HO0FBQ1csaUJBQWtCLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSztJQUNyRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2QyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztBQUNGLENBQUM7QUFBQSxDQUFDIiwiZmlsZSI6InZlYW1zLWNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcInZlYW1zLWNvcmVcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widmVhbXMtY29yZVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ2ZWFtcy1jb3JlXCJdID0gcm9vdFtcInZlYW1zLWNvcmVcIl0gfHwge30sIHJvb3RbXCJ2ZWFtcy1jb3JlXCJdW1widmVhbXMtY29yZVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjQpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJiMjc5NDAyNTJiNTI1NzgyZjg5IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEhlbHBlciBtZXRob2QgdG8gZXh0ZW5kIGFuIGFscmVhZHkgZXhpc3RpbmcgbWV0aG9kLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0byAtIHZpZXcgd2hpY2ggd2lsbCBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGZyb20gLSBtZXRob2RzIHdoaWNoIGNvbWVzIGZyb20gbWl4aW5cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2ROYW1lIC0gZnVuY3Rpb24gbmFtZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtZXRob2RFeHRlbmQodG8sIGZyb20sIG1ldGhvZE5hbWUpIHtcblx0ZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcblx0XHRyZXR1cm4gdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcblx0fVxuXG5cdGlmIChmcm9tID09PSB1bmRlZmluZWQpIHJldHVybjtcblxuXHQvLyBpZiB0aGUgbWV0aG9kIGlzIGRlZmluZWQgb24gZnJvbSAuLi5cblx0aWYgKCFpc1VuZGVmaW5lZChmcm9tW21ldGhvZE5hbWVdKSkge1xuXHRcdGxldCBvbGQgPSB0b1ttZXRob2ROYW1lXTtcblxuXHRcdC8vIC4uLiB3ZSBjcmVhdGUgYSBuZXcgZnVuY3Rpb24gb24gdG9cblx0XHR0b1ttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0Ly8gd2hlcmVpbiB3ZSBmaXJzdCBjYWxsIHRoZSBtZXRob2Qgd2hpY2ggZXhpc3RzIG9uIGB0b2Bcblx0XHRcdGxldCBvbGRSZXR1cm4gPSBvbGQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuXHRcdFx0Ly8gYW5kIHRoZW4gY2FsbCB0aGUgbWV0aG9kIG9uIGBmcm9tYFxuXHRcdFx0ZnJvbVttZXRob2ROYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHQvLyBhbmQgdGhlbiByZXR1cm4gdGhlIGV4cGVjdGVkIHJlc3VsdCxcblx0XHRcdC8vIGkuZS4gd2hhdCB0aGUgbWV0aG9kIG9uIGB0b2AgcmV0dXJuc1xuXHRcdFx0cmV0dXJuIG9sZFJldHVybjtcblx0XHR9O1xuXHR9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy91dGlscy9oZWxwZXJzL21ldGhvZC1leHRlbmQudHMiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBkZWZhdWx0c0hlbHBlciBmcm9tICcuL2RlZmF1bHRzJztcbmltcG9ydCBtZXRob2RFeHRlbmRIZWxwZXIgZnJvbSAnLi9tZXRob2QtZXh0ZW5kJztcblxuLyoqXG4gKiBNZXJnZSBtZXRob2QgZnVuY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBmcm9tIC0gTWl4aW4gb2JqZWN0IHdoaWNoIHdpbGwgYmUgbWVyZ2VkIHZpYSBIZWxwZXJzLmRlZmF1bHRzIHdpdGggdGhlIG1ldGhvZHMgb2Ygb3VyIGNsYXNzXG4gKiBAcGFyYW0ge0FycmF5fSBtZXRob2RzIC0gQXJyYXkgb2YgbWV0aG9kIG5hbWVzIHdoaWNoIHdpbGwgYmUgZXh0ZW5kZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1peGluKGZyb20sIG1ldGhvZHMgPSBbJ2luaXRpYWxpemUnLCAncmVuZGVyJ10pIHtcblx0aWYgKGZyb20gPT09IHVuZGVmaW5lZCkge1xuXHRcdGNvbnNvbGUuZXJyb3IoYFZlYW1zSGVscGVycyA6IE1peGluIDo6IE1peGluIG5vdCBmb3VuZCFgKTtcblxuXHRcdHJldHVybjtcblx0fVxuXG5cdGxldCB0byA9IHRoaXMucHJvdG90eXBlO1xuXG5cdC8qKiBBZGQgdGhvc2UgbWV0aG9kcyB3aGljaCBleGlzdHMgb24gYGZyb21gIGJ1dCBub3Qgb24gYHRvYCB0byB0aGUgbGF0dGVyICovXG5cdGRlZmF1bHRzSGVscGVyKHt0bywgZnJvbX0pO1xuXG5cdC8qKiB3ZSBkbyB0aGUgc2FtZSBmb3IgZXZlbnRzICovXG5cdGlmICh0by5ldmVudHMpIHtcblx0XHRjb25zdCB0b0V2ZW50cyA9IHRvLmV2ZW50cztcblx0XHRjb25zdCBmcm9tRXZlbnRzID0gZnJvbS5ldmVudHM7XG5cdFx0ZGVmYXVsdHNIZWxwZXIoe3RvRXZlbnRzLCBmcm9tRXZlbnRzfSk7XG5cdH1cblxuXHQvLyBFeHRlbmQgdG8ncyBtZXRob2RzXG5cdG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG5cdFx0bWV0aG9kRXh0ZW5kSGVscGVyKHRvLCBmcm9tLCBtZXRob2QpO1xuXHR9KTtcbn07XG5cbmV4cG9ydCB0eXBlIG1peGluVHlwZSA9IChmcm9tOiB7fSwgbWV0aG9kczogc3RyaW5nW10pID0+IGFueTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvaGVscGVycy9taXhpbi50cyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1wbGUgZXh0ZW5kIG1ldGhvZCwgd2hpY2ggZXh0ZW5kcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIG9iamVjdCB3aGljaCB3aWxsIGJlIGV4dGVuZGVkXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBvYmogLSBleHRlbmRlZCBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmYXVsdHNIZWxwZXIob2JqKSB7XG5cdFx0W10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRcdGZvciAobGV0IGtleSBpbiBpdGVtKSB7XG5cdFx0XHRcdGlmIChvYmpba2V5XSA9PT0gdW5kZWZpbmVkKSBvYmpba2V5XSA9IGl0ZW1ba2V5XTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4gb2JqO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvaGVscGVycy9kZWZhdWx0cy50cyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBHZW5lcmF0ZXMgbnVtZXJpYyBpZC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gW3NlZ21lbnRzPTFdIC0gbnVtYmVyIG9mIHNlZ21lbnRzIG9mIGdlbmVyYXRlZCBpZCAoc2VnbWVudHMgY29uc2lzdCBvZiAxMCBkaWdpdHMsIHNlcGFyYXRlZCBieSAnLScpLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gLSBnZW5lcmF0ZWQgaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZUlkKHNlZ21lbnRzID0gMSkge1xuXHRsZXQgY3J5cHRvID0gd2luZG93LmNyeXB0byB8fCB3aW5kb3cubXNDcnlwdG87XG5cdGxldCBhcnJheSA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQzMkFycmF5KHNlZ21lbnRzKSk7XG5cdGxldCBpZCA9ICcnO1xuXHRsZXQgaSA9IDA7XG5cblx0Zm9yICg7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdGlkICs9IGFycmF5W2ldICsgJy0nO1xuXHR9XG5cblx0cmV0dXJuIGlkLnNsaWNlKDAsIC0xKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvbWFrZS1pZC50cyIsIi8vIFBvbHlmaWxsIGZvciBjdXN0b20gZXZlbnRzXG4oZnVuY3Rpb24gKCkge1xuXHRpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIGZhbHNlO1xuXG5cdGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcblx0XHR2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG5cblx0XHRwYXJhbXMgPSBwYXJhbXMgfHwge2J1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZSwgZGV0YWlsOiB1bmRlZmluZWR9O1xuXG5cdFx0ZXZ0LmluaXRDdXN0b21FdmVudChldmVudCwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcblx0XHRyZXR1cm4gZXZ0O1xuXHR9XG5cblx0Q3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcblxuXHR3aW5kb3cuQ3VzdG9tRXZlbnQgPSBDdXN0b21FdmVudDtcbn0pKCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL3BvbHlmaWxscy9jdXN0b20tZXZlbnQudHMiLCIvKipcbiAqIFJlcHJlc2VudHMgVmVhbXNDb3JlLlxuICogQG1vZHVsZSBWZWFtc0NvcmVcbiAqXG4gKiBAYXV0aG9yIFNlYmFzdGlhbiBGaXR6bmVyXG4gKi9cbmltcG9ydCAnLi4vdXRpbHMvcG9seWZpbGxzL2N1c3RvbS1ldmVudCc7XG5pbXBvcnQgdXNlIGZyb20gJy4vdXNlJztcblxuaW1wb3J0IEVWRU5UUywgeyBFVkVOVFNUeXBlIH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcbmltcG9ydCBWZWFtc0hlbHBlcnMsIHsgVmVhbXNIZWxwZXJzVHlwZSB9IGZyb20gJy4uL3BsdWdpbnMvaGVscGVycyc7XG5pbXBvcnQgeyBWZWFtc09wdGlvbnMgfSBmcm9tICcuL3ZlYW1zT3B0aW9ucyc7XG5cbmxldCBpbml0U3RhdGUgPSBmYWxzZTtcblxuY2xhc3MgVmVhbXNDb3JlIHtcblx0X2luaXRpYWxpemVkOiBhbnk7XG5cdFxuXHQvKipcblx0ICogQ3VycmVudCBWZWFtcyBWZXJzaW9uXG5cdCAqL1xuXHRfdmVyc2lvbjogYW55O1xuXG5cdC8qKlxuXHQgKiBcblx0ICovXG5cdGRldGVjdGlvbnM6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IH07XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVyZWQgVmVhbXNoZWxwZXJzXG5cdCAqL1xuXHRoZWxwZXJzOiBWZWFtc0hlbHBlcnNUeXBlXG5cblx0LyoqXG5cdCAqIEF2YWlsYWJsZSBFdmVudHNcblx0ICovXG5cdEVWRU5UUzogRVZFTlRTVHlwZTtcblx0XG5cdFxuXHRQbHVnaW5zOiB7fTtcblx0dXNlOiBhbnk7XG5cblx0LyoqXG5cdCAqIEJhc2UgaW5mb3JtYXRpb24gYWJvdXQgdmVhbXNcblx0ICovXG5cdGJhc2U6IHsgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IH07XG5cblx0LyoqXG5cdCAqIFZlYW1zIG9wdGlvbnNcblx0ICovXG5cdF9vcHRpb25zOiBWZWFtc09wdGlvbnM7XG5cblx0Y29uc3RydWN0b3Iob3B0cykge1xuXHRcdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0XHRuYW1lc3BhY2U6ICdWZWFtcycsXG5cdFx0XHRhZGRUb0dsb2JhbDogZmFsc2Vcblx0XHR9O1xuXG5cdFx0dGhpcy5iYXNlID0ge1xuXHRcdFx0bmFtZTogJ1ZlYW1zJyxcblx0XHRcdHZlcnNpb246ICc1LjAuMSdcblx0XHR9O1xuXG5cdFx0dGhpcy51c2UgPSB1c2UuYmluZCh0aGlzKTtcblx0XHR0aGlzLlBsdWdpbnMgPSB7fTtcblx0XHR0aGlzLkVWRU5UUyA9IEVWRU5UUztcblx0XHR0aGlzLmhlbHBlcnMgPSB7fTtcblx0XHR0aGlzLmRldGVjdGlvbnMgPSB7XG5cdFx0XHR3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG5cdFx0XHRoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodFxuXHRcdH07XG5cblx0XHRpbml0U3RhdGUgPSBmYWxzZTtcblxuXHRcdHRoaXMuc2V0dXAob3B0cyk7XG5cdH1cblxuXHRzZXQgdmVyc2lvbih2ZXJzaW9uKSB7XG5cdFx0dGhpcy5fdmVyc2lvbiA9IHZlcnNpb247XG5cdH1cblxuXHRnZXQgdmVyc2lvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fdmVyc2lvbjtcblx0fVxuXG5cdHNldCBpbml0aWFsaXplZChib29sKSB7XG5cdFx0dGhpcy5faW5pdGlhbGl6ZWQgPSBib29sO1xuXHR9XG5cblx0Z2V0IGluaXRpYWxpemVkKCkge1xuXHRcdHJldHVybiB0aGlzLl9pbml0aWFsaXplZDtcblx0fVxuXG5cdHNldCBvcHRpb25zKG9wdGlvbnMpIHtcblx0XHR0aGlzLl9vcHRpb25zID0gdGhpcy5oZWxwZXJzLmV4dGVuZCh0aGlzLm9wdGlvbnMsIG9wdGlvbnMgfHwge30pO1xuXHR9XG5cblx0Z2V0IG9wdGlvbnMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX29wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogU2V0dXAgVmVhbXMgY29yZVxuXHQgKiBAcGFyYW0gb3B0cyBcblx0ICovXG5cdHNldHVwKG9wdHM6IFZlYW1zT3B0aW9ucykge1xuXHRcdHRoaXMudXNlKFZlYW1zSGVscGVycyk7XG5cblx0XHR0aGlzLmRldGVjdGlvbnMgPSB0aGlzLmhlbHBlcnMuZXh0ZW5kKHtcblx0XHRcdHRvdWNoOiB0aGlzLmhlbHBlcnMuaXNUb3VjaCgpXG5cdFx0fSwgdGhpcy5kZXRlY3Rpb25zKTtcblxuXHRcdHRoaXMub3B0aW9ucyA9IG9wdHM7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB2ZWFtcyBjb3JlXG5cdCAqIEBwYXJhbSBvcHRzIE9wdGlvbnNcblx0ICovXG5cdGluaXRpYWxpemUob3B0cz86IFZlYW1zT3B0aW9ucykge1xuXHRcdGlmIChpbml0U3RhdGUgPT09IHRydWUpIHtcblx0XHRcdHJldHVybiBjb25zb2xlLmluZm8oJ1ZlYW1zIDo6IFlvdSBhbHJlYWR5IGluaXRpYWxpemVkIFZlYW1zIScpO1xuXHRcdH1cblxuXHRcdC8qKlxuXHRcdCAqIFNldCBnbG9iYWwgb3B0aW9ucyBvbiBpbml0aWFsaXplXG5cdFx0ICovXG5cdFx0dGhpcy5vcHRpb25zID0gb3B0cztcblxuXHRcdGlmICh0aGlzLm9wdGlvbnMuYWRkVG9HbG9iYWwpIHtcblx0XHRcdGlmICh3aW5kb3cgJiYgIXdpbmRvd1t0aGlzLm9wdGlvbnMubmFtZXNwYWNlXSkge1xuXHRcdFx0XHR3aW5kb3dbdGhpcy5vcHRpb25zLm5hbWVzcGFjZV0gPSB0aGlzIHx8IHt9O1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGluaXRTdGF0ZSA9IHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogT24gaW5pdCBsaWZlY3lsZSBob29rXG5cdCAqIEBwYXJhbSBjYiBcblx0ICovXG5cdG9uSW5pdGlhbGl6ZShjYjogKCkgPT4gYW55KTogYW55IHtcblx0XHRpZiAoIWNiIHx8IHR5cGVvZiBjYiAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y29uc29sZS5sb2coJ1ZlYW1zIDo6IENhbGxiYWNrIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChpbml0U3RhdGUgPT09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLmluaXRpYWxpemUoKTtcblx0XHR9XG5cblx0XHRjYigpO1xuXHR9XG5cblx0LyoqXG5cdCAqIE9uIERPTSByZWFkeSBsaXZlY3ljbGUgaG9va1xuXHQgKiBAcGFyYW0gY2IgXG5cdCAqL1xuXHRvbkRPTVJlYWR5KGNiOiAoKSA9PiBhbnkpIHtcblx0XHRpZiAodHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnVmVhbXMgOjogQ2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYik7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVmVhbXNDb3JlO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy9nZW5lcmljcy9jb3JlLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzaW1wbGUgcGx1Z2luIHN5c3RlbSBpbiB3aGljaCBgdGhpc2AgaXMgVmVhbXMuXG4gKiBAbW9kdWxlIHBsdWdpblxuICpcbiAqIEBhdXRob3IgU2ViYXN0aWFuIEZpdHpuZXJcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAocGx1Z2luLCAuLi5hcmdzKSB7XG5cdGlmIChwbHVnaW4ucGx1Z2luTmFtZSkge1xuXHRcdHRoaXMuUGx1Z2luc1twbHVnaW4ucGx1Z2luTmFtZV0gPSBwbHVnaW47XG5cdH1cblxuXHRwbHVnaW4uaW5pdGlhbGl6ZSh0aGlzLCAuLi5hcmdzKTtcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvZ2VuZXJpY3MvdXNlLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvbnN0IGZvciBldmVudHMgKHB1Yi9zdWIpXG4gKlxuICogQGF1dGhvcjogU2ViYXN0aWFuIEZpdHpuZXJcbiAqL1xuXG5cblxuIC8qKlxuICogRXZlbnRzIEdsb2JhbFxuICovXG5jb25zdCBFVkVOVFMgPSB7XG5cdGJsdXI6ICdibHVyJyxcblx0Y2hhbmdlOiAnY2hhbmdlJyxcblx0Y2xpY2s6ICdjbGljaycsXG5cdGRibGNsaWNrOiAnZGJsY2xpY2snLFxuXHRET01jaGFuZ2VkOiAnZG9tOmNoYW5nZWQnLFxuXHRET01yZWRpcmVjdDogJ2RvbTpyZWRpcmVjdCcsXG5cdGhhc2hjaGFuZ2U6ICdoYXNoY2hhbmdlJyxcblx0aW5wdXQ6ICdpbnB1dCcsXG5cdGtleWRvd246ICdrZXlkb3duJyxcblx0a2V5cHJlc3M6ICdrZXlwcmVzcycsXG5cdGtleXVwOiAna2V5dXAnLFxuXHRtZWRpYWNoYW5nZTogJ21lZGlhY2hhbmdlJyxcblx0bW9kdWxlQ2FjaGVkOiAnbW9kdWxlOmNhY2hlZCcsXG5cdG1vdXNlZG93bjogJ21vdXNlZG93bicsXG5cdG1vdXNlZW50ZXI6ICdtb3VzZWVudGVyJyxcblx0bW91c2VsZWF2ZTogJ21vdXNlbGVhdmUnLFxuXHRtb3VzZW91dDogJ21vdXNlb3V0Jyxcblx0bW91c2VvdmVyOiAnbW91c2VvdmVyJyxcblx0bW91c2V1cDogJ21vdXNldXAnLFxuXHRyZXNldDogJ3Jlc2V0Jyxcblx0cmVzaXplOiAncmVzaXplJyxcblx0c2Nyb2xsOiAnc2Nyb2xsJyxcblx0c3VibWl0OiAnc3VibWl0Jyxcblx0c3dpcGU6ICdzd2lwZSdcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEVWRU5UUztcblxuZXhwb3J0IHR5cGUgRVZFTlRTVHlwZSA9IHtcblx0W2tleTogc3RyaW5nXTogc3RyaW5nXG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL2V2ZW50cy50cyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGV4dGVuZEhlbHBlciBmcm9tICcuLi91dGlscy9oZWxwZXJzL2V4dGVuZCc7XG5pbXBvcnQgbWl4aW5zSGVscGVyIGZyb20gJy4uL3V0aWxzL2hlbHBlcnMvbWl4aW4nO1xuaW1wb3J0IG1ldGhvZEV4dGVuZEhlbHBlciBmcm9tICcuLi91dGlscy9oZWxwZXJzL21ldGhvZC1leHRlbmQnO1xuaW1wb3J0IHRvdWNoSGVscGVyIGZyb20gJy4uL3V0aWxzL2hlbHBlcnMvaXMtdG91Y2gnO1xuaW1wb3J0IHRocm90dGxlSGVscGVyIGZyb20gJy4uL3V0aWxzL2hlbHBlcnMvdGhyb3R0bGUnO1xuaW1wb3J0IHNlbGVjdG9ySGVscGVyIGZyb20gJy4uL3V0aWxzL2hlbHBlcnMvcXVlcnktc2VsZWN0b3ItYXJyYXknO1xuaW1wb3J0IGZvcmVhY2hIZWxwZXIgZnJvbSAnLi4vdXRpbHMvaGVscGVycy9mb3ItZWFjaCc7XG5pbXBvcnQgbWFrZUlkSGVscGVyIGZyb20gJy4uL3V0aWxzL2hlbHBlcnMvbWFrZS1pZCc7XG5cbmNvbnN0IFZlYW1zSGVscGVycyA9IHtcblx0cGx1Z2luTmFtZTogJ0hlbHBlcnMnLFxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAoVmVhbXMpIHtcblx0XHRWZWFtcy5hZGRIZWxwZXIgPSBmdW5jdGlvbiBhZGRIZWxwZXIoLi4uYXJncykge1xuXHRcdFx0bGV0IHBhcmFtcyA9IFsuLi5hcmdzXTtcblxuXHRcdFx0aWYgKHBhcmFtcy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBwYXJhbXNbMF0gIT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5lcnJvcignVmVhbXNIZWxwZXJzIDo6IFlvdSBuZWVkIHRvIHBhc3MgYW4gb2JqZWN0IScpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAobGV0IGtleSBpbiBwYXJhbXNbMF0pIHtcblx0XHRcdFx0XHRpZiAocGFyYW1zWzBdLmhhc093blByb3BlcnR5KGtleSkpIHtcblx0XHRcdFx0XHRcdGlmICghVmVhbXMuaGVscGVyc1trZXldKSB7XG5cdFx0XHRcdFx0XHRcdFZlYW1zLmhlbHBlcnNba2V5XSA9IHBhcmFtc1swXVtrZXldO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y29uc29sZS5pbmZvKGBWZWFtc0hlbHBlcnMgOjogVGhlIGhlbHBlciAke2tleX0gaXMgYWxyZWFkeSBkZWZpbmVkISBQbGVhc2UgZGVmaW5lIGEgbmV3IG5hbWUgZm9yOiBgLCBwYXJhbXNbMF1ba2V5XSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKHBhcmFtcy5sZW5ndGggPT09IDIpIHtcblxuXHRcdFx0XHRpZiAoIVZlYW1zLmhlbHBlcnNbcGFyYW1zWzBdXSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgcGFyYW1zWzBdICE9PSAnc3RyaW5nJyB8fCB0eXBlb2YgcGFyYW1zWzFdICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdWZWFtc0hlbHBlcnMgOjogWW91IG5lZWQgdG8gcGFzcyBhIHN0cmluZyBhcyBmaXJzdCBhcmd1bWVudCBhbmQgdGhlIGhlbHBlciBmdW5jdGlvbiBhcyBzZWNvbmQgb25lLicpO1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRWZWFtcy5oZWxwZXJzW3BhcmFtc1swXV0gPSBwYXJhbXNbMV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc29sZS5pbmZvKGBWZWFtc0hlbHBlcnMgOjogVGhlIGhlbHBlciAke3BhcmFtc1swXX0gaXMgYWxyZWFkeSBkZWZpbmVkISBQbGVhc2UgZGVmaW5lIGEgbmV3IG5hbWUgZm9yOiBgLCBwYXJhbXNbMV0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuYWRkRGVmYXVsdEhlbHBlcnMoVmVhbXMpO1xuXHR9LFxuXG5cdGFkZERlZmF1bHRIZWxwZXJzOiBmdW5jdGlvbiAoVmVhbXMpIHtcblx0XHRWZWFtcy5hZGRIZWxwZXIoJ3F1ZXJ5U2VsZWN0b3JBcnJheScsIHNlbGVjdG9ySGVscGVyKTtcblx0XHRWZWFtcy5hZGRIZWxwZXIoJ2V4dGVuZCcsIGV4dGVuZEhlbHBlcik7XG5cdFx0VmVhbXMuYWRkSGVscGVyKCdpc1RvdWNoJywgdG91Y2hIZWxwZXIpO1xuXHRcdFZlYW1zLmFkZEhlbHBlcignbWl4aW4nLCBtaXhpbnNIZWxwZXIpO1xuXHRcdFZlYW1zLmFkZEhlbHBlcignbWV0aG9kRXh0ZW5kJywgbWV0aG9kRXh0ZW5kSGVscGVyKTtcblx0XHRWZWFtcy5hZGRIZWxwZXIoJ3Rocm90dGxlJywgdGhyb3R0bGVIZWxwZXIpO1xuXHRcdFZlYW1zLmFkZEhlbHBlcignZm9yRWFjaCcsIGZvcmVhY2hIZWxwZXIpO1xuXHRcdFZlYW1zLmFkZEhlbHBlcignbWFrZUlkJywgbWFrZUlkSGVscGVyKTtcblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgVmVhbXNIZWxwZXJzO1xuXG5leHBvcnQgdHlwZSBWZWFtc0hlbHBlcnNUeXBlID0ge1xuXHRba2V5OiBzdHJpbmddOiAoLi4uYW55KSA9PiBhbnlcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3BsdWdpbnMvaGVscGVycy50cyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTaW1wbGUgZXh0ZW5kIG1ldGhvZCB0byBleHRlbmQgdGhlIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBvYmplY3Qgd2hpY2ggd2lsbCBiZSBleHRlbmRlZFxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gb2JqIC0gZXh0ZW5kZWQgb2JqZWN0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV4dGVuZChvYmopIHtcblx0W10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goKGl0ZW0pID0+IHtcblx0XHRmb3IgKGxldCBrZXkgaW4gaXRlbSkgb2JqW2tleV0gPSBpdGVtW2tleV07XG5cdH0pO1xuXHRyZXR1cm4gb2JqO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvaGVscGVycy9leHRlbmQudHMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVG91Y2ggRGV0ZWN0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzVG91Y2goKSB7XG5cdHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy91dGlscy9oZWxwZXJzL2lzLXRvdWNoLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRocm90dGxlIG1ldGhvZCBmb3IgcmVzaXplIGV2ZW50cyBhbmQgbW9yZVxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBGdW5jdGlvbiB3aGljaCB3aWxsIGJlIGV4ZWN1dGVkLlxuICogQHBhcmFtIHtudW1iZXJ9IHdhaXQgLSBudW1iZXIgdG8gd2FpdCBpbiBtaWxsaXNlY29uZHMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGltbWVkaWF0ZSAtIGV4ZWN1dGUgZnVuY3Rpb24gaW1tZWRpYXRlbHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuXHRsZXQgdGltZW91dDtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGxldCBjb250ZXh0ID0gdGhpcztcblx0XHRsZXQgYXJncyA9IGFyZ3VtZW50cztcblx0XHRsZXQgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcblx0XHRsZXQgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHRcdH07XG5cblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cblx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG5cblx0XHRpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcblx0fTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvdGhyb3R0bGUudHMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogR2V0IGRvbSBlbGVtZW50cyBpbiBhbiBhcnJheVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbGVtIC0gUmVxdWlyZWQ6IHNlbGVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gW2NvbnRleHRdIC0gT3B0aW9uYWw6IGNvbnRleHRcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcXVlcnlTZWxlY3RvckFycmF5KGVsZW0sIGNvbnRleHQpIHtcblx0aWYgKCFlbGVtKSB0aHJvdyBuZXcgRXJyb3IoJ0luIG9yZGVyIHRvIHdvcmsgd2l0aCBxdWVyeVNlbGVjdG9yQXJyYXkgeW91IG5lZWQgdG8gZGVmaW5lIGFuIGVsZW1lbnQgYXMgc3RyaW5nIScpO1xuXHRsZXQgZWwgPSBlbGVtO1xuXHRsZXQgY3VzdG9tQ29udGV4dCA9IGNvbnRleHQgfHwgZG9jdW1lbnQ7XG5cblx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKChjdXN0b21Db250ZXh0KS5xdWVyeVNlbGVjdG9yQWxsKGVsKSk7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy91dGlscy9oZWxwZXJzL3F1ZXJ5LXNlbGVjdG9yLWFycmF5LnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbXBsZSBmb3JFYWNoIG1ldGhvZFxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IC0gYXJyYXkgb2Ygb2JqZWN0c1xuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHNjb3BlIC0gc2NvcGUgb2YgZnVuY3Rpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2ssIHNjb3BlKSB7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcblx0XHRjYWxsYmFjay5jYWxsKHNjb3BlLCBpLCBhcnJheVtpXSk7XG5cdH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvZm9yLWVhY2gudHMiXSwic291cmNlUm9vdCI6IiJ9