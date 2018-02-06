(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("services/http", [], factory);
	else if(typeof exports === 'object')
		exports["services/http"] = factory();
	else
		root["services/http"] = root["services/http"] || {}, root["services/http"]["services/http"] = factory();
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
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 2:
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

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__common_base__ = __webpack_require__(4);
/**
 * Represents a simple http service, which returns a promise.
 *
 * @module http
 * @author Sebastian Fitzner
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Imports

var VeamsHttp = /** @class */ (function (_super) {
    __extends(VeamsHttp, _super);
    function VeamsHttp(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var namespace = 'http';
        var opts = {
            url: false,
            type: 'text',
            method: 'GET',
            fetchOnInit: false,
            headers: null
        };
        _this = _super.call(this, { namespace: namespace, options: options }, opts) || this;
        _this.data = {};
        _this.initialize();
        return _this;
    }
    ;
    VeamsHttp.prototype.initialize = function () {
        if (!window.Promise) {
            console.error('Veams-Http :: You should add a lightweight promise library like promise-polyfill!');
        }
        if (this.options.fetchOnInit) {
            return this.promiseRequest();
        }
    };
    ;
    // Request lifecycle
    VeamsHttp.prototype.requestWillOpen = function (request, obj) {
    };
    VeamsHttp.prototype.requestDidOpen = function (request, obj) {
        if (this.options.headers) {
            for (var header in this.options.headers) {
                if (this.options.headers.hasOwnProperty(header)) {
                    request.setRequestHeader(header, this.options.headers[header]);
                }
            }
        }
    };
    VeamsHttp.prototype.requestWillLoad = function (request, obj) {
    };
    VeamsHttp.prototype.requestDidLoad = function (request, obj) {
    };
    VeamsHttp.prototype.requestWillSend = function (request, obj) {
    };
    VeamsHttp.prototype.requestDidSend = function (request, obj) {
    };
    // Request function
    VeamsHttp.prototype.promiseRequest = function (obj) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            _this.requestWillOpen(request, obj);
            request.open(obj.method, obj.url, true);
            _this.requestDidOpen(request, obj);
            _this.requestWillLoad(request, obj);
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    resolve(_this.parser({
                        request: request,
                        type: obj.type
                    }));
                    _this.requestDidLoad(request, obj);
                }
                else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                    _this.requestDidLoad(request, obj);
                }
            };
            request.onerror = function () {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            };
            _this.requestWillSend(request, obj);
            request.send(JSON.stringify(obj.data));
            _this.requestDidSend(request, obj);
        });
    };
    ;
    VeamsHttp.prototype.get = function (url) {
        if (url === void 0) { url = false; }
        var requestObject = {};
        this.options.method = requestObject.method = 'GET';
        this.options.url = requestObject.url = url || this.options.url;
        this.options.type = requestObject.type = this.options.type;
        return this.promiseRequest(requestObject);
    };
    ;
    VeamsHttp.prototype.delete = function (url) {
        if (url === void 0) { url = false; }
        var requestObject = {};
        requestObject.method = 'DELETE';
        requestObject.url = url || this.options.url;
        // requestObject.type = this.options.type;
        return this.promiseRequest(requestObject);
    };
    VeamsHttp.prototype.post = function (url, data) {
        if (url === void 0) { url = false; }
        var requestObject = {};
        requestObject.data = data ? data : null;
        requestObject.method = 'POST';
        requestObject.url = url || this.options.url;
        requestObject.type = this.options.type;
        if (this.options.type === 'json' && this.options.headers === null) {
            this.options.headers = {
                'content-type': 'application/json'
            };
        }
        return this.promiseRequest(requestObject);
    };
    VeamsHttp.prototype.put = function (url, data) {
        if (url === void 0) { url = false; }
        var requestObject = {};
        requestObject.data = data ? data : null;
        requestObject.method = 'PUT';
        requestObject.url = url || this.options.url;
        requestObject.type = this.options.type;
        if (this.options.type === 'json' && this.options.headers === null) {
            this.options.headers = {
                'content-type': 'application/json'
            };
        }
        return this.promiseRequest(requestObject);
    };
    /**
     * The default parser, which returns the response text.
     * This method can be overridden.
     *
     * @param {Object} obj - Generic object.
     * @param {Object} obj.req - Request object.
     * @param {String} obj.dataType - Define a type for the response text.
     *
     */
    VeamsHttp.prototype.parser = function (obj) {
        this.data = obj.request.responseText;
        if (obj.type === 'json') {
            this.data = JSON.parse(this.data);
        }
        return this.data;
    };
    return VeamsHttp;
}(__WEBPACK_IMPORTED_MODULE_0__common_base__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (VeamsHttp);


/***/ }),

/***/ 3:
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

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_internal_helpers_string__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_helpers_mixin__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_helpers_make_id__ = __webpack_require__(3);

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
// import deepExtend from 'deep-extend';



var VeamsBase = /** @class */ (function () {
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
    function VeamsBase(_a, opts) {
        var namespace = _a.namespace, el = _a.el, options = _a.options;
        if (opts === void 0) { opts = {}; }
        this.namespace = namespace || "base";
        this.instanceId = this.namespace;
        this.options = opts;
        this._options = options;
        this.mixin = __WEBPACK_IMPORTED_MODULE_1__utils_helpers_mixin__["a" /* default */];
        if (el) {
            this.el = el;
        }
    }
    Object.defineProperty(VeamsBase.prototype, "namespace", {
        get: function () {
            return this._namespace;
        },
        // ----------------------------------------------------------
        // GETTER & SETTERS
        // ----------------------------------------------------------
        set: function (namespace) {
            this._namespace = namespace;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "instanceId", {
        get: function () {
            return this._instanceId;
        },
        set: function (id) {
            this._instanceId = id + "_" + Date.now() + "_" + Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers_make_id__["a" /* default */])();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "_options", {
        get: function () {
            return this.options;
        },
        set: function (options) {
            this.options = Object.assign(this.options, options || {});
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "el", {
        get: function () {
            return this._el;
        },
        set: function (element) {
            this._el = element;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VeamsBase.prototype, "metaData", {
        /**
         * Get module information
         */
        get: function () {
            return {
                name: typeof this.namespace === "string"
                    ? __WEBPACK_IMPORTED_MODULE_0__utils_internal_helpers_string__["a" /* default */].capitalizeFirstLetter(__WEBPACK_IMPORTED_MODULE_0__utils_internal_helpers_string__["a" /* default */].toCamelCase(this.namespace))
                    : ""
            };
        },
        enumerable: true,
        configurable: true
    });
    return VeamsBase;
}());
/* harmony default export */ __webpack_exports__["default"] = (VeamsBase);


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

var stringHelpers = {};
/**
 * CamelCase strings by replacing hyphens, white space and points.
 *
 * @param {String} str - String which will be camelcased
 */
stringHelpers.toCamelCase = function (str) {
    // Lower cases the string
    return str.toLowerCase()
        .replace(/[-_]+/g, ' ')
        .replace(/[^\w\s]/g, '')
        .replace(/ (.)/g, function ($1) {
        return $1.toUpperCase();
    })
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
/* harmony default export */ __webpack_exports__["a"] = (stringHelpers);


/***/ })

/******/ });
});