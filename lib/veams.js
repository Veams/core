(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("veams", [], factory);
	else if(typeof exports === 'object')
		exports["veams"] = factory();
	else
		root["veams"] = root["veams"] || {}, root["veams"]["veams"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 22);
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
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generics_starter__ = __webpack_require__(23);
/**
 * Imports
 */

/**
 * Variables
 */
/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__generics_starter__["a" /* default */]);


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__utils_polyfills_custom_event__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(13);

/**
 * Polyfills
 */

/**
 * Imports
 */

let Veams;
(function (window, document, undefined) {
    'use strict';
    Veams = new __WEBPACK_IMPORTED_MODULE_1__core__["default"]({
        namespace: 'Veams',
        addToGlobal: true
    });
    Veams.initialize();
})(window, document);
/* harmony default export */ __webpack_exports__["a"] = (Veams);


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAyYjI3OTQwMjUyYjUyNTc4MmY4OSIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvdXRpbHMvaGVscGVycy9tZXRob2QtZXh0ZW5kLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL21peGluLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL2RlZmF1bHRzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL21ha2UtaWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3V0aWxzL3BvbHlmaWxscy9jdXN0b20tZXZlbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2dlbmVyaWNzL2NvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2dlbmVyaWNzL3VzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvdXRpbHMvZXZlbnRzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9wbHVnaW5zL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvZXh0ZW5kLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL2lzLXRvdWNoLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL3Rocm90dGxlLnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL3F1ZXJ5LXNlbGVjdG9yLWFycmF5LnRzIiwid2VicGFjazovLy8uL3NyYy90cy91dGlscy9oZWxwZXJzL2Zvci1lYWNoLnRzIiwid2VicGFjazovLy8uL3NyYy90cy92ZWFtcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvZ2VuZXJpY3Mvc3RhcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Ozs7Ozs7Ozs7O0FDbEJSO0FBRWI7O0dBRUc7QUFDc0M7QUFFekM7O0dBRUc7QUFDNEI7QUFFL0IsSUFBSSxLQUFnQixDQUFDO0FBRXJCLENBQUMsVUFBVSxNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVM7SUFDckMsWUFBWSxDQUFDO0lBRWIsS0FBSyxHQUFHLElBQUksOENBQVMsQ0FBQztRQUNyQixTQUFTLEVBQUUsT0FBTztRQUNsQixXQUFXLEVBQUUsSUFBSTtLQUNqQixDQUFDLENBQUM7SUFFSCxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7QUFFcEIsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRXJCLHlEQUFlLEtBQUssRUFBQyIsImZpbGUiOiJ2ZWFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidmVhbXNcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widmVhbXNcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widmVhbXNcIl0gPSByb290W1widmVhbXNcIl0gfHwge30sIHJvb3RbXCJ2ZWFtc1wiXVtcInZlYW1zXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmIyNzk0MDI1MmI1MjU3ODJmODkiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogSGVscGVyIG1ldGhvZCB0byBleHRlbmQgYW4gYWxyZWFkeSBleGlzdGluZyBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRvIC0gdmlldyB3aGljaCB3aWxsIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gZnJvbSAtIG1ldGhvZHMgd2hpY2ggY29tZXMgZnJvbSBtaXhpblxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgLSBmdW5jdGlvbiBuYW1lXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1ldGhvZEV4dGVuZCh0bywgZnJvbSwgbWV0aG9kTmFtZSkge1xuXHRmdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuXHRcdHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnO1xuXHR9XG5cblx0aWYgKGZyb20gPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG5cdC8vIGlmIHRoZSBtZXRob2QgaXMgZGVmaW5lZCBvbiBmcm9tIC4uLlxuXHRpZiAoIWlzVW5kZWZpbmVkKGZyb21bbWV0aG9kTmFtZV0pKSB7XG5cdFx0bGV0IG9sZCA9IHRvW21ldGhvZE5hbWVdO1xuXG5cdFx0Ly8gLi4uIHdlIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvbiB0b1xuXHRcdHRvW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHQvLyB3aGVyZWluIHdlIGZpcnN0IGNhbGwgdGhlIG1ldGhvZCB3aGljaCBleGlzdHMgb24gYHRvYFxuXHRcdFx0bGV0IG9sZFJldHVybiA9IG9sZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG5cdFx0XHQvLyBhbmQgdGhlbiBjYWxsIHRoZSBtZXRob2Qgb24gYGZyb21gXG5cdFx0XHRmcm9tW21ldGhvZE5hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cblx0XHRcdC8vIGFuZCB0aGVuIHJldHVybiB0aGUgZXhwZWN0ZWQgcmVzdWx0LFxuXHRcdFx0Ly8gaS5lLiB3aGF0IHRoZSBtZXRob2Qgb24gYHRvYCByZXR1cm5zXG5cdFx0XHRyZXR1cm4gb2xkUmV0dXJuO1xuXHRcdH07XG5cdH1cbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvbWV0aG9kLWV4dGVuZC50cyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRlZmF1bHRzSGVscGVyIGZyb20gJy4vZGVmYXVsdHMnO1xuaW1wb3J0IG1ldGhvZEV4dGVuZEhlbHBlciBmcm9tICcuL21ldGhvZC1leHRlbmQnO1xuXG4vKipcbiAqIE1lcmdlIG1ldGhvZCBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGZyb20gLSBNaXhpbiBvYmplY3Qgd2hpY2ggd2lsbCBiZSBtZXJnZWQgdmlhIEhlbHBlcnMuZGVmYXVsdHMgd2l0aCB0aGUgbWV0aG9kcyBvZiBvdXIgY2xhc3NcbiAqIEBwYXJhbSB7QXJyYXl9IG1ldGhvZHMgLSBBcnJheSBvZiBtZXRob2QgbmFtZXMgd2hpY2ggd2lsbCBiZSBleHRlbmRlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWl4aW4oZnJvbSwgbWV0aG9kcyA9IFsnaW5pdGlhbGl6ZScsICdyZW5kZXInXSkge1xuXHRpZiAoZnJvbSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Y29uc29sZS5lcnJvcihgVmVhbXNIZWxwZXJzIDogTWl4aW4gOjogTWl4aW4gbm90IGZvdW5kIWApO1xuXG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGV0IHRvID0gdGhpcy5wcm90b3R5cGU7XG5cblx0LyoqIEFkZCB0aG9zZSBtZXRob2RzIHdoaWNoIGV4aXN0cyBvbiBgZnJvbWAgYnV0IG5vdCBvbiBgdG9gIHRvIHRoZSBsYXR0ZXIgKi9cblx0ZGVmYXVsdHNIZWxwZXIoe3RvLCBmcm9tfSk7XG5cblx0LyoqIHdlIGRvIHRoZSBzYW1lIGZvciBldmVudHMgKi9cblx0aWYgKHRvLmV2ZW50cykge1xuXHRcdGNvbnN0IHRvRXZlbnRzID0gdG8uZXZlbnRzO1xuXHRcdGNvbnN0IGZyb21FdmVudHMgPSBmcm9tLmV2ZW50cztcblx0XHRkZWZhdWx0c0hlbHBlcih7dG9FdmVudHMsIGZyb21FdmVudHN9KTtcblx0fVxuXG5cdC8vIEV4dGVuZCB0bydzIG1ldGhvZHNcblx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2QpID0+IHtcblx0XHRtZXRob2RFeHRlbmRIZWxwZXIodG8sIGZyb20sIG1ldGhvZCk7XG5cdH0pO1xufTtcblxuZXhwb3J0IHR5cGUgbWl4aW5UeXBlID0gKGZyb206IHt9LCBtZXRob2RzOiBzdHJpbmdbXSkgPT4gYW55O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy91dGlscy9oZWxwZXJzL21peGluLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbXBsZSBleHRlbmQgbWV0aG9kLCB3aGljaCBleHRlbmRzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gb2JqZWN0IHdoaWNoIHdpbGwgYmUgZXh0ZW5kZWRcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IG9iaiAtIGV4dGVuZGVkIG9iamVjdFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZhdWx0c0hlbHBlcihvYmopIHtcblx0XHRbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXHRcdFx0Zm9yIChsZXQga2V5IGluIGl0ZW0pIHtcblx0XHRcdFx0aWYgKG9ialtrZXldID09PSB1bmRlZmluZWQpIG9ialtrZXldID0gaXRlbVtrZXldO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBvYmo7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy91dGlscy9oZWxwZXJzL2RlZmF1bHRzLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBudW1lcmljIGlkLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBbc2VnbWVudHM9MV0gLSBudW1iZXIgb2Ygc2VnbWVudHMgb2YgZ2VuZXJhdGVkIGlkIChzZWdtZW50cyBjb25zaXN0IG9mIDEwIGRpZ2l0cywgc2VwYXJhdGVkIGJ5ICctJykuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSAtIGdlbmVyYXRlZCBpZFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtYWtlSWQoc2VnbWVudHMgPSAxKSB7XG5cdGxldCBjcnlwdG8gPSB3aW5kb3cuY3J5cHRvIHx8IHdpbmRvdy5tc0NyeXB0bztcblx0bGV0IGFycmF5ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDMyQXJyYXkoc2VnbWVudHMpKTtcblx0bGV0IGlkID0gJyc7XG5cdGxldCBpID0gMDtcblxuXHRmb3IgKDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0aWQgKz0gYXJyYXlbaV0gKyAnLSc7XG5cdH1cblxuXHRyZXR1cm4gaWQuc2xpY2UoMCwgLTEpO1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvaGVscGVycy9tYWtlLWlkLnRzIiwiLy8gUG9seWZpbGwgZm9yIGN1c3RvbSBldmVudHNcbihmdW5jdGlvbiAoKSB7XG5cdGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSByZXR1cm4gZmFsc2U7XG5cblx0ZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuXHRcdHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcblxuXHRcdHBhcmFtcyA9IHBhcmFtcyB8fCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH07XG5cblx0XHRldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuXHRcdHJldHVybiBldnQ7XG5cdH1cblxuXHRDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuXG5cdHdpbmRvdy5DdXN0b21FdmVudCA9IEN1c3RvbUV2ZW50O1xufSkoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvcG9seWZpbGxzL2N1c3RvbS1ldmVudC50cyIsIi8qKlxuICogUmVwcmVzZW50cyBWZWFtc0NvcmUuXG4gKiBAbW9kdWxlIFZlYW1zQ29yZVxuICpcbiAqIEBhdXRob3IgU2ViYXN0aWFuIEZpdHpuZXJcbiAqL1xuaW1wb3J0ICcuLi91dGlscy9wb2x5ZmlsbHMvY3VzdG9tLWV2ZW50JztcbmltcG9ydCB1c2UgZnJvbSAnLi91c2UnO1xuXG5pbXBvcnQgRVZFTlRTLCB7IEVWRU5UU1R5cGUgfSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IFZlYW1zSGVscGVycywgeyBWZWFtc0hlbHBlcnNUeXBlIH0gZnJvbSAnLi4vcGx1Z2lucy9oZWxwZXJzJztcbmltcG9ydCB7IFZlYW1zT3B0aW9ucyB9IGZyb20gJy4vdmVhbXNPcHRpb25zJztcblxubGV0IGluaXRTdGF0ZSA9IGZhbHNlO1xuXG5jbGFzcyBWZWFtc0NvcmUge1xuXHRfaW5pdGlhbGl6ZWQ6IGFueTtcblx0XG5cdC8qKlxuXHQgKiBDdXJyZW50IFZlYW1zIFZlcnNpb25cblx0ICovXG5cdF92ZXJzaW9uOiBhbnk7XG5cblx0LyoqXG5cdCAqIFxuXHQgKi9cblx0ZGV0ZWN0aW9uczogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgfTtcblxuXHQvKipcblx0ICogUmVnaXN0ZXJlZCBWZWFtc2hlbHBlcnNcblx0ICovXG5cdGhlbHBlcnM6IFZlYW1zSGVscGVyc1R5cGVcblxuXHQvKipcblx0ICogQXZhaWxhYmxlIEV2ZW50c1xuXHQgKi9cblx0RVZFTlRTOiBFVkVOVFNUeXBlO1xuXHRcblx0XG5cdFBsdWdpbnM6IHt9O1xuXHR1c2U6IGFueTtcblxuXHQvKipcblx0ICogQmFzZSBpbmZvcm1hdGlvbiBhYm91dCB2ZWFtc1xuXHQgKi9cblx0YmFzZTogeyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgfTtcblxuXHQvKipcblx0ICogVmVhbXMgb3B0aW9uc1xuXHQgKi9cblx0X29wdGlvbnM6IFZlYW1zT3B0aW9ucztcblxuXHRjb25zdHJ1Y3RvcihvcHRzKSB7XG5cdFx0dGhpcy5fb3B0aW9ucyA9IHtcblx0XHRcdG5hbWVzcGFjZTogJ1ZlYW1zJyxcblx0XHRcdGFkZFRvR2xvYmFsOiBmYWxzZVxuXHRcdH07XG5cblx0XHR0aGlzLmJhc2UgPSB7XG5cdFx0XHRuYW1lOiAnVmVhbXMnLFxuXHRcdFx0dmVyc2lvbjogJzUuMC4xJ1xuXHRcdH07XG5cblx0XHR0aGlzLnVzZSA9IHVzZS5iaW5kKHRoaXMpO1xuXHRcdHRoaXMuUGx1Z2lucyA9IHt9O1xuXHRcdHRoaXMuRVZFTlRTID0gRVZFTlRTO1xuXHRcdHRoaXMuaGVscGVycyA9IHt9O1xuXHRcdHRoaXMuZGV0ZWN0aW9ucyA9IHtcblx0XHRcdHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcblx0XHRcdGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0XG5cdFx0fTtcblxuXHRcdGluaXRTdGF0ZSA9IGZhbHNlO1xuXG5cdFx0dGhpcy5zZXR1cChvcHRzKTtcblx0fVxuXG5cdHNldCB2ZXJzaW9uKHZlcnNpb24pIHtcblx0XHR0aGlzLl92ZXJzaW9uID0gdmVyc2lvbjtcblx0fVxuXG5cdGdldCB2ZXJzaW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl92ZXJzaW9uO1xuXHR9XG5cblx0c2V0IGluaXRpYWxpemVkKGJvb2wpIHtcblx0XHR0aGlzLl9pbml0aWFsaXplZCA9IGJvb2w7XG5cdH1cblxuXHRnZXQgaW5pdGlhbGl6ZWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2luaXRpYWxpemVkO1xuXHR9XG5cblx0c2V0IG9wdGlvbnMob3B0aW9ucykge1xuXHRcdHRoaXMuX29wdGlvbnMgPSB0aGlzLmhlbHBlcnMuZXh0ZW5kKHRoaXMub3B0aW9ucywgb3B0aW9ucyB8fCB7fSk7XG5cdH1cblxuXHRnZXQgb3B0aW9ucygpIHtcblx0XHRyZXR1cm4gdGhpcy5fb3B0aW9ucztcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXR1cCBWZWFtcyBjb3JlXG5cdCAqIEBwYXJhbSBvcHRzIFxuXHQgKi9cblx0c2V0dXAob3B0czogVmVhbXNPcHRpb25zKSB7XG5cdFx0dGhpcy51c2UoVmVhbXNIZWxwZXJzKTtcblxuXHRcdHRoaXMuZGV0ZWN0aW9ucyA9IHRoaXMuaGVscGVycy5leHRlbmQoe1xuXHRcdFx0dG91Y2g6IHRoaXMuaGVscGVycy5pc1RvdWNoKClcblx0XHR9LCB0aGlzLmRldGVjdGlvbnMpO1xuXG5cdFx0dGhpcy5vcHRpb25zID0gb3B0cztcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHZlYW1zIGNvcmVcblx0ICogQHBhcmFtIG9wdHMgT3B0aW9uc1xuXHQgKi9cblx0aW5pdGlhbGl6ZShvcHRzPzogVmVhbXNPcHRpb25zKSB7XG5cdFx0aWYgKGluaXRTdGF0ZSA9PT0gdHJ1ZSkge1xuXHRcdFx0cmV0dXJuIGNvbnNvbGUuaW5mbygnVmVhbXMgOjogWW91IGFscmVhZHkgaW5pdGlhbGl6ZWQgVmVhbXMhJyk7XG5cdFx0fVxuXG5cdFx0LyoqXG5cdFx0ICogU2V0IGdsb2JhbCBvcHRpb25zIG9uIGluaXRpYWxpemVcblx0XHQgKi9cblx0XHR0aGlzLm9wdGlvbnMgPSBvcHRzO1xuXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5hZGRUb0dsb2JhbCkge1xuXHRcdFx0aWYgKHdpbmRvdyAmJiAhd2luZG93W3RoaXMub3B0aW9ucy5uYW1lc3BhY2VdKSB7XG5cdFx0XHRcdHdpbmRvd1t0aGlzLm9wdGlvbnMubmFtZXNwYWNlXSA9IHRoaXMgfHwge307XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aW5pdFN0YXRlID0gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBPbiBpbml0IGxpZmVjeWxlIGhvb2tcblx0ICogQHBhcmFtIGNiIFxuXHQgKi9cblx0b25Jbml0aWFsaXplKGNiOiAoKSA9PiBhbnkpOiBhbnkge1xuXHRcdGlmICghY2IgfHwgdHlwZW9mIGNiICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjb25zb2xlLmxvZygnVmVhbXMgOjogQ2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKGluaXRTdGF0ZSA9PT0gZmFsc2UpIHtcblx0XHRcdHRoaXMuaW5pdGlhbGl6ZSgpO1xuXHRcdH1cblxuXHRcdGNiKCk7XG5cdH1cblxuXHQvKipcblx0ICogT24gRE9NIHJlYWR5IGxpdmVjeWNsZSBob29rXG5cdCAqIEBwYXJhbSBjYiBcblx0ICovXG5cdG9uRE9NUmVhZHkoY2I6ICgpID0+IGFueSkge1xuXHRcdGlmICh0eXBlb2YgY2IgIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdWZWFtcyA6OiBDYWxsYmFjayBpcyBub3QgYSBmdW5jdGlvbiEnKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNiKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBWZWFtc0NvcmU7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL2dlbmVyaWNzL2NvcmUudHMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNpbXBsZSBwbHVnaW4gc3lzdGVtIGluIHdoaWNoIGB0aGlzYCBpcyBWZWFtcy5cbiAqIEBtb2R1bGUgcGx1Z2luXG4gKlxuICogQGF1dGhvciBTZWJhc3RpYW4gRml0em5lclxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChwbHVnaW4sIC4uLmFyZ3MpIHtcblx0aWYgKHBsdWdpbi5wbHVnaW5OYW1lKSB7XG5cdFx0dGhpcy5QbHVnaW5zW3BsdWdpbi5wbHVnaW5OYW1lXSA9IHBsdWdpbjtcblx0fVxuXG5cdHBsdWdpbi5pbml0aWFsaXplKHRoaXMsIC4uLmFyZ3MpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy9nZW5lcmljcy91c2UudHMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29uc3QgZm9yIGV2ZW50cyAocHViL3N1YilcbiAqXG4gKiBAYXV0aG9yOiBTZWJhc3RpYW4gRml0em5lclxuICovXG5cblxuXG4gLyoqXG4gKiBFdmVudHMgR2xvYmFsXG4gKi9cbmNvbnN0IEVWRU5UUyA9IHtcblx0Ymx1cjogJ2JsdXInLFxuXHRjaGFuZ2U6ICdjaGFuZ2UnLFxuXHRjbGljazogJ2NsaWNrJyxcblx0ZGJsY2xpY2s6ICdkYmxjbGljaycsXG5cdERPTWNoYW5nZWQ6ICdkb206Y2hhbmdlZCcsXG5cdERPTXJlZGlyZWN0OiAnZG9tOnJlZGlyZWN0Jyxcblx0aGFzaGNoYW5nZTogJ2hhc2hjaGFuZ2UnLFxuXHRpbnB1dDogJ2lucHV0Jyxcblx0a2V5ZG93bjogJ2tleWRvd24nLFxuXHRrZXlwcmVzczogJ2tleXByZXNzJyxcblx0a2V5dXA6ICdrZXl1cCcsXG5cdG1lZGlhY2hhbmdlOiAnbWVkaWFjaGFuZ2UnLFxuXHRtb2R1bGVDYWNoZWQ6ICdtb2R1bGU6Y2FjaGVkJyxcblx0bW91c2Vkb3duOiAnbW91c2Vkb3duJyxcblx0bW91c2VlbnRlcjogJ21vdXNlZW50ZXInLFxuXHRtb3VzZWxlYXZlOiAnbW91c2VsZWF2ZScsXG5cdG1vdXNlb3V0OiAnbW91c2VvdXQnLFxuXHRtb3VzZW92ZXI6ICdtb3VzZW92ZXInLFxuXHRtb3VzZXVwOiAnbW91c2V1cCcsXG5cdHJlc2V0OiAncmVzZXQnLFxuXHRyZXNpemU6ICdyZXNpemUnLFxuXHRzY3JvbGw6ICdzY3JvbGwnLFxuXHRzdWJtaXQ6ICdzdWJtaXQnLFxuXHRzd2lwZTogJ3N3aXBlJ1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRVZFTlRTO1xuXG5leHBvcnQgdHlwZSBFVkVOVFNUeXBlID0ge1xuXHRba2V5OiBzdHJpbmddOiBzdHJpbmdcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvZXZlbnRzLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZXh0ZW5kSGVscGVyIGZyb20gJy4uL3V0aWxzL2hlbHBlcnMvZXh0ZW5kJztcbmltcG9ydCBtaXhpbnNIZWxwZXIgZnJvbSAnLi4vdXRpbHMvaGVscGVycy9taXhpbic7XG5pbXBvcnQgbWV0aG9kRXh0ZW5kSGVscGVyIGZyb20gJy4uL3V0aWxzL2hlbHBlcnMvbWV0aG9kLWV4dGVuZCc7XG5pbXBvcnQgdG91Y2hIZWxwZXIgZnJvbSAnLi4vdXRpbHMvaGVscGVycy9pcy10b3VjaCc7XG5pbXBvcnQgdGhyb3R0bGVIZWxwZXIgZnJvbSAnLi4vdXRpbHMvaGVscGVycy90aHJvdHRsZSc7XG5pbXBvcnQgc2VsZWN0b3JIZWxwZXIgZnJvbSAnLi4vdXRpbHMvaGVscGVycy9xdWVyeS1zZWxlY3Rvci1hcnJheSc7XG5pbXBvcnQgZm9yZWFjaEhlbHBlciBmcm9tICcuLi91dGlscy9oZWxwZXJzL2Zvci1lYWNoJztcbmltcG9ydCBtYWtlSWRIZWxwZXIgZnJvbSAnLi4vdXRpbHMvaGVscGVycy9tYWtlLWlkJztcblxuY29uc3QgVmVhbXNIZWxwZXJzID0ge1xuXHRwbHVnaW5OYW1lOiAnSGVscGVycycsXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChWZWFtcykge1xuXHRcdFZlYW1zLmFkZEhlbHBlciA9IGZ1bmN0aW9uIGFkZEhlbHBlciguLi5hcmdzKSB7XG5cdFx0XHRsZXQgcGFyYW1zID0gWy4uLmFyZ3NdO1xuXG5cdFx0XHRpZiAocGFyYW1zLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRpZiAodHlwZW9mIHBhcmFtc1swXSAhPT0gJ29iamVjdCcpIHtcblx0XHRcdFx0XHRjb25zb2xlLmVycm9yKCdWZWFtc0hlbHBlcnMgOjogWW91IG5lZWQgdG8gcGFzcyBhbiBvYmplY3QhJyk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yIChsZXQga2V5IGluIHBhcmFtc1swXSkge1xuXHRcdFx0XHRcdGlmIChwYXJhbXNbMF0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXHRcdFx0XHRcdFx0aWYgKCFWZWFtcy5oZWxwZXJzW2tleV0pIHtcblx0XHRcdFx0XHRcdFx0VmVhbXMuaGVscGVyc1trZXldID0gcGFyYW1zWzBdW2tleV07XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRjb25zb2xlLmluZm8oYFZlYW1zSGVscGVycyA6OiBUaGUgaGVscGVyICR7a2V5fSBpcyBhbHJlYWR5IGRlZmluZWQhIFBsZWFzZSBkZWZpbmUgYSBuZXcgbmFtZSBmb3I6IGAsIHBhcmFtc1swXVtrZXldKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAocGFyYW1zLmxlbmd0aCA9PT0gMikge1xuXG5cdFx0XHRcdGlmICghVmVhbXMuaGVscGVyc1twYXJhbXNbMF1dKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBwYXJhbXNbMF0gIT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwYXJhbXNbMV0gIT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ1ZlYW1zSGVscGVycyA6OiBZb3UgbmVlZCB0byBwYXNzIGEgc3RyaW5nIGFzIGZpcnN0IGFyZ3VtZW50IGFuZCB0aGUgaGVscGVyIGZ1bmN0aW9uIGFzIHNlY29uZCBvbmUuJyk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFZlYW1zLmhlbHBlcnNbcGFyYW1zWzBdXSA9IHBhcmFtc1sxXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zb2xlLmluZm8oYFZlYW1zSGVscGVycyA6OiBUaGUgaGVscGVyICR7cGFyYW1zWzBdfSBpcyBhbHJlYWR5IGRlZmluZWQhIFBsZWFzZSBkZWZpbmUgYSBuZXcgbmFtZSBmb3I6IGAsIHBhcmFtc1sxXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5hZGREZWZhdWx0SGVscGVycyhWZWFtcyk7XG5cdH0sXG5cblx0YWRkRGVmYXVsdEhlbHBlcnM6IGZ1bmN0aW9uIChWZWFtcykge1xuXHRcdFZlYW1zLmFkZEhlbHBlcigncXVlcnlTZWxlY3RvckFycmF5Jywgc2VsZWN0b3JIZWxwZXIpO1xuXHRcdFZlYW1zLmFkZEhlbHBlcignZXh0ZW5kJywgZXh0ZW5kSGVscGVyKTtcblx0XHRWZWFtcy5hZGRIZWxwZXIoJ2lzVG91Y2gnLCB0b3VjaEhlbHBlcik7XG5cdFx0VmVhbXMuYWRkSGVscGVyKCdtaXhpbicsIG1peGluc0hlbHBlcik7XG5cdFx0VmVhbXMuYWRkSGVscGVyKCdtZXRob2RFeHRlbmQnLCBtZXRob2RFeHRlbmRIZWxwZXIpO1xuXHRcdFZlYW1zLmFkZEhlbHBlcigndGhyb3R0bGUnLCB0aHJvdHRsZUhlbHBlcik7XG5cdFx0VmVhbXMuYWRkSGVscGVyKCdmb3JFYWNoJywgZm9yZWFjaEhlbHBlcik7XG5cdFx0VmVhbXMuYWRkSGVscGVyKCdtYWtlSWQnLCBtYWtlSWRIZWxwZXIpO1xuXHR9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBWZWFtc0hlbHBlcnM7XG5cbmV4cG9ydCB0eXBlIFZlYW1zSGVscGVyc1R5cGUgPSB7XG5cdFtrZXk6IHN0cmluZ106ICguLi5hbnkpID0+IGFueVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvcGx1Z2lucy9oZWxwZXJzLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFNpbXBsZSBleHRlbmQgbWV0aG9kIHRvIGV4dGVuZCB0aGUgcHJvcGVydGllcyBvZiBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIG9iamVjdCB3aGljaCB3aWxsIGJlIGV4dGVuZGVkXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBvYmogLSBleHRlbmRlZCBvYmplY3RcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXh0ZW5kKG9iaikge1xuXHRbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXHRcdGZvciAobGV0IGtleSBpbiBpdGVtKSBvYmpba2V5XSA9IGl0ZW1ba2V5XTtcblx0fSk7XG5cdHJldHVybiBvYmo7XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy91dGlscy9oZWxwZXJzL2V4dGVuZC50cyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUb3VjaCBEZXRlY3Rpb25cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNUb3VjaCgpIHtcblx0cmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdztcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvaXMtdG91Y2gudHMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhyb3R0bGUgbWV0aG9kIGZvciByZXNpemUgZXZlbnRzIGFuZCBtb3JlXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIEZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gd2FpdCAtIG51bWJlciB0byB3YWl0IGluIG1pbGxpc2Vjb25kcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW1tZWRpYXRlIC0gZXhlY3V0ZSBmdW5jdGlvbiBpbW1lZGlhdGVseS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG5cdGxldCB0aW1lb3V0O1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0bGV0IGNvbnRleHQgPSB0aGlzO1xuXHRcdGxldCBhcmdzID0gYXJndW1lbnRzO1xuXHRcdGxldCBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuXHRcdGxldCBsYXRlciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRpbWVvdXQgPSBudWxsO1xuXHRcdFx0aWYgKCFpbW1lZGlhdGUpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG5cdFx0fTtcblxuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcblxuXHRcdGlmIChjYWxsTm93KSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuXHR9O1xufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvaGVscGVycy90aHJvdHRsZS50cyIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBHZXQgZG9tIGVsZW1lbnRzIGluIGFuIGFycmF5XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGVsZW0gLSBSZXF1aXJlZDogc2VsZWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29udGV4dF0gLSBPcHRpb25hbDogY29udGV4dFxuICpcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQXJyYXkoZWxlbSwgY29udGV4dCkge1xuXHRpZiAoIWVsZW0pIHRocm93IG5ldyBFcnJvcignSW4gb3JkZXIgdG8gd29yayB3aXRoIHF1ZXJ5U2VsZWN0b3JBcnJheSB5b3UgbmVlZCB0byBkZWZpbmUgYW4gZWxlbWVudCBhcyBzdHJpbmchJyk7XG5cdGxldCBlbCA9IGVsZW07XG5cdGxldCBjdXN0b21Db250ZXh0ID0gY29udGV4dCB8fCBkb2N1bWVudDtcblxuXHRyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoKGN1c3RvbUNvbnRleHQpLnF1ZXJ5U2VsZWN0b3JBbGwoZWwpKTtcbn07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3V0aWxzL2hlbHBlcnMvcXVlcnktc2VsZWN0b3ItYXJyYXkudHMiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU2ltcGxlIGZvckVhY2ggbWV0aG9kXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgLSBhcnJheSBvZiBvYmplY3RzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gc2NvcGUgLSBzY29wZSBvZiBmdW5jdGlvblxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgc2NvcGUpIHtcblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuXHRcdGNhbGxiYWNrLmNhbGwoc2NvcGUsIGksIGFycmF5W2ldKTtcblx0fVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdHMvdXRpbHMvaGVscGVycy9mb3ItZWFjaC50cyIsImRlY2xhcmUgZ2xvYmFsICB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIFZlYW1zOiBhbnk7XG4gICAgICAgIFByb21pc2U6IFByb21pc2U8YW55PjtcbiAgICAgICAgQ3VzdG9tRXZlbnQ6IGFueTtcbiAgICAgICAgRXZlbnQ6IGFueTtcbiAgICAgICAgbXNDcnlwdG86IGFueTtcbiAgICB9XG59XG4vKipcbiAqIEltcG9ydHNcbiAqL1xuaW1wb3J0IFZlYW1zIGZyb20gJy4vZ2VuZXJpY3Mvc3RhcnRlcic7XG5cbi8qKlxuICogVmFyaWFibGVzXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgVmVhbXM7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3RzL3ZlYW1zLnRzIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFBvbHlmaWxsc1xuICovXG5pbXBvcnQgJy4uL3V0aWxzL3BvbHlmaWxscy9jdXN0b20tZXZlbnQnO1xuXG4vKipcbiAqIEltcG9ydHNcbiAqL1xuaW1wb3J0IFZlYW1zQ29yZSBmcm9tICcuL2NvcmUnO1xuXG5sZXQgVmVhbXM6IFZlYW1zQ29yZTtcblxuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdFZlYW1zID0gbmV3IFZlYW1zQ29yZSh7XG5cdFx0bmFtZXNwYWNlOiAnVmVhbXMnLFxuXHRcdGFkZFRvR2xvYmFsOiB0cnVlXG5cdH0pO1xuXG5cdFZlYW1zLmluaXRpYWxpemUoKTtcblxufSkod2luZG93LCBkb2N1bWVudCk7XG5cbmV4cG9ydCBkZWZhdWx0IFZlYW1zO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy90cy9nZW5lcmljcy9zdGFydGVyLnRzIl0sInNvdXJjZVJvb3QiOiIifQ==